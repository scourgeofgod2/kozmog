import { NextRequest } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { bump, safely, todayTR } from "@/lib/db";
import { clientIp, hit } from "@/lib/rateLimit";

export const runtime = "nodejs";

/*
 * Anonim ziyaret sayacı (çerezsiz). Yalnızca günlük toplamlar yazılır.
 * Tekil ziyaretçi: günlük değişen rastgele tuz + IP + tarayıcıdan özet; özet
 * yalnızca bellekte tutulur, gün değişince atılır, hiçbir yere yazılmaz.
 */

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|headless|lighthouse|python|curl|wget/i;
const EVENTS = new Set(["hesaplama", "siparis_olustur", "ornek_rapor", "ucretsiz_yorum"]);

let saltDay = "";
let salt = "";
let seen = new Set<string>();

function visitorIsNew(ip: string, ua: string): boolean {
  const day = todayTR();
  if (day !== saltDay) {
    saltDay = day;
    salt = randomBytes(16).toString("hex");
    seen = new Set();
  }
  const h = createHash("sha256").update(salt + ip + ua).digest("base64url").slice(0, 16);
  if (seen.has(h)) return false;
  seen.add(h);
  return true;
}

function normPath(p: unknown): string | null {
  if (typeof p !== "string" || !p.startsWith("/")) return null;
  const path = p.split(/[?#]/)[0].toLowerCase().slice(0, 60);
  if (path.startsWith("/yonetim") || path.startsWith("/api")) return null;
  return /^\/[a-z0-9\-/]*$/.test(path) ? path.replace(/\/+$/, "") || "/" : null;
}

function source(ref: unknown, utm: unknown, host: string | null): string | null {
  if (typeof utm === "string" && utm.trim()) {
    return utm.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20) || null;
  }
  if (typeof ref !== "string") return null;
  if (!ref) return "doğrudan";
  let h: string;
  try {
    h = new URL(ref).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
  if (host && h === host.replace(/^www\./, "").split(":")[0]) return null; // site içi
  if (/instagram\.com$/.test(h)) return "instagram";
  if (/(^|\.)google\./.test(h)) return "google";
  if (/tiktok\.com$/.test(h)) return "tiktok";
  if (/(youtube\.com|youtu\.be)$/.test(h)) return "youtube";
  if (/(facebook\.com|fb\.com)$/.test(h)) return "facebook";
  if (/(t\.co|x\.com|twitter\.com)$/.test(h)) return "x";
  if (/bing\.com$/.test(h)) return "bing";
  if (/yandex\./.test(h)) return "yandex";
  if (/chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai/.test(h)) return "yapay-zeka";
  return h.slice(0, 30);
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const ip = clientIp(req.headers);
  if (BOT_RE.test(ua) || !hit(`t:${ip}`, 300, 10 * 60_000)) return new Response(null, { status: 204 });

  let b: Record<string, unknown> = {};
  try {
    b = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 204 });
  }

  safely(() => {
    if (typeof b.e === "string") {
      if (EVENTS.has(b.e)) bump("evt", b.e);
      return;
    }
    const path = normPath(b.p);
    if (!path) return;
    bump("pv", path);
    if (visitorIsNew(ip, ua)) {
      bump("uv", "toplam");
      bump("cihaz", /mobile|android|iphone|ipad/i.test(ua) ? "mobil" : "masaüstü");
    }
    const src = source(b.r, b.u, req.headers.get("host"));
    if (src) bump("src", src);
  }, "stats");

  return new Response(null, { status: 204 });
}
