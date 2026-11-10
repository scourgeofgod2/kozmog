import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import { mirrorHours, faqItems } from "@/lib/content/mirrorHours";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Saatlerin Anlamı: 11:11, 22:22 ve Ayna Saatler",
  description:
    "11:11 anlamı nedir? 22:22, 00:00, 01:01 ve tüm çift saatlerin numerolojik ve spiritüel mesajlarını öğrenin. Ayna saatler rehberi: tekrarlayan saatler ve evrenin mesajları.",
  keywords:
    "11:11 anlamı, saat 11:11 ne demek, çift saatler anlamı, 22:22 anlamı, 00:00 anlamı, saatlerin anlamı numeroloji, ayna saatler, tekrarlayan saatler anlamı, 01:01 anlamı, 03:03 anlamı",
  alternates: { canonical: "https://kozmograf.com/saat-anlami" },
  openGraph: {
    images: OG_DEFAULT,
    title: "11:11 Anlamı, Çift Saatler ve Ayna Saatler | Kozmograf",
    description: "11:11, 22:22, 00:00 ve tüm çift saatlerin numerolojik mesajları. Ücretsiz rehber.",
    url: "https://kozmograf.com/saat-anlami",
  },
};

const anchor = (time: string) => `saat-${time.replace(":", "")}`;

export default function SaatAnlami() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faqItems) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Ayna saatler" }]} />
      <PageHero
        image="sayfa-ayna-saatler-11-11"
        eyebrow="Ayna saatler ve senkronisite"
        title="Saatlerin"
        accent="gizli mesajı"
        lead="Telefona baktığında tekrar tekrar 11:11 ya da 22:22 mi görüyorsun? Numerolojiye göre bu tekrarlar dikkatini çekmek isteyen birer işaret. 00:00'dan 23:23'e tüm çift saatlerin anlamı burada."
      />

      <nav aria-label="Saat seç" className="-mt-4 mb-4">
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-12">
          {mirrorHours.map((h) => (
            <li key={h.time}>
              <a
                href={`#${anchor(h.time)}`}
                className={
                  "flex min-h-[48px] items-center justify-center rounded-[14px] border font-display text-xl font-semibold transition-colors " +
                  (h.isSpecial ? "border-gold/60 text-gold hover:bg-gold hover:text-ink" : "border-line text-text hover:border-gold")
                }
              >
                {h.time}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section eyebrow="Saat rehberi" title="Her saatin mesajı">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {mirrorHours.map((h) => (
            <Card
              key={h.time}
              id={anchor(h.time)}
              as="article"
              tone={h.isSpecial ? "outline" : "default"}
              className="flex scroll-mt-24 flex-col"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-5xl font-semibold text-gold">{h.time}</h3>
                {h.isSpecial && (
                  <span className="rounded-full bg-violet px-2.5 py-1 text-[11px] font-semibold text-violet-ink">Usta sayı</span>
                )}
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">{h.title}</p>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{h.message}</p>
              <p className="mt-4 rounded-[14px] bg-surface-2 p-3 text-[14px] italic text-text">“{h.angel}”</p>
              <p className="mt-3 text-[13px] text-faint">{h.numerology}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Saatlerin anlamı hakkında">
        <FAQ items={faqItems} />
      </Section>

      <Section title="Benzer işaretler">
        <RelatedLinks
          links={[
            { href: "/melek-sayilari", label: "Melek sayıları", desc: "111, 222, 333, 444…" },
            { href: "/usta-sayilar", label: "Usta sayılar", desc: "11 · 22 · 33" },
            { href: "/sayilarin-anlami", label: "Sayıların anlamı", desc: "1'den 9'a" },
          ]}
        />
      </Section>

      <CTABand
        title="Kendi sayını da öğren"
        lead="Saatlerdeki mesajlar, kendi sayı enerjinle birleşince çok daha anlamlı hale gelir."
      />
    </>
  );
}
