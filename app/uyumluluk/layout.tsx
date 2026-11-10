import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Numeroloji Aşk Uyumu Hesaplama",
  description: "Numeroloji uyumluluk testi ile sevgiliniz, eşiniz veya iş ortağınızla enerji uyumunuzu ölçün. Yaşam yolu sayılarına göre ilişki uyumluluğu hesaplayın. Ücretsiz.",
  keywords: "numeroloji uyumluluk, numeroloji uyumluluk hesaplama, yaşam yolu uyumu, çift uyumu numeroloji, ilişki numeroloji, aşk uyumluluğu numeroloji",
  alternates: { canonical: "https://kozmograf.com/uyumluluk" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Numeroloji Uyumluluk Testi — İki Kişi Arası Enerji Analizi | Kozmograf",
    description: "Doğum tarihlerinizi girin, yaşam yolu sayılarınızın uyumunu anında öğrenin. Ücretsiz numeroloji uyumluluk analizi.",
    url: "https://kozmograf.com/uyumluluk",
  },
};

export default function UyumlulukLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}