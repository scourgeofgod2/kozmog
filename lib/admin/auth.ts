// Yönetici anahtarı doğrulaması ve kaba kuvvet koruması (tüm /api/admin uçları)
import { createHash, timingSafeEqual } from "node:crypto";
import { hit, isLimited } from "@/lib/rateLimit";

export function checkAdmin(token: unknown, ip: string): { ok: true } | { ok: false; status: number; error: string } {
  const failKey = `admin-fail:${ip}`;
  if (isLimited(failKey, 10)) return { ok: false, status: 429, error: "Çok fazla hatalı deneme. 15 dakika sonra tekrar dene." };
  const expected = process.env.ADMIN_TOKEN ?? "";
  const good =
    expected.length >= 16 &&
    typeof token === "string" &&
    timingSafeEqual(createHash("sha256").update(token).digest(), createHash("sha256").update(expected).digest());
  if (!good) {
    hit(failKey, 10, 15 * 60_000);
    return { ok: false, status: 401, error: "Yönetici anahtarı hatalı." };
  }
  return { ok: true };
}
