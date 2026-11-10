// Rapor bölümlerinin görselleri: kapak görseli ve sembollü sayı kartları.
import { calculateAll, calculatePersonalYear } from "@/lib/numerology";
import { getProfile } from "@/lib/content/profiles";
import { getPersonalYear } from "@/lib/content/personalYear";
import { REPORT_YEAR } from "@/lib/reportPrompts";
import type { ReportSection } from "@/lib/content/packages";
import type { OrderInput } from "@/lib/order";

export function sectionVisuals(section: ReportSection, o: OrderInput) {
  const first = (s?: string) => (s ?? "").split(" ")[0];

  if (section === "harita") {
    const c = calculateAll(o.birthDate, o.name);
    const cards = [
      { n: c.lifePath, label: "Yaşam yolu" },
      { n: c.destinyNumber, label: "Kader" },
      { n: c.soulUrge, label: "Ruh" },
      { n: c.personalityNumber, label: "Kişilik" },
    ]
      .filter((x): x is { n: number; label: string } => typeof x.n === "number")
      .map((x) => ({ ...x, sub: getProfile(x.n)?.title }));
    return { hero: "sayfa-ana-sayfa-numeroloji-haritasi", cards };
  }

  if (section === "yil") {
    const py = calculatePersonalYear(o.birthDate, REPORT_YEAR);
    const lp = calculateAll(o.birthDate).lifePath;
    return {
      // Çarkta kişinin kendi kişisel yılı vurgulanır (usta sayılar temel dilimde)
      hero: `pdf-yil-${py === 11 ? 2 : py === 22 ? 4 : py === 33 ? 6 : py}`,
      cards: [
        { n: py, label: `${REPORT_YEAR} kişisel yıl`, sub: getPersonalYear(py)?.title },
        { n: lp, label: "Yaşam yolu", sub: getProfile(lp)?.title },
      ],
    };
  }

  const a = calculateAll(o.birthDate).lifePath;
  const b = calculateAll(o.partnerBirthDate!).lifePath;
  return {
    hero: "pdf-ask", // sayısız varyant; kişinin sayıları kartlarda

    cards: [
      { n: a, label: `${first(o.name)} · yaşam yolu`, sub: getProfile(a)?.title },
      { n: b, label: `${first(o.partnerName)} · yaşam yolu`, sub: getProfile(b)?.title },
    ],
  };
}
