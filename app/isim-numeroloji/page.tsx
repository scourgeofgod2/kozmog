import type { Metadata } from "next";
import Link from "next/link";
import { destinyProfiles, letterRows, faqItems } from "@/lib/content/destiny";
import { numberHref } from "@/lib/content/profiles";
import NameCalculator from "@/components/forms/NameCalculator";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "İsim Numerolojisi Hesaplama — İsmin Sayısal Anlamı ve Kader Sayısı",
  description:
    "İsim numerolojisi ile adınızın taşıdığı enerjiyi ve kader sayınızı hemen hesaplayın. Pisagor sistemiyle her harfin sayısal değeri, ruh ve kişilik sayısı. Türkçe harf desteği.",
  keywords:
    "isim numeroloji, isim numerolojisi hesaplama, isim sayısı hesaplama, kader sayısı, Pythagoras numeroloji, harflerin sayısal değeri, isim analizi numeroloji",
  alternates: { canonical: "https://kozmograf.com/isim-numeroloji" },
  openGraph: {
    title: "İsim Numerolojisi — Adının Gizli Enerjisini Keşfet | Kozmograf",
    description: "İsmin sayısal değeri kişiliğin ve kaderinin şifrelerini taşır. Pisagor sistemiyle isim analizi yap.",
    url: "https://kozmograf.com/isim-numeroloji",
  },
};

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// letterRows'u ("A=1" çiftleri) sayı sütunlarına göre grupla
const cols: Record<number, string[]> = {};
letterRows.forEach((r) =>
  r.letters.forEach((pair) => {
    const [ch, v] = pair.split("=");
    (cols[Number(v)] ??= []).push(ch);
  })
);
const depth = Math.max(...Object.values(cols).map((c) => c.length));

export default function IsimNumeroloji() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faqItems) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "İsim numerolojisi" }]} />
      <PageHero
        eyebrow="Pisagor sistemi"
        title="İsminin taşıdığı"
        accent="gizli enerji"
        lead="İsmin sadece bir etiket değil. Pisagor numerolojisi her harfe bir sayı değeri atar; bu değerlerin toplamı kader sayını ortaya çıkarır."
      >
        <NameCalculator />
      </PageHero>

      <Section eyebrow="Harf-sayı tablosu" title="Her harf bir sayı" lead="Türkçe harfler dahil. İsmindeki harflerin değerlerini topla, tek basamağa indir: bu senin kader sayın.">
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-separate border-spacing-1.5 text-center">
            <caption className="sr-only">Pisagor harf-sayı tablosu</caption>
            <thead>
              <tr>
                {DIGITS.map((n) => (
                  <th key={n} scope="col" className="font-display text-3xl font-semibold text-gold">
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: depth }, (_, row) => (
                <tr key={row}>
                  {DIGITS.map((n) => (
                    <td key={n} className={cols[n]?.[row] ? "rounded-[10px] bg-surface-2 py-2 text-[15px] font-medium" : ""}>
                      {cols[n]?.[row] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Card tone="raised">
            <p className="text-[13px] text-gold">Örnek: AHMET</p>
            <p className="mt-2 font-mono text-[15px] text-text">A=1, H=8, M=4, E=5, T=2 → 20 → 2+0 = 2</p>
          </Card>
          <Card tone="raised">
            <p className="text-[13px] text-gold">Örnek: ZEYNEP</p>
            <p className="mt-2 font-mono text-[15px] text-text">Z=8, E=5, Y=7, N=5, E=5, P=7 → 37 → 10 → 1</p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Kader sayısı profilleri" title="İsmin ne söylüyor?">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {destinyProfiles.map((d) => (
            <Card key={d.number} id={`sayi-${d.number}`} as="article" className="flex scroll-mt-24 flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-3xl font-semibold leading-tight">{d.title}</h3>
                <span className="font-display text-6xl font-semibold leading-[0.8] text-gold">{d.number}</span>
              </div>
              <p className="mt-2 text-[13px] text-gold">{d.traits}</p>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{d.strengths}</p>
              <p className="mt-3 text-[14px] text-faint">Gelişim: {d.challenges}</p>
              <p className="mt-3 text-[14px] text-text">Yaşam teması: {d.lifeTheme}</p>
              <Link href={numberHref(d.number)} className="mt-3 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                {d.number} sayısının tam anlamı →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="İsim numerolojisi hakkında">
        <FAQ items={faqItems} />
      </Section>

      <CTABand
        title="İsmin ve doğum tarihin birlikte"
        lead="İkisini birlikte girersen yaşam yolu, kader, ruh ve kişilik sayılarınla tam yorumunu alırsın."
        secondary={{ href: "/yasam-yolu", label: "Yaşam yolu rehberi" }}
      />
    </>
  );
}
