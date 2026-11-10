// Kullanıcı girdisi doğrulama — API route ve sonuç sayfası ortak kullanır.

import type { ReadingFocus } from "@/types/numerology";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NAME_MAX = 60;

/** "YYYY-MM-DD" formatında, 1900 ile bugün arasında gerçek bir tarih mi? */
export function parseBirthDate(input: unknown): string | null {
  if (typeof input !== "string" || !DATE_RE.test(input)) return null;
  const [y, m, d] = input.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  if (y < 1900 || date.getTime() > Date.now()) return null;
  return input;
}

/** Sadece harf, boşluk, kesme ve tire bırakır; uzunluğu sınırlar. */
export function sanitizeName(input: unknown): string | undefined {
  if (typeof input !== "string") return undefined;
  const cleaned = input
    .normalize("NFC")
    .replace(/[^\p{L}\s'\-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NAME_MAX);
  return cleaned || undefined;
}

const FOCUSES: readonly ReadingFocus[] = [
  "general",
  "life_path",
  "personality",
  "career",
  "strengths",
  "challenges",
  "relationships",
];

export function parseFocus(input: unknown): ReadingFocus {
  return FOCUSES.includes(input as ReadingFocus) ? (input as ReadingFocus) : "general";
}
