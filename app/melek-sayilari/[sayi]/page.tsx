import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { angelNumbers, getAngel } from "@/lib/content/angel";
import { getProfile, numberHref } from "@/lib/content/profiles";
import { Breadcrumbs, Card, CTABand, Eyebrow, FAQ, JsonLd, Pill, RelatedLinks, Section, faqJsonLd, Illustration } from "@/components/ds";
import type { ImageKey } from "@/lib/content/images.generated";

type Props = { params: Promise<{ sayi: string }> };

export function generateStaticParams() {
  return angelNumbers.map((a) => ({ sayi: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAngel((await params).sayi);
  if (!a) return {};
  const title = `${a.slug} Anlamı: ${a.title}`;
  const description = `${a.slug} sayısını sürekli görüyorsan ne anlama gelir? ${a.essence}. ${a.slug} melek sayısının aşk, iş ve hayat için mesajı.`;
  return {
    title,
    description,
    alternates: { canonical: `https://kozmograf.com/melek-sayilari/${a.slug}` },
    openGraph: { images: [{ url: `/api/og?m=${a.slug}`, width: 1200, height: 630 }], title: `${title} | Kozmograf`, description, url: `https://kozmograf.com/melek-sayilari/${a.slug}` },
  };
}

export default async function AngelPage({ params }: Props) {
  const a = getAngel((await params).sayi);
  if (!a) notFound();

  const root = a.root > 0 ? getProfile(a.root) : undefined;
  const others = angelNumbers.filter((x) => x.slug !== a.slug).slice(0, 6);

  const faq = [
    { q: `${a.slug} ne demek?`, a: a.meaning },
    { q: `${a.slug} aşkta ne anlama gelir?`, a: a.love },
    { q: `${a.slug} iş ve kariyerde ne anlama gelir?`, a: a.work },
    { q: `${a.slug} görünce ne yapmalıyım?`, a: a.action },
  ];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/melek-sayilari", label: "Melek sayıları" },
          { label: a.slug },
        ]}
      />

      <section className="grid gap-4 pb-6 pt-8 md:grid-cols-[1fr_340px] md:items-stretch">
        <div className="flex flex-col justify-end">
          <Eyebrow className="mb-4">Melek sayısı</Eyebrow>
          <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] sm:text-6xl">
            {a.slug} anlamı: <em className="text-gold">{a.title}</em>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{a.meaning}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {a.essence.split(" · ").map((e) => (
              <Pill key={e}>{e}</Pill>
            ))}
          </div>
        </div>
        <Illustration k={`melek-${a.slug}` as ImageKey} priority sizes="(min-width: 768px) 340px, 100vw" />
      </section>

      <Section>
        <div className="grid gap-3 md:grid-cols-3">
          <Card>
            <p className="text-[13px] font-semibold text-gold">Aşkta</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.love}</p>
          </Card>
          <Card>
            <p className="text-[13px] font-semibold text-gold">İş ve para</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.work}</p>
          </Card>
          <Card tone="violet">
            <p className="text-[13px] font-semibold">Bugün yap</p>
            <p className="mt-2 font-display text-2xl font-semibold leading-snug">{a.action}</p>
          </Card>
        </div>
        {root && (
          <Card tone="raised" className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[15px] text-muted">
              {a.slug} dizisinin kök enerjisi <strong className="text-text">{a.root}</strong>: {root.title} ({root.keyword})
            </p>
            <Link href={numberHref(a.root)} className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
              {a.root} sayısını oku →
            </Link>
          </Card>
        )}
      </Section>

      <Section eyebrow="Sık sorulanlar" title={`${a.slug} hakkında`}>
        <FAQ items={faq} />
      </Section>

      <Section title="Diğer melek sayıları">
        <RelatedLinks links={others.map((o) => ({ href: `/melek-sayilari/${o.slug}`, label: o.slug, desc: o.title }))} />
      </Section>

      <CTABand title="İşaretler bir yana, senin sayın ne?" />
    </>
  );
}
