// Numeroloji hesaplama katmanı — Pisagor sistemi
// PHP NumerologyAPI sınıfından TypeScript'e aktarılmıştır

import type {
  NumerologyCalculations,
  CompatibilityResult,
} from "@/types/numerology";

// ─── Yardımcı: Tek basamağa indirgeme (usta sayıları korur) ───────────────

export function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    if (n === 11 || n === 22 || n === 33) return n;
    n = String(n)
      .split("")
      .reduce((sum, d) => sum + parseInt(d), 0);
  }
  return n;
}

// ─── Yaşam Yolu Sayısı ────────────────────────────────────────────────────

export function calculateLifePath(birthDate: string): number {
  // birthDate: "YYYY-MM-DD"
  const [year, month, day] = birthDate.split("-").map(Number);

  const dayDigits = String(day).split("").reduce((s, d) => s + parseInt(d), 0);
  const monthDigits = String(month)
    .split("")
    .reduce((s, d) => s + parseInt(d), 0);
  const yearDigits = String(year)
    .split("")
    .reduce((s, d) => s + parseInt(d), 0);

  return reduceToSingleDigit(dayDigits + monthDigits + yearDigits);
}

// ─── Pisagor harf değerleri ───────────────────────────────────────────────

const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const VOWELS = new Set(["A", "E", "I", "O", "U", "Y"]);

const CONSONANT_VALUES: Record<string, number> = {
  B: 2, C: 3, D: 4, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7,
  Q: 8, R: 9, S: 1, T: 2, V: 4, W: 5,
  X: 6, Z: 8,
};

function cleanName(fullName: string): string {
  return fullName.toUpperCase().replace(/[^A-Z]/g, "");
}

// ─── Kader Sayısı (tüm harfler) ────────────────────────────────────────────

export function calculateDestinyNumber(fullName: string): number | null {
  if (!fullName.trim()) return null;
  const clean = cleanName(fullName);
  if (!clean) return null;

  const sum = clean
    .split("")
    .reduce((s, ch) => s + (LETTER_VALUES[ch] ?? 0), 0);

  return reduceToSingleDigit(sum);
}

// ─── Ruh Sayısı (sadece sesli harfler) ────────────────────────────────────

export function calculateSoulUrge(fullName: string): number | null {
  if (!fullName.trim()) return null;
  const clean = cleanName(fullName);

  const sum = clean
    .split("")
    .filter((ch) => VOWELS.has(ch))
    .reduce((s, ch) => s + (LETTER_VALUES[ch] ?? 0), 0);

  return sum > 0 ? reduceToSingleDigit(sum) : null;
}

// ─── Kişilik Sayısı (sadece ünsüzler) ─────────────────────────────────────

export function calculatePersonalityNumber(fullName: string): number | null {
  if (!fullName.trim()) return null;
  const clean = cleanName(fullName);

  const sum = clean
    .split("")
    .reduce((s, ch) => s + (CONSONANT_VALUES[ch] ?? 0), 0);

  return sum > 0 ? reduceToSingleDigit(sum) : null;
}

// ─── Doğum Günü Sayısı ────────────────────────────────────────────────────

export function calculateBirthDayNumber(birthDate: string): number {
  const day = parseInt(birthDate.split("-")[2], 10);
  return reduceToSingleDigit(day);
}

// ─── Kişisel Yıl Sayısı ───────────────────────────────────────────────────

export function calculatePersonalYear(
  birthDate: string,
  year?: number
): number {
  const currentYear = year ?? new Date().getFullYear();
  const [, month, day] = birthDate.split("-").map(Number);

  const dayDigits = String(day).split("").reduce((s, d) => s + parseInt(d), 0);
  const monthDigits = String(month)
    .split("")
    .reduce((s, d) => s + parseInt(d), 0);
  const yearDigits = String(currentYear)
    .split("")
    .reduce((s, d) => s + parseInt(d), 0);

  return reduceToSingleDigit(dayDigits + monthDigits + yearDigits);
}

// ─── Tüm hesaplamaları bir arada yap ──────────────────────────────────────

export function calculateAll(
  birthDate: string,
  fullName?: string
): NumerologyCalculations {
  const calculations: NumerologyCalculations = {
    lifePath: calculateLifePath(birthDate),
    birthDay: calculateBirthDayNumber(birthDate),
    personalYear: calculatePersonalYear(birthDate),
  };

  if (fullName?.trim()) {
    const destiny = calculateDestinyNumber(fullName);
    const soul = calculateSoulUrge(fullName);
    const personality = calculatePersonalityNumber(fullName);

    if (destiny !== null) calculations.destinyNumber = destiny;
    if (soul !== null) calculations.soulUrge = soul;
    if (personality !== null) calculations.personalityNumber = personality;
  }

  return calculations;
}

// ─── Uyumluluk Matrisi ────────────────────────────────────────────────────

const COMPATIBILITY_MATRIX: Record<number, Record<number, number>> = {
  1: { 1: 85, 2: 70, 3: 90, 4: 60, 5: 95, 6: 75, 7: 65, 8: 80, 9: 85, 11: 75, 22: 70, 33: 80 },
  2: { 1: 70, 2: 80, 3: 85, 4: 90, 5: 65, 6: 95, 7: 75, 8: 70, 9: 80, 11: 85, 22: 90, 33: 75 },
  3: { 1: 90, 2: 85, 3: 75, 4: 55, 5: 85, 6: 80, 7: 70, 8: 85, 9: 95, 11: 80, 22: 65, 33: 90 },
  4: { 1: 60, 2: 90, 3: 55, 4: 85, 5: 45, 6: 75, 7: 80, 8: 90, 9: 70, 11: 70, 22: 95, 33: 65 },
  5: { 1: 95, 2: 65, 3: 85, 4: 45, 5: 70, 6: 60, 7: 90, 8: 75, 9: 85, 11: 90, 22: 55, 33: 75 },
  6: { 1: 75, 2: 95, 3: 80, 4: 75, 5: 60, 6: 85, 7: 70, 8: 80, 9: 90, 11: 75, 22: 80, 33: 95 },
  7: { 1: 65, 2: 75, 3: 70, 4: 80, 5: 90, 6: 70, 7: 80, 8: 65, 9: 75, 11: 95, 22: 75, 33: 85 },
  8: { 1: 80, 2: 70, 3: 85, 4: 90, 5: 75, 6: 80, 7: 65, 8: 75, 9: 70, 11: 70, 22: 85, 33: 60 },
  9: { 1: 85, 2: 80, 3: 95, 4: 70, 5: 85, 6: 90, 7: 75, 8: 70, 9: 80, 11: 85, 22: 75, 33: 95 },
  11: { 1: 75, 2: 85, 3: 80, 4: 70, 5: 90, 6: 75, 7: 95, 8: 70, 9: 85, 11: 90, 22: 80, 33: 85 },
  22: { 1: 70, 2: 90, 3: 65, 4: 95, 5: 55, 6: 80, 7: 75, 8: 85, 9: 75, 11: 80, 22: 85, 33: 70 },
  33: { 1: 80, 2: 75, 3: 90, 4: 65, 5: 75, 6: 95, 7: 85, 8: 60, 9: 95, 11: 85, 22: 70, 33: 80 },
};

type CompatibilityLevel = CompatibilityResult["level"];

function scoreToLevel(score: number): CompatibilityLevel {
  if (score >= 85) return "excellent";
  if (score >= 75) return "high";
  if (score >= 60) return "good";
  if (score >= 45) return "medium";
  if (score >= 30) return "low";
  return "challenging";
}

export function calculateCompatibility(
  birthDate1: string,
  birthDate2: string
): CompatibilityResult {
  const lp1 = calculateLifePath(birthDate1);
  const lp2 = calculateLifePath(birthDate2);

  const baseScore = COMPATIBILITY_MATRIX[lp1]?.[lp2] ?? 65;

  // Doğum tarihlerine göre küçük rastlantısallık (±10)
  const hashInput = birthDate1 + birthDate2;
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    hash = (hash * 31 + hashInput.charCodeAt(i)) & 0xffffffff;
  }
  const variance = (Math.abs(hash) % 21) - 10;
  const finalScore = Math.max(10, Math.min(100, baseScore + variance));
  const level = scoreToLevel(finalScore);

  const interpretations: Record<CompatibilityLevel, string> = {
    excellent: "Mükemmel bir eşleşme! Birbirinizi harika şekilde tamamlıyorsunuz.",
    high: "Çok uyumlu bir çift! Güçlü bir bağ ve anlayış var.",
    good: "İyi bir uyumluluk. Birbirinizi destekliyorsunuz.",
    medium: "Orta düzey uyumluluk. Sabır ve anlayış gerektirir.",
    low: "Zorlu bir eşleşme. Daha fazla çaba ve anlayış gerekli.",
    challenging: "Zor bir uyumluluk. Karşılıklı sabır ve hoşgörü çok önemli.",
  };

  return {
    score: finalScore,
    level,
    person1LifePath: lp1,
    person2LifePath: lp2,
    interpretation: interpretations[level],
  };
}

// ─── Usta sayı mı? ────────────────────────────────────────────────────────

export function isMasterNumber(n: number): boolean {
  return n === 11 || n === 22 || n === 33;
}

// ─── Sayı için renk ───────────────────────────────────────────────────────

export function getNumberColor(n: number): string {
  const colors: Record<number, string> = {
    1: "from-red-500 to-orange-500",
    2: "from-orange-400 to-amber-500",
    3: "from-yellow-400 to-lime-500",
    4: "from-green-500 to-emerald-600",
    5: "from-teal-500 to-cyan-600",
    6: "from-blue-500 to-indigo-600",
    7: "from-indigo-500 to-violet-600",
    8: "from-purple-500 to-pink-600",
    9: "from-pink-500 to-rose-600",
    11: "from-yellow-400 to-amber-500",
    22: "from-amber-500 to-orange-600",
    33: "from-rose-400 to-pink-600",
  };
  return colors[n] ?? "from-indigo-500 to-purple-600";
}