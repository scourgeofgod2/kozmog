import type { MetadataRoute } from "next";
import { ALL_NUMBERS } from "@/lib/content/profiles";
import { angelNumbers } from "@/lib/content/angel";

const BASE = "https://kozmograf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1.0, "weekly"),
    page("/kisisel-yil", 0.95, "weekly"),
    page("/sayilarin-anlami", 0.9),
    page("/yasam-yolu", 0.9),
    page("/uyumluluk", 0.9),
    page("/melek-sayilari", 0.9),
    page("/saat-anlami", 0.85),
    page("/usta-sayilar", 0.85),
    page("/isim-numeroloji", 0.85),
    page("/karmik-borc", 0.8),
    page("/dogum-gunu-sayisi", 0.8),
    page("/kariyer-numerolojisi", 0.75),
    page("/gucler-ve-yetenekler", 0.75),
    ...ALL_NUMBERS.map((n) => page(`/sayilarin-anlami/${n}`, 0.8)),
    ...angelNumbers.map((a) => page(`/melek-sayilari/${a.slug}`, 0.75)),
    page("/iletisim", 0.3, "yearly"),
    page("/gizlilik", 0.2, "yearly"),
    page("/kullanim-sartlari", 0.2, "yearly"),
  ];
}
