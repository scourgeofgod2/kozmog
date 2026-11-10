// Satılan rapor paketleri. Fiyatlar TL.

export type PackageSlug = "ask-uyumu" | "yil-2027" | "kozmik-harita" | "hepsi-bir-arada";
export type ReportSection = "harita" | "yil" | "ask";

export interface Package {
  slug: PackageSlug;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  /** Partner bilgisi gerekli mi? */
  needsPartner: boolean;
  sections: ReportSection[];
  featured?: boolean;
}

export const DELIVERY_PROMISE = "1 saat içinde";

export const packages: Package[] = [
  {
    slug: "ask-uyumu",
    name: "Aşk Uyum Raporu",
    price: 129,
    tagline: "İkinizin sayıları ne diyor?",
    features: [
      "İki kişinin yaşam yolu, kader ve ruh sayıları",
      "Uyum skoru ve ilişkinin güçlü yanları",
      "Dikkat edilmesi gereken noktalar",
      "2027'de ilişkinizi bekleyen tema",
    ],
    needsPartner: true,
    sections: ["ask"],
  },
  {
    slug: "yil-2027",
    name: "2027 Yıl Rehberi",
    price: 179,
    tagline: "Yılını ay ay planla.",
    features: [
      "2027 kişisel yıl sayın ve yılın ana teması",
      "12 ayın her biri için kişisel ay sayısı ve yorumu",
      "Aşk, kariyer ve para için uygun dönemler",
      "Yıl boyunca odaklanman gereken 3 alan",
    ],
    needsPartner: false,
    sections: ["yil"],
  },
  {
    slug: "kozmik-harita",
    name: "Kozmik Harita",
    price: 279,
    tagline: "En kapsamlı kişisel rapor.",
    features: [
      "Yaşam yolu, kader, ruh, kişilik ve doğum günü sayıların",
      "Güçlü yanlar, gölge yönler ve yaşam dersi",
      "Kariyer ve para enerjin",
      "Aşk dilin ve uyumlu sayılar",
      "Karmik borç kontrolü ve 2027 özeti",
    ],
    needsPartner: false,
    sections: ["harita"],
    featured: true,
  },
  {
    slug: "hepsi-bir-arada",
    name: "Hepsi Bir Arada",
    price: 349,
    tagline: "Üç rapor, tek fiyat.",
    features: ["Kozmik Harita", "2027 Yıl Rehberi", "Aşk Uyum Raporu", "Üçü ayrı ayrı 587 TL yerine"],
    needsPartner: true,
    sections: ["harita", "yil", "ask"],
  },
];

export function getPackage(slug: string | null | undefined): Package | undefined {
  return packages.find((p) => p.slug === slug);
}
