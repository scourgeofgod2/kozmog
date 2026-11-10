import type { Metadata } from "next";
import Link from "next/link";
import { masterNumbers, faqItems } from "@/lib/content/master";
import { numberHref } from "@/lib/content/profiles";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, Pill, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Usta Sayılar 11, 22, 33 — Numerolojide Master Numbers Rehberi",
  description:
    "Numerolojide usta sayılar (master numbers) 11, 22 ve 33'ün anlamını öğrenin. Yaşam yolu sayınız usta sayı mı? Misyonunuzu, güçlerinizi ve zorluklarınızı keşfedin.",
  keywords:
    "usta sayılar, master numbers numeroloji, numeroloji 11 sayısı, numeroloji 22 sayısı, numeroloji 33 sayısı, yaşam yolu 11, yaşam yolu 22, yaşam yolu 33, 11 sayısının anlamı",
  alternates: { canonical: "https://kozmograf.com/usta-sayilar" },
  openGraph: {
    title: "Usta Sayılar 11, 22, 33 — Master Numbers Rehberi | Kozmograf",
    description: "11, 22 ve 33 usta sayılarının derin anlamı, misyonu ve zorlukları.",
    url: "https://kozmograf.com/usta-sayilar",
  },
};

export default function UstaSayilar() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faqItems) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Usta sayılar" }]} />
      <PageHero
        eyebrow="Master numbers"
        title="Usta sayılar"
        accent="11 · 22 · 33"
        lead="Numerolojide bazı sayılar tek basamağa indirgenmez, çünkü taşıdıkları enerji çok büyüktür. 11, 22 ve 33; yüksek misyon, derin sorumluluk ve olağanüstü potansiyeli temsil eder."
      >
        <QuickNumber cta="Usta sayım var mı?" />
      </PageHero>

      {masterNumbers.map((m) => (
        <Section key={m.number} id={`sayi-${m.number}`}>
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="flex min-h-[280px] flex-col justify-between rounded-[var(--radius-card)] bg-violet p-6 text-violet-ink">
              <div>
                <p className="text-[13px] font-semibold">{m.subtitle}</p>
                <h2 className="mt-1 font-display text-4xl font-semibold leading-tight">{m.title}</h2>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-[13px]">Temel sayı: {m.baseNumber}</span>
                <span className="font-display text-[8rem] font-semibold leading-[0.75]">{m.number}</span>
              </div>
            </div>
            <Card className="lg:col-span-2">
              <p className="text-[13px] text-gold">Misyon</p>
              <p className="mt-2 text-[16px] leading-relaxed text-text">{m.mission}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-[14px] font-semibold text-text">Güçlü yanlar</h3>
                  <ul className="space-y-2 text-[14px] text-muted">
                    {m.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-gold" aria-hidden="true">✦</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-[14px] font-semibold text-text">Zorluklar</h3>
                  <ul className="space-y-2 text-[14px] text-muted">
                    {m.challenges.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-faint" aria-hidden="true">◦</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
            <Card tone="raised">
              <h3 className="mb-2 text-[14px] font-semibold">Nasıl hesaplanır?</h3>
              <p className="text-[14px] leading-relaxed text-muted">{m.calculation}</p>
            </Card>
            <Card tone="raised">
              <h3 className="mb-2 text-[14px] font-semibold">Gölge yön</h3>
              <p className="text-[14px] leading-relaxed text-muted">{m.shadowSide}</p>
            </Card>
            <Card tone="raised">
              <h3 className="mb-3 text-[14px] font-semibold">İdeal kariyerler</h3>
              <div className="flex flex-wrap gap-2">
                {m.careers.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
              <Link href={numberHref(m.number)} className="mt-4 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                {m.number} sayısının tam profili →
              </Link>
            </Card>
          </div>
        </Section>
      ))}

      <Section eyebrow="Sık sorulanlar" title="Usta sayılar hakkında">
        <FAQ items={faqItems} />
      </Section>

      <CTABand title="Usta sayın var mı?" lead="Doğum tarihinle 11, 22 ya da 33 usta sayısına sahip olup olmadığını öğren." />
    </>
  );
}
