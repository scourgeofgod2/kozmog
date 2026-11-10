import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { images, type ImageKey } from "@/lib/content/images.generated";
import { angelNumbers } from "@/lib/content/angel";
import { Breadcrumbs, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Melek Sayıları ve Anlamları: 111, 222, 444",
  description:
    "Melek sayıları rehberi: 000, 111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 1212 sayılarının numerolojik anlamı. Aşk, iş ve hayat için mesajları.",
  keywords:
    "melek sayıları, melek sayıları anlamları, 111 anlamı, 222 anlamı, 333 anlamı, 444 anlamı, 555 anlamı, 777 anlamı, 1212 anlamı, tekrar eden sayılar",
  alternates: { canonical: "https://kozmograf.com/melek-sayilari" },
  openGraph: {
    images: OG_DEFAULT,
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
        image="sayfa-melek-sayilari"
        eyebrow="Tekrar eden sayılar"
        title="Melek sayıları:"
        accent="sürekli görüyorsan"
        lead="Plakada 444, fişte 222, saatte 11:11… Numerolojide tekrar eden her dizi, içindeki rakamın güçlenmiş bir mesajı olarak yorumlanır. Gördüğün sayıya dokun."
      />

      <Section eyebrow="Rehber" title="Hangi sayıyı görüyorsun?">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {angelNumbers.map((a) => (
            <Link
              key={a.slug}
              href={`/melek-sayilari/${a.slug}`}
              className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors hover:border-gold/70"
            >
              <Image
                src={images[`melek-${a.slug}` as ImageKey].src}
                alt={images[`melek-${a.slug}` as ImageKey].alt}
                width={800}
                height={800}
                unoptimized
                sizes="(min-width: 1024px) 270px, 50vw"
                className="h-auto w-full"
              />
              <span className="block px-4 pb-4 pt-1">
                <span className="block text-[15px] font-semibold text-text">{a.slug} · {a.title}</span>
                <span className="mt-0.5 block text-[13px] text-muted">{a.essence}</span>
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
