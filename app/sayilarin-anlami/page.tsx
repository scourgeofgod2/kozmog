import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { images, type ImageKey } from "@/lib/content/images.generated";
import { numbers, faqItems } from "@/lib/content/numbers";
import { masterNumbers } from "@/lib/content/master";
import { numberHref } from "@/lib/content/profiles";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, Pill, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Numerolojide Sayıların Anlamı: 1'den 9'a Rehber",
  description:
    "Numerolojide 1, 2, 3, 4, 5, 6, 7, 8 ve 9 sayılarının anlamı, kişilik özellikleri, güçlü yanlar ve zorluklar. Usta sayılar 11, 22, 33 dahil. Sayınız hakkında her şey.",
  keywords:
    "numeroloji sayıların anlamı, numeroloji 1 sayısı, numeroloji 2 sayısı, numeroloji 3 sayısı, numeroloji 7 sayısı anlamı, numeroloji sayıları, numerolojide sayıların anlamları",
  alternates: { canonical: "https://kozmograf.com/sayilarin-anlami" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Numerolojide Sayıların Anlamı 1-9 | Kozmograf",
    description: "1'den 9'a tüm sayıların numerolojik anlamı, kişilik profili, güçler ve zorluklar.",
    url: "https://kozmograf.com/sayilarin-anlami",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Numerolojide Sayıların Anlamı — 1'den 9'a Tam Rehber",
      inLanguage: "tr",
      url: "https://kozmograf.com/sayilarin-anlami",
      author: { "@type": "Organization", name: "Kozmograf" },
    },
    faqJsonLd(faqItems),
  ],
};

export default function SayilarinAnlami() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Sayıların anlamı" }]} />
      <PageHero
        image="sayfa-sayilarin-anlami-rehberi"
        eyebrow="Tam rehber"
        title="Sayıların"
        accent="gizli anlamı"
        lead="1'den 9'a kadar her sayı farklı bir enerji, kişilik ve yaşam dersi taşır. Kendi sayını bul, derin anlamını keşfet."
      >
        <QuickNumber />
      </PageHero>

      <Section eyebrow="1'den 9'a" title="Her sayının profili">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {numbers.map((n) => (
            <Card key={n.n} id={`sayi-${n.n}`} as="article" className="flex scroll-mt-24 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] text-faint">
                    {n.planet} · {n.element}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold">{n.title}</h3>
                  <p className="text-[14px] text-gold">{n.keyword}</p>
                </div>
                <Image
                  src={images[`sayi-${n.n}` as ImageKey].src}
                  alt={images[`sayi-${n.n}` as ImageKey].alt}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-24 w-24 flex-none rounded-[18px] border border-line"
                />
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{n.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Uyumlu: {n.bestMatch}</Pill>
                <Pill>{n.color}</Pill>
              </div>
              <Link
                href={numberHref(n.n)}
                className="mt-5 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold hover:text-gold-strong"
              >
                {n.n} sayısının tüm anlamı →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Usta sayılar" title="11 · 22 · 33" lead="Bu sayılar tek basamağa indirgenmez ve daha yüksek bir potansiyeli temsil eder.">
        <div className="grid gap-3 md:grid-cols-3">
          {masterNumbers.map((m) => (
            <Link
              key={m.number}
              id={`sayi-${m.number}`}
              href={numberHref(m.number)}
              className="flex min-h-[200px] scroll-mt-24 flex-col justify-between rounded-[var(--radius-card)] bg-violet p-6 text-violet-ink transition-opacity hover:opacity-95"
            >
              <span className="font-display text-7xl font-semibold leading-none">{m.number}</span>
              <span>
                <span className="block font-display text-2xl font-semibold">{m.title}</span>
                <span className="mt-1 block text-[14px]">{m.lifeTheme}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Bilgi" title="Sayıların matematiksel özelliği">
        <Card className="koz-prose max-w-3xl">
          <p>
            9 sayısının eşsiz bir matematiksel özelliği vardır: 9 ile çarpılan her tam sayının rakamları toplandığında
            yeniden 9 elde edilir (örneğin 9×8=72, 7+2=9). Bu nedenle 9, numerolojide &quot;tamamlanma ve döngünün
            kapanması&quot;nın evrensel sembolü olarak kabul edilir. Benzer şekilde, herhangi bir sayıya 9 eklenip
            tekrar indirgeme yapıldığında başlangıç sayısına dönülür.
          </p>
        </Card>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Numeroloji hakkında">
        <FAQ items={faqItems} />
      </Section>

      <CTABand secondary={{ href: "/usta-sayilar", label: "Usta sayılar" }} />
    </>
  );
}
