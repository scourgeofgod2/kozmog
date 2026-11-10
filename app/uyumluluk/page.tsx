import CompatibilityCalculator from "@/components/forms/CompatibilityCalculator";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

const faq = [
  {
    q: "Numeroloji uyumluluğu nasıl hesaplanır?",
    a: "İki kişinin doğum tarihlerinden yaşam yolu sayıları hesaplanır. Sayıların enerji uyumuna göre bir uyum skoru ve ilişkinin güçlü yanları ile dikkat edilmesi gereken noktaları belirlenir.",
  },
  {
    q: "Düşük uyum skoru ilişkinin kötü olduğu anlamına mı gelir?",
    a: "Hayır. Farklı enerjiler çatışma değil büyüme fırsatı demektir. Skor, ilişkide hangi konularda daha fazla anlayış ve sabır gerektiğini gösteren bir başlangıç noktasıdır.",
  },
  {
    q: "Usta sayılar (11, 22, 33) uyumda nasıl değerlendirilir?",
    a: "Usta sayılar uyum tablosunda temel sayılarıyla (11→2, 22→4, 33→6) değerlendirilir; ancak taşıdıkları yoğun enerji ilişkiye ayrı bir derinlik katar.",
  },
];

export default function UyumlulukPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Aşk uyumu" }]} />
      <PageHero
        image="sayfa-ask-uyumu-numeroloji"
        eyebrow="Numeroloji aracı"
        title="Sayıların"
        accent="aşk dili"
        lead="İki kişinin yaşam yolu sayıları arasındaki numerolojik uyumu keşfet. Sevgilin, eşin ya da en yakın arkadaşınla dene."
      />

      <CompatibilityCalculator />

      <Section eyebrow="Rehber" title="Numeroloji uyumu nasıl çalışır?">
        <Card className="koz-prose max-w-3xl">
          <p>
            Numeroloji uyumluluğu, iki kişinin yaşam yolu sayıları arasındaki enerji uyumunu inceler. Her sayının kendine
            özgü bir titreşimi vardır; bazıları birbirini tamamlarken bazıları çatışır. Bu çatışmalar zorluğu değil,
            büyüme fırsatını temsil eder.
          </p>
          <ul>
            <li><strong>1 ve 5:</strong> Macera ve bağımsızlık sevgisi</li>
            <li><strong>2 ve 6:</strong> Aile ve istikrar odaklı</li>
            <li><strong>3 ve 9:</strong> Yaratıcılık ve hümanizm</li>
            <li><strong>4 ve 8:</strong> Pratiklik ve başarı hedefli</li>
            <li><strong>7 ve 7:</strong> Ruhani bağlantı</li>
          </ul>
        </Card>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Uyum hakkında">
        <FAQ items={faq} />
      </Section>

      <Section title="Daha fazlası">
        <RelatedLinks
          links={[
            { href: "/sayilarin-anlami", label: "Sayıların anlamı", desc: "Partnerinin sayısını oku" },
            { href: "/kisisel-yil", label: "2027 kişisel yılın", desc: "Aşk için uygun dönemler" },
            { href: "/isim-numeroloji", label: "İsim numerolojisi", desc: "Kader sayınız uyumlu mu?" },
          ]}
        />
      </Section>

      <CTABand
        title="Kendi sayılarını keşfet"
        lead="Tam numeroloji profilini hesapla: yaşam yolu, kader sayısı, ruh arzusu ve daha fazlası."
      />
    </>
  );
}
