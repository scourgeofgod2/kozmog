import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { numbers } from "@/lib/content/numbers";
import { masterNumbers } from "@/lib/content/master";
import { lifePathNumbers } from "@/lib/content/lifePath";
import { careerGuides } from "@/lib/content/careers";
import { strengthProfiles } from "@/lib/content/strengths";
import { destinyProfiles } from "@/lib/content/destiny";
import { ALL_NUMBERS, getProfile, numberHref } from "@/lib/content/profiles";
import {
  Breadcrumbs,
  Card,
  CTABand,
  Eyebrow,
  FAQ,
  JsonLd,
  Pill,
  RelatedLinks,
  Section,
  Illustration,
  faqJsonLd,
} from "@/components/ds";
import type { ImageKey } from "@/lib/content/images.generated";

type Props = { params: Promise<{ sayi: string }> };

export function generateStaticParams() {
  return ALL_NUMBERS.map((n) => ({ sayi: String(n) }));
}

export const dynamicParams = false;

function parse(sayi: string) {
  const n = Number(sayi);
  return (ALL_NUMBERS as readonly number[]).includes(n) ? n : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = parse((await params).sayi);
  const p = n ? getProfile(n) : undefined;
  if (!n || !p) return {};
  const title = `Numerolojide ${n} Sayısının Anlamı: ${p.title}`;
  const description = `${n} sayısı numerolojide ne anlama gelir? ${p.keyword}. Yaşam yolu ${n} kişilik özellikleri, güçlü yanlar, zorluklar, aşk uyumu ve kariyer.`;
  return {
    title,
    description,
    alternates: { canonical: `https://kozmograf.com/sayilarin-anlami/${n}` },
    openGraph: {
      title: `${title} | Kozmograf`,
      description,
      url: `https://kozmograf.com/sayilarin-anlami/${n}`,
      images: [{ url: `/api/og?lp=${n}`, width: 1200, height: 630 }],
    },
  };
}

function List({ items, mark = "✦" }: { items: string[]; mark?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-0.5 text-gold">
            {mark}
          </span>
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function NumberPage({ params }: Props) {
  const n = parse((await params).sayi);
  if (!n) notFound();

  const profile = getProfile(n)!;
  const base = numbers.find((x) => x.n === n);
  const master = masterNumbers.find((x) => x.number === n);
  const lp = lifePathNumbers.find((x) => x.number === n);
  const career = careerGuides.find((x) => x.number === n);
  const strength = strengthProfiles.find((x) => x.number === n);
  const destiny = destinyProfiles.find((x) => x.number === n);

  const strengths = base?.strengths ?? master?.strengths ?? [];
  const challenges = base?.challenges ?? master?.challenges ?? [];
  const careers = career?.idealCareers ?? master?.careers ?? [];

  const idx = ALL_NUMBERS.indexOf(n as (typeof ALL_NUMBERS)[number]);
  const prev = ALL_NUMBERS[(idx - 1 + ALL_NUMBERS.length) % ALL_NUMBERS.length];
  const next = ALL_NUMBERS[(idx + 1) % ALL_NUMBERS.length];

  const faq = [
    {
      q: `Numerolojide ${n} sayısı ne anlama gelir?`,
      a: `${n} sayısı "${profile.title}" arketipini temsil eder: ${profile.keyword}. ${profile.description}`,
    },
    {
      q: `Yaşam yolu sayısı ${n} olanlar nasıldır?`,
      a: lp?.description ?? profile.description,
    },
    ...(base
      ? [
          { q: `${n} sayısı hangi sayılarla uyumludur?`, a: `Numerolojide ${n} sayısıyla en uyumlu sayılar: ${base.bestMatch}.` },
          { q: `${n} sayısının yaşam dersi nedir?`, a: base.lifeLesson + "." },
        ]
      : []),
    ...(master ? [{ q: `${n} usta sayısı nasıl hesaplanır?`, a: master.calculation }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Numerolojide ${n} Sayısının Anlamı`,
        inLanguage: "tr",
        url: `https://kozmograf.com/sayilarin-anlami/${n}`,
        author: { "@type": "Organization", name: "Kozmograf" },
      },
      faqJsonLd(faq),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Ana sayfa" },
          { href: "/sayilarin-anlami", label: "Sayıların anlamı" },
          { label: `${n} sayısı` },
        ]}
      />

      <section className="grid gap-4 pb-6 pt-8 md:grid-cols-[1fr_320px] md:items-stretch">
        <div className="flex flex-col justify-end">
          <Eyebrow className="mb-4">{profile.master ? "Usta sayı" : "Numeroloji"} · {n} sayısı</Eyebrow>
          <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] sm:text-6xl">
            {n} sayısının anlamı: <em className="text-gold">{profile.title}</em>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{profile.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>{profile.keyword}</Pill>
            {base && <Pill>{base.planet}</Pill>}
            {base && <Pill>{base.element}</Pill>}
            {master && <Pill>Temel sayı: {master.baseNumber}</Pill>}
          </div>
        </div>
        <Illustration k={`sayi-${n}` as ImageKey} priority sizes="(min-width: 768px) 320px, 100vw" />
      </section>

      <Section>
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <h2 className="mb-4 font-display text-2xl font-semibold">Güçlü yanlar</h2>
            <List items={strengths} />
          </Card>
          <Card>
            <h2 className="mb-4 font-display text-2xl font-semibold">Zorluklar</h2>
            <List items={challenges} mark="◦" />
          </Card>
          {(base?.lifeLesson || master?.lifeTheme) && (
            <Card tone="gold">
              <p className="text-[13px] font-semibold">{base ? "Yaşam dersi" : "Yaşam teması"}</p>
              <p className="mt-2 font-display text-3xl font-semibold leading-tight">{base?.lifeLesson ?? master?.lifeTheme}</p>
            </Card>
          )}
          {base && (
            <Card tone="raised">
              <p className="text-[13px] text-muted">Aşkta en uyumlu sayılar</p>
              <p className="mt-2 font-display text-5xl font-semibold text-gold">{base.bestMatch}</p>
              <Link href="/uyumluluk" className="mt-3 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                Uyumunu hesapla →
              </Link>
            </Card>
          )}
          {master && (
            <Card tone="raised" className="md:col-span-2">
              <h2 className="mb-2 font-display text-2xl font-semibold">Gölge yön</h2>
              <p className="text-[15px] leading-relaxed text-muted">{master.shadowSide}</p>
            </Card>
          )}
        </div>
      </Section>

      {lp && (
        <Section eyebrow="Yaşam yolu" title={`Yaşam yolu ${n}: ${lp.title}`}>
          <Card className="max-w-3xl">
            <p className="text-[13px] text-gold">{lp.keywords}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{lp.description}</p>
          </Card>
        </Section>
      )}

      {(strength || careers.length > 0) && (
        <Section eyebrow="Yetenek ve kariyer" title="Bu sayı iş hayatında nasıl parlar?">
          <div className="grid gap-3 md:grid-cols-2">
            {strength && (
              <Card tone="violet">
                <p className="text-[13px] font-semibold">Süper güç</p>
                <p className="mt-2 font-display text-3xl font-semibold leading-tight">{strength.superpower}</p>
                <p className="mt-4 text-[15px] leading-relaxed">{strength.hiddenTalent}</p>
              </Card>
            )}
            <Card>
              <h3 className="mb-4 font-display text-2xl font-semibold">İdeal kariyer alanları</h3>
              <div className="flex flex-wrap gap-2">
                {careers.map((c) => (
                  <Pill key={c}>{c}</Pill>
                ))}
              </div>
              {career?.workStyle && <p className="mt-4 text-[15px] leading-relaxed text-muted">{career.workStyle}</p>}
              {career?.avoidCareers && (
                <p className="mt-3 text-[14px] text-faint">Uzak durulması önerilenler: {career.avoidCareers}</p>
              )}
            </Card>
          </div>
        </Section>
      )}

      {destiny && (
        <Section eyebrow="Kader sayısı" title={`İsmin ${n} çıkıyorsa: ${destiny.title}`}>
          <Card className="max-w-3xl">
            <p className="text-[13px] text-gold">{destiny.traits}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{destiny.strengths}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{destiny.challenges}</p>
            <Link href="/isim-numeroloji" className="mt-4 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
              İsmini hesapla →
            </Link>
          </Card>
        </Section>
      )}

      <Section eyebrow="Sık sorulanlar" title={`${n} sayısı hakkında`}>
        <FAQ items={faq} />
      </Section>

      <Section title="Diğer sayılar">
        <RelatedLinks
          links={[
            { href: numberHref(prev), label: `← ${prev} sayısı`, desc: getProfile(prev)?.title },
            { href: numberHref(next), label: `${next} sayısı →`, desc: getProfile(next)?.title },
            { href: "/sayilarin-anlami", label: "Tüm sayılar", desc: "1'den 9'a, usta sayılar" },
          ]}
        />
      </Section>

      <CTABand title={`Senin sayın ${n} mi?`} />
    </>
  );
}
