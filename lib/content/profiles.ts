// Her sayı için kısa profil (arketip adı + anahtar kelimeler).
// Sonuç kartları, kişisel yıl ve sayı sayfaları bunu kullanır.

import { numbers } from "./numbers";
import { masterNumbers } from "./master";

export interface NumberProfile {
  n: number;
  title: string;
  keyword: string;
  description: string;
  master: boolean;
}

const base: NumberProfile[] = numbers.map((x) => ({
  n: x.n,
  title: x.title,
  keyword: x.keyword,
  description: x.description,
  master: false,
}));

const masters: NumberProfile[] = masterNumbers.map((m) => ({
  n: m.number,
  title: m.title,
  keyword: m.subtitle,
  description: m.mission,
  master: true,
}));

export const ALL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

const byNumber = new Map<number, NumberProfile>([...base, ...masters].map((p) => [p.n, p]));

export function getProfile(n: number): NumberProfile | undefined {
  return byNumber.get(n);
}

/** URL slug'ı: /sayilarin-anlami/7 */
export function numberHref(n: number): string {
  return `/sayilarin-anlami/${n}`;
}
