// Sipariş verisi: veritabanı yok. Sipariş, WhatsApp mesajındaki yönetim
// linkinin URL parçasında (#o=...) taşınır; parça sunucuya gönderilmez,
// böylece müşteri verisi sunucu kayıtlarına düşmez.

import { getPackage, type PackageSlug } from "@/lib/content/packages";
import { parseBirthDate, sanitizeName } from "@/lib/validation";

export interface Order {
  code: string;
  pkg: PackageSlug;
  name: string;
  birthDate: string;
  partnerName?: string;
  partnerBirthDate?: string;
  contact: string;
  createdAt: string;
}

const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // karışan karakterler yok (0/O, 1/I/L)

export function newOrderCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return "KZ-" + Array.from(bytes, (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");
}

/** Telefon (10–13 rakam) ya da e-posta; değilse null */
export function parseContact(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const v = input.trim().slice(0, 80);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return v.toLowerCase();
  const digits = v.replace(/\D/g, "");
  if (digits.length >= 10 && digits.length <= 13) return digits;
  return null;
}

export type OrderInput = Omit<Order, "code" | "createdAt">;

/** Gelen ham veriyi doğrular; hata varsa Türkçe mesaj döner */
export function validateOrderInput(body: Record<string, unknown>): { ok: true; order: OrderInput } | { ok: false; error: string } {
  const pkg = getPackage(typeof body.pkg === "string" ? body.pkg : null);
  if (!pkg) return { ok: false, error: "Geçersiz paket." };

  const name = sanitizeName(body.name);
  if (!name || name.length < 2) return { ok: false, error: "Ad soyad gerekli." };
  const birthDate = parseBirthDate(body.birthDate);
  if (!birthDate) return { ok: false, error: "Geçerli bir doğum tarihi gir." };

  let partnerName: string | undefined;
  let partnerBirthDate: string | undefined;
  if (pkg.needsPartner) {
    partnerName = sanitizeName(body.partnerName);
    partnerBirthDate = parseBirthDate(body.partnerBirthDate) ?? undefined;
    if (!partnerName || !partnerBirthDate) return { ok: false, error: "Partnerinin adı ve doğum tarihi gerekli." };
  }

  const contact = parseContact(body.contact);
  if (!contact) return { ok: false, error: "Raporu gönderebilmemiz için geçerli bir WhatsApp numarası ya da e-posta gir." };
  if (body.consent !== true) return { ok: false, error: "Devam etmek için bilgilendirme metnini onaylamalısın." };

  return { ok: true, order: { pkg: pkg.slug, name, birthDate, partnerName, partnerBirthDate, contact } };
}

// ─── Link kodlama (base64url JSON) ────────────────────────────────────────

export function encodeOrder(o: Order): string {
  return Buffer.from(JSON.stringify(o), "utf8").toString("base64url");
}

export function decodeOrder(s: string): Order | null {
  try {
    // Tarayıcıda Buffer yedeği base64url desteklemiyor; atob kullan
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
    const json =
      typeof window === "undefined"
        ? Buffer.from(s, "base64url").toString("utf8")
        : new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
    const o = JSON.parse(json) as Order;
    const check = validateOrderInput({ ...o, consent: true });
    if (!check.ok || typeof o.code !== "string" || !/^KZ-[A-Z0-9]{5}$/.test(o.code)) return null;
    return { ...check.order, code: o.code, createdAt: String(o.createdAt ?? "") };
  } catch {
    return null;
  }
}

export function formatTL(n: number) {
  return `${n.toLocaleString("tr-TR")} TL`;
}

export function formatDateTR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatPhoneTR(digits: string) {
  const d = digits.replace(/\D/g, "").replace(/^90/, "").replace(/^0/, "");
  return d.length === 10 ? `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}` : digits;
}
