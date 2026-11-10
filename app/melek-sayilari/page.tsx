import type { Metadata } from "next";
import Link from "next/link";
import { angelNumbers } from "@/lib/content/angel";
import { Breadcrumbs, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Melek Sayıları ve Anlamları — 111, 222, 333, 444, 555 Ne Demek?",
  description:
    "Melek sayıları rehberi: 000, 111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 1212 sayılarının numerolojik anlamı. Aşk, iş ve hayat için mesajları.",
  keywords:
    "melek sayıları, melek sayıları anlamları, 111 anlamı, 222 anlamı, 333 anlamı, 444 anlamı, 555 anlamı, 777 anlamı, 1212 anlamı, tekrar eden sayılar",
  alternates: { canonical: "https://kozmograf.com/melek-sayilari" },
  openGraph: {
    title: "Melek Sayıları — 111, 222, 444 Sürekli Görüyorsan | Kozmograf",
    description: "Tekrar eden sayıların numerolojik anlamı: aşk, iş ve hayat için mesajları.",
    url: "https://kozmograf.com/melek-sayilari",
  },
};

const faq = [
  {
    q: "Melek sayıları nedir?",
    a: "Melek sayıları; plakalarda, saatlerde, fişlerde sürekli karşına çıkan 111, 222, 444 gibi tekrar eden sayı dizileridir. Numerolojide her biri, içindeki rakamın enerjisinin güçlenmiş hali olarak yorumlanır.",
  },
  {
    q: "Sürekli aynı sayıyı görmek ne anlama gelir?",
    a: "Numerolojik yaklaşıma göre bu, o sayının temsil ettiği temaya dikkat etmen için bir hatırlatmadır. Bilimsel bir kanıtı yoktur; ancak bir an durup düşünmek ve niyetini gözden geçirmek için iyi bir vesiledir.",
  },
  {
    q: "Melek sayıları ile ayna saatler aynı şey mi?",
    a: "Benzerdir. Ayna saatler (11:11, 22:22) saat üzerindeki tekrarlardır; melek sayıları ise her yerde karşına çıkabilen dizilerdir. İkisi de aynı rakam enerjileriyle yorumlanır.",
  },
  {
    q: "666 kötü bir sayı mı?",
    a: "Numerolojide 666 kötü bir sayı değildir; 6'nın sevgi, aile ve sorumluluk enerjisini taşır ve maddi ile duygusal hayat arasında denge kurma çağrısı olarak yorumlanır.",
  },
];

export default function MelekSayilari() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Melek sayıları" }]} />
      <PageHero
        eyebrow="Tekrar eden sayılar"
        title="Melek sayıları:"
        accent="sürekli görüyorsan"
        lead="Plakada 444, fişte 222, saatte 11:11… Numerolojide tekrar eden her dizi, içindeki rakamın güçlenmiş bir mesajı olarak yorumlanır. Gördüğün sayıya dokun."
      />

      <Section eyebrow="Rehber" title="Hangi sayıyı görüyorsun?">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {angelNumbers.map((a, i) => (
            <Link
              key={a.slug}
              href={`/melek-sayilari/${a.slug}`}
              className={
                "flex min-h-[170px] flex-col justify-between rounded-[var(--radius-card)] p-5 transition-colors " +
                (i === 4 ? "bg-gold text-gold-ink" : i === 1 ? "bg-violet text-violet-ink" : "border border-line bg-surface hover:border-gold/70")
              }
            >
              <span className={"font-display text-5xl font-semibold leading-none " + (i === 4 || i === 1 ? "" : "text-gold")}>
                {a.slug}
              </span>
              <span>
                <span className="block text-[16px] font-semibold">{a.title}</span>
                <span className={"mt-1 block text-[13px] " + (i === 4 || i === 1 ? "opacity-85" : "text-muted")}>{a.essence}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Melek sayıları hakkında">
        <FAQ items={faq} />
      </Section>

      <Section title="Benzer rehberler">
        <RelatedLinks
          links={[
            { href: "/saat-anlami", label: "Ayna saatler", desc: "11:11, 22:22, 00:00" },
            { href: "/usta-sayilar", label: "Usta sayılar", desc: "11 · 22 · 33" },
            { href: "/sayilarin-anlami", label: "Sayıların anlamı", desc: "1'den 9'a" },
          ]}
        />
      </Section>

      <CTABand title="Peki senin sayın ne?" />
    </>
  );
}
