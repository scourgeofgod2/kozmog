import type { MetadataRoute } from "next";
import { ALL_NUMBERS } from "@/lib/content/profiles";
import { angelNumbers } from "@/lib/content/angel";
import { images, type ImageKey } from "@/lib/content/images.generated";

const BASE = "https://kozmograf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    imgs: ImageKey[] = []
  ) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    ...(imgs.length ? { images: imgs.map((k) => `${BASE}${images[k].src}`) } : {}),
  });
  const nums = ALL_NUMBERS.map((n) => `sayi-${n}` as ImageKey);

  return [
    page("", 1.0, "weekly", ["sayfa-ana-sayfa-numeroloji-haritasi", "sayfa-kisisel-yil-2027", "sayfa-ask-uyumu-numeroloji", "sayfa-melek-sayilari", ...nums]),
    page("/kisisel-yil", 0.95, "weekly", ["sayfa-kisisel-yil-2027"]),
    page("/sayilarin-anlami", 0.9, "monthly", ["sayfa-sayilarin-anlami-rehberi", ...nums]),
    page("/yasam-yolu", 0.9, "monthly", ["sayfa-yasam-yolu-sayisi"]),
    page("/uyumluluk", 0.9, "monthly", ["sayfa-ask-uyumu-numeroloji"]),
    page("/melek-sayilari", 0.9, "monthly", ["sayfa-melek-sayilari", ...angelNumbers.map((a) => `melek-${a.slug}` as ImageKey)]),
    page("/saat-anlami", 0.85, "monthly", ["sayfa-ayna-saatler-11-11"]),
    page("/usta-sayilar", 0.85, "monthly", ["sayfa-usta-sayilar-11-22-33"]),
    page("/isim-numeroloji", 0.85, "monthly", ["sayfa-isim-numerolojisi-harf-tablosu"]),
    page("/karmik-borc", 0.8, "monthly", ["sayfa-karmik-borc-sayilari"]),
    page("/dogum-gunu-sayisi", 0.8, "monthly", ["sayfa-dogum-gunu-sayisi-takvim"]),
    page("/kariyer-numerolojisi", 0.75, "monthly", ["sayfa-kariyer-numerolojisi"]),
    page("/gucler-ve-yetenekler", 0.75, "monthly", ["sayfa-gucler-ve-yetenekler"]),
    ...ALL_NUMBERS.map((n) => page(`/sayilarin-anlami/${n}`, 0.8, "monthly", [`sayi-${n}` as ImageKey])),
    ...angelNumbers.map((a) => page(`/melek-sayilari/${a.slug}`, 0.75, "monthly", [`melek-${a.slug}` as ImageKey])),
    page("/paketler", 0.85, "weekly"),
    page("/iletisim", 0.3, "yearly"),
    page("/gizlilik", 0.2, "yearly"),
    page("/kullanim-sartlari", 0.2, "yearly"),
  ];
}
