import type { Metadata } from "next";
import Link from "next/link";
import { lifePathNumbers } from "@/lib/content/lifePath";
import { numberHref } from "@/lib/content/profiles";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Yaşam Yolu Sayısı — Numeroloji Hesaplama ve Anlam Rehberi",
  description:
    "Yaşam yolu sayınızı öğrenin ve anlamını keşfedin. 1'den 9'a, usta sayılar 11, 22, 33 dahil tüm yaşam yolu sayılarının detaylı açıklamaları.",
  keywords: "yaşam yolu sayısı, yaşam yolu sayısı hesaplama, yaşam yolu numeroloji, numeroloji 1 2 3 4 5 6 7 8 9",
  alternates: { canonical: "https://kozmograf.com/yasam-yolu" },
  openGraph: {
    title: "Yaşam Yolu Sayısı — Numeroloji Rehberi | Kozmograf",
    description: "Doğum tarihinizden hesaplanan yaşam yolu sayınızın derin anlamını keşfedin.",
    url: "https://kozmograf.com/yasam-yolu",
  },
};

const faq = [
  {
    q: "Yaşam yolu sayısı nasıl hesaplanır?",
    a: "Doğum tarihinin tüm rakamları toplanır ve sonuç tek basamağa indirgenir. 15.03.1990 için: 1+5+0+3+1+9+9+0 = 28 → 2+8 = 10 → 1+0 = 1. Ara toplamda 11, 22 veya 33 çıkarsa indirgeme yapılmaz.",
  },
  {
    q: "Yaşam yolu sayısı değişir mi?",
    a: "Hayır. Doğum tarihine bağlı olduğu için ömür boyu aynı kalır. Her yıl değişen sayı kişisel yıl sayısıdır.",
  },
  {
    q: "En iyi yaşam yolu sayısı hangisi?",
    a: "Numerolojide iyi ya da kötü sayı yoktur. Her sayının kendine özgü güçlü yanları ve aşması gereken dersleri vardır.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "Yaşam yolu sayısı nasıl hesaplanır?",
      step: [
        { "@type": "HowToStep", text: "Doğum tarihini GG.AA.YYYY olarak yaz." },
        { "@type": "HowToStep", text: "Tüm rakamları topla." },
        { "@type": "HowToStep", text: "Sonucu tek basamağa inene kadar topla; 11, 22, 33 çıkarsa dur." },
      ],
    },
    faqJsonLd(faq),
  ],
};

export default function YasamYoluPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Yaşam yolu sayısı" }]} />
      <PageHero
        eyebrow="Numeroloji rehberi"
        title="Yaşam yolu sayısı:"
        accent="doğum tarihinin mesajı"
        lead="Yaşam yolu sayısı numerolojide en temel sayıdır. Doğum tarihinden hesaplanır; hayatının amacını, doğal yeteneklerini ve karşılaşacağın dersleri ortaya koyar."
      >
        <QuickNumber />
      </PageHero>

      <Section eyebrow="Hesaplama yöntemi" title="Nasıl hesaplanır?">
        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
          <Card>
            <p className="text-[15px] leading-relaxed text-muted">
              Doğum tarihinin tüm rakamlarını topla ve sonucu tek basamağa indirge. 11, 22 veya 33 gibi usta sayılar elde
              edilirse bu sayılar olduğu gibi kalır.
            </p>
            <ol className="mt-5 space-y-3">
              {["Doğum tarihi: 15 Mart 1990", "1 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 28", "2 + 8 = 10 → 1 + 0 = 1"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-surface-3 text-[13px] font-semibold text-gold">
                    {i + 1}
                  </span>
                  <span className="font-mono text-[15px] text-text">{s}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card tone="gold" className="flex flex-col justify-between">
            <p className="text-[13px] font-semibold">Sonuç</p>
            <p className="font-display text-[8rem] font-semibold leading-[0.8]">1</p>
            <p className="font-display text-3xl font-semibold">Lider</p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Tüm sayılar" title="Yaşam yolu sayılarının anlamları">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {lifePathNumbers.map((l) => (
            <Card key={l.number} id={`sayi-${l.number}`} as="article" tone={l.isMaster ? "raised" : "default"} className="flex scroll-mt-24 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  {l.isMaster && <p className="text-[12px] font-semibold text-violet-soft">Usta sayı</p>}
                  <h3 className="font-display text-3xl font-semibold">{l.title}</h3>
                  <p className="mt-1 text-[13px] text-gold">{l.keywords}</p>
                </div>
                <span className={"font-display text-6xl font-semibold leading-[0.8] " + (l.isMaster ? "text-violet-soft" : "text-gold")}>
                  {l.number}
                </span>
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{l.description}</p>
              <p className="mt-4 text-[13px] text-faint">Kariyer: {l.careers}</p>
              <Link href={numberHref(l.number)} className="mt-3 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                Detaylı oku →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Yaşam yolu hakkında">
        <FAQ items={faq} />
      </Section>

      <CTABand
        lead="Doğum tarihini gir, saniyeler içinde yaşam yolu sayını ve kişisel yorumunu al."
        secondary={{ href: "/uyumluluk", label: "Aşk uyumu" }}
      />
    </>
  );
}
