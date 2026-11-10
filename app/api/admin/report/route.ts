import { NextRequest } from "next/server";
import { timingSafeEqual, createHash } from "node:crypto";
import { callInworldStream } from "@/lib/claude";
import { buildReport } from "@/lib/reportPrompts";
import { getPackage, type ReportSection } from "@/lib/content/packages";
import { validateOrderInput } from "@/lib/order";
import { clientIp, hit, isLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 300;

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

function tokenOk(given: unknown): boolean {
  const expected = process.env.ADMIN_TOKEN ?? "";
  if (expected.length < 16 || typeof given !== "string") return false;
  // Uzunluk sızdırmamak için önce özetle
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

// Yönetici için ücretli rapor üretir (akış). ADMIN_TOKEN ile korunur.
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek." });
  }

  // Kaba kuvvet koruması: 15 dakikada 10 hatalı denemeden sonra (doğru anahtar dahil) reddet
  const failKey = `admin-fail:${ip}`;
  if (isLimited(failKey, 10)) return json(429, { error: "Çok fazla hatalı deneme. 15 dakika sonra tekrar dene." });
  if (!tokenOk(body.token)) {
    hit(failKey, 10, 15 * 60_000);
    return json(401, { error: "Yönetici anahtarı hatalı." });
  }
  if (!process.env.INWORLD_API_KEY) return json(500, { error: "INWORLD_API_KEY ayarlı değil." });

  const order = body.order && typeof body.order === "object" ? (body.order as Record<string, unknown>) : {};
  const v = validateOrderInput({ ...order, consent: true });
  if (!v.ok) return json(400, { error: v.error });

  const section = body.section as ReportSection;
  const pkg = getPackage(v.order.pkg)!;
  if (!pkg.sections.includes(section)) return json(400, { error: "Bu paket için geçersiz bölüm." });

  const { system, user, maxTokens } = buildReport(section, v.order);

  try {
    const stream = await callInworldStream(system, user, { maxTokens, timeoutMs: 280_000 });
    const enc = new TextEncoder();
    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = stream.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(enc.encode(`data: ${JSON.stringify({ text: value })}\n\n`));
            }
            controller.enqueue(enc.encode("data: [DONE]\n\n"));
          } catch (err) {
            console.error("admin report stream error", err);
            controller.enqueue(enc.encode(`data: ${JSON.stringify({ error: "Akış yarıda kesildi. Tekrar dene." })}\n\n`));
          }
          controller.close();
        },
      }),
      { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" } }
    );
  } catch (err) {
    console.error("admin report error", err);
    return json(502, { error: "Yapay zekâ servisine ulaşılamadı." });
  }
}
