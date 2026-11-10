import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import Link from "next/link";
import { strengthProfiles } from "@/lib/content/strengths";
import { numberHref } from "@/lib/content/profiles";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, PageHero, Section } from "@/components/ds";

export const metadata: Metadata = {
  title: "Numeroloji ile Güçlü Yanlar ve Yetenekler",
  description:
    "Numeroloji ile güçlü yanlarınızı ve gizli yeteneklerinizi keşfedin. Doğum tarihinizden hesaplanan yaşam yolu sayınız doğal becerilerinizi ve gelişim alanlarınızı ortaya koyar. Ücretsiz analiz.",
  keywords:
    "numeroloji güçlü yanlar, gizli yetenekler numeroloji, numeroloji kişilik analizi, yaşam yolu yetenekler, doğum tarihi kişilik özellikleri, numeroloji karakter analizi",
  alternates: { canonical: "https://kozmograf.com/gucler-ve-yetenekler" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Numeroloji ile Güçlü Yanlar ve Gizli Yetenekler | Kozmograf",
    description: "Doğum tarihinize göre gizli yeteneklerinizi ve doğal güçlerinizi keşfedin.",
    url: "https://kozmograf.com/gucler-ve-yetenekler",
  },
};

export default function GuclerVeYeteneklerPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Güçler ve yetenekler" }]} />
      <PageHero
        image="sayfa-gucler-ve-yetenekler"
        eyebrow="Güçlü yanlar rehberi"
        title="Sayında yazılı olan"
        accent="potansiyel"
        lead="Yaşam yolu sayın doğal güçlerini, henüz keşfetmediğin gizli yeteneklerini ve büyüme için en verimli alanlarını ortaya koyar."
      >
        <QuickNumber cta="Güçlerimi göster" />
      </PageHero>

      <Section eyebrow="Sayıya göre güç profili" title="Her sayının benzersiz güç profili">
        <div className="flex flex-col gap-4">
          {strengthProfiles.map((s, i) => (
            <article key={s.number} id={`sayi-${s.number}`} className="grid scroll-mt-24 gap-3 md:grid-cols-[260px_1fr]">
              <div
                className={
                  "flex min-h-[200px] flex-col justify-between rounded-[var(--radius-card)] p-6 " +
                  (i % 2 === 0 ? "bg-gold text-gold-ink" : "bg-violet text-violet-ink")
                }
              >
                <span className="font-display text-7xl font-semibold leading-none">{s.number}</span>
                <span>
                  <span className="block font-display text-3xl font-semibold leading-tight">{s.title}</span>
                  <span className="text-[14px]">{s.tagline}</span>
                </span>
              </div>
              <Card>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {s.coreStrengths.map((c) => (
                    <div key={c.name} className="rounded-[14px] bg-surface-2 p-3">
                      <p className="text-[14px] font-semibold text-text">{c.name}</p>
                      <p className="mt-1 text-[13px] leading-snug text-muted">{c.desc}</p>
                    </div>
                  ))}
                </div>
                <dl className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <dt className="text-[12px] font-semibold text-gold">Süper güç</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-text">{s.superpower}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold text-gold">Gizli yetenek</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-muted">{s.hiddenTalent}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-semibold text-gold">Büyüme alanı</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-muted">{s.growthArea}</dd>
                  </div>
                </dl>
                <Link href={numberHref(s.number)} className="mt-3 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                  {s.number} sayısının tam profili →
                </Link>
              </Card>
            </article>
          ))}
        </div>
      </Section>

      <CTABand
        title="Güçlerini keşfetmeye hazır mısın?"
        lead="Yaşam yolu sayını öğren ve güç profilinde tam sana ait olan bölümü oku."
        secondary={{ href: "/kariyer-numerolojisi", label: "Kariyer rehberi" }}
      />
    </>
  );
}
