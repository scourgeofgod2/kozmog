import type { Metadata } from "next";
import Link from "next/link";
import { birthDayNotes, birthDayRoot } from "@/lib/content/birthDay";
import { getProfile, numberHref } from "@/lib/content/profiles";
import { Breadcrumbs, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

export const metadata: Metadata = {
  title: "Doğum Günü Sayısı — Ayın Kaçında Doğdun? 1'den 31'e Anlamları",
  description:
    "Numerolojide doğum günü sayısı: ayın 1'inden 31'ine kadar her doğum gününün anlamı, yetenekleri ve kişilik tonu. Usta günler 11, 22 ve karmik günler 13, 14, 16, 19.",
  keywords:
    "doğum günü sayısı, doğum günü numeroloji, ayın kaçında doğdun, numeroloji doğum günü anlamı, 11 doğumlu, 22 doğumlu, doğum günü kişilik",
  alternates: { canonical: "https://kozmograf.com/dogum-gunu-sayisi" },
  openGraph: {
    title: "Doğum Günü Sayısı — 1'den 31'e Anlamları | Kozmograf",
    description: "Ayın kaçında doğduğun, kişiliğin hakkında ne söylüyor?",
    url: "https://kozmograf.com/dogum-gunu-sayisi",
  },
};

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const karmic = new Set([13, 14, 16, 19]);

const faq = [
  {
    q: "Doğum günü sayısı nedir?",
    a: "Doğum günü sayısı, doğduğun günün (ayın 1'i ile 31'i arası) numerolojik değeridir. Yaşam yolu sayının yanında sana özgü bir yeteneği ya da kişilik tonunu gösterir.",
  },
  {
    q: "Doğum günü sayısı nasıl hesaplanır?",
    a: "Doğduğun gün tek basamağa indirgenir: 25 → 2+5 = 7. 11 ve 22 usta sayı olduğu için indirgenmez. 13, 14, 16 ve 19 ise karmik borç günleri olarak ayrıca değerlendirilir.",
  },
  {
    q: "Yaşam yolu ile doğum günü sayısı farkı nedir?",
    a: "Yaşam yolu tüm doğum tarihinden hesaplanır ve hayatın ana yolunu gösterir. Doğum günü sayısı ise yalnızca günden gelir ve bu yolda kullandığın özel bir yeteneği anlatır.",
  },
];

export default function DogumGunuSayisi() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Doğum günü sayısı" }]} />
      <PageHero
        eyebrow="Numeroloji"
        title="Ayın kaçında"
        accent="doğdun?"
        lead="Doğum günün, yaşam yolunun yanında sana özel bir yeteneği anlatır. Gününe dokun, anlamını oku."
      />

      <nav aria-label="Gün seç" className="-mt-4 mb-4">
        <ul className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {days.map((d) => (
            <li key={d}>
              <a
                href={`#gun-${d}`}
                className={
                  "flex aspect-square min-h-[44px] items-center justify-center rounded-[12px] border font-display text-xl font-semibold transition-colors " +
                  (d === 11 || d === 22
                    ? "border-violet-soft/60 text-violet-soft"
                    : karmic.has(d)
                      ? "border-line text-faint"
                      : "border-line text-text") +
                  " hover:border-gold hover:text-gold"
                }
              >
                {d}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] text-faint">
          <span className="text-violet-soft">Mor</span>: usta günler · Soluk: karmik günler
        </p>
      </nav>

      <Section eyebrow="1'den 31'e" title="Her doğum gününün anlamı">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {days.map((d) => {
            const root = birthDayRoot(d);
            const p = getProfile(root);
            return (
              <article
                key={d}
                id={`gun-${d}`}
                className="flex scroll-mt-24 gap-4 rounded-[var(--radius-tile)] border border-line bg-surface p-4"
              >
                <span
                  className={
                    "grid h-16 w-16 flex-none place-items-center rounded-[14px] font-display text-3xl font-semibold " +
                    (d === 11 || d === 22 ? "bg-violet text-violet-ink" : "bg-gold text-gold-ink")
                  }
                >
                  {d}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-text">
                    {d}. gün{" "}
                    <span className="font-normal text-faint">
                      · {d !== root && `${root} · `}
                      {p?.title}
                      {karmic.has(d) && " · karmik"}
                    </span>
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{birthDayNotes[d]}</p>
                  <Link href={numberHref(root)} className="mt-1 inline-flex min-h-[36px] items-center text-[13px] font-semibold text-gold">
                    {root} sayısını oku →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Doğum günü sayısı hakkında">
        <FAQ items={faq} />
      </Section>

      <Section title="Devam et">
        <RelatedLinks
          links={[
            { href: "/karmik-borc", label: "Karmik borç", desc: "13, 14, 16, 19" },
            { href: "/yasam-yolu", label: "Yaşam yolu sayısı", desc: "Tüm tarihin anlamı" },
            { href: "/kisisel-yil", label: "2027 kişisel yılın", desc: "Yılın teması" },
          ]}
        />
      </Section>

      <CTABand />
    </>
  );
}
