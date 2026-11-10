import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import Link from "next/link";
import { karmicDebts } from "@/lib/content/karmic";
import { numberHref } from "@/lib/content/profiles";
import KarmicCalculator from "@/components/forms/KarmicCalculator";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Karmik Borç Sayısı Hesaplama: 13, 14, 16, 19",
  description:
    "Karmik borç sayıları 13, 14, 16 ve 19'un anlamı. Doğum tarihin ve isminle karmik borcun olup olmadığını ücretsiz hesapla, yaşam derslerini öğren.",
  keywords:
    "karmik borç, karmik borç sayısı, karmik borç hesaplama, karmik numeroloji, 13 karmik borç, 14 karmik borç, 16 karmik borç, 19 karmik borç",
  alternates: { canonical: "https://kozmograf.com/karmik-borc" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Karmik Borç Sayısı — 13, 14, 16, 19 | Kozmograf",
    description: "Doğum tarihinle karmik borç sayın var mı? Ücretsiz hesapla.",
    url: "https://kozmograf.com/karmik-borc",
  },
};

const faq = [
  {
    q: "Karmik borç sayısı nedir?",
    a: "Numerolojide 13, 14, 16 ve 19 karmik borç sayıları olarak bilinir. Bir çekirdek sayının (yaşam yolu, doğum günü, kader) indirgenmeden önceki ara toplamında bu sayılardan biri çıkarsa, kişinin bu hayatta öğrenmesi gereken özel bir ders taşıdığı kabul edilir.",
  },
  {
    q: "Karmik borç nasıl hesaplanır?",
    a: "Doğum günün doğrudan 13, 14, 16 veya 19 ise o sayıyı taşırsın. Ayrıca yaşam yolu ve isim toplamlarının indirgenme zincirinde bu sayılardan biri geçiyorsa karmik borç vardır. Örneğin rakam toplamı 28 → 10 → 1 olan bir tarihte borç yokken, 19 → 10 → 1 olan bir tarihte 19 karmik borcu vardır.",
  },
  {
    q: "Karmik borç kötü bir şey mi?",
    a: "Hayır. Karmik borç bir ceza değil, bir öğrenme alanıdır. Farkında olmak, o alanda bilinçli seçimler yapmanı ve dersi daha kolay tamamlamanı sağlar.",
  },
];

export default function KarmikBorcPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Karmik borç" }]} />
      <PageHero
        eyebrow="Karmik numeroloji"
        title="Karmik borç sayın"
        accent="var mı?"
        lead="13, 14, 16 ve 19, numerolojide geçmişten taşınan derslerin sayılarıdır. Doğum tarihini gir, haritanda bu sayılardan biri olup olmadığını gör."
      >
        <KarmicCalculator />
      </PageHero>

      <Section eyebrow="Dört karmik sayı" title="13 · 14 · 16 · 19">
        <div className="grid gap-3 md:grid-cols-2">
          {karmicDebts.map((k) => (
            <Card key={k.n} id={`borc-${k.n}`} as="article" className="flex scroll-mt-24 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] text-faint">
                    {k.n} → {k.reduces}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold leading-tight">{k.title}</h3>
                </div>
                <span className="font-display text-7xl font-semibold leading-[0.8] text-violet-soft">{k.n}</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{k.lesson}</p>
              <h4 className="mt-5 text-[13px] font-semibold text-gold">Belirtiler</h4>
              <ul className="mt-2 space-y-1.5">
                {k.signs.map((s) => (
                  <li key={s} className="flex gap-2 text-[14px] text-muted">
                    <span className="text-faint" aria-hidden="true">◦</span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex-1 rounded-[14px] bg-surface-2 p-4 text-[14px] text-text">
                <span className="font-semibold text-gold">Yol: </span>
                {k.path}
              </p>
              <Link href={numberHref(k.reduces)} className="mt-3 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                {k.reduces} sayısının anlamı →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Karmik borç hakkında">
        <FAQ items={faq} />
      </Section>

      <Section title="Devam et">
        <RelatedLinks
          links={[
            { href: "/usta-sayilar", label: "Usta sayılar", desc: "11 · 22 · 33" },
            { href: "/dogum-gunu-sayisi", label: "Doğum günü sayısı", desc: "Ayın kaçında doğdun?" },
            { href: "/isim-numeroloji", label: "İsim numerolojisi", desc: "Kader sayın" },
          ]}
        />
      </Section>

      <CTABand />
    </>
  );
}
