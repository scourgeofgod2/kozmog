import type { Metadata } from "next";
import { OG_DEFAULT } from "@/lib/site";
import Link from "next/link";
import { careerGuides } from "@/lib/content/careers";
import { numberHref } from "@/lib/content/profiles";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, PageHero, Pill, Section } from "@/components/ds";

export const metadata: Metadata = {
  title: "Kariyer Numerolojisi: Sayına Göre Meslek",
  description:
    "Kariyer numerolojisi ile doğum tarihinizden hesaplanan yaşam yolu sayınıza göre en uygun meslek alanlarını öğrenin. 1'den 9'a tüm sayılar için ücretsiz kariyer analizi.",
  keywords:
    "kariyer numeroloji, numeroloji meslek seçimi, doğum tarihine göre kariyer, yaşam yolu sayısı kariyer, numeroloji iş hayatı, numeroloji kariyer rehberi, numeroloji hangi meslek",
  alternates: { canonical: "https://kozmograf.com/kariyer-numerolojisi" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Kariyer Numerolojisi — Doğum Tarihine Göre Meslek Analizi | Kozmograf",
    description: "Yaşam yolu sayınızın iş hayatınıza yansımaları ve ideal meslek önerileri. Ücretsiz.",
    url: "https://kozmograf.com/kariyer-numerolojisi",
  },
};

export default function KariyerNumerolojisiPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Kariyer numerolojisi" }]} />
      <PageHero
        image="sayfa-kariyer-numerolojisi"
        eyebrow="Kariyer rehberi"
        title="Sayın seni hangi"
        accent="mesleğe çağırıyor?"
        lead="Yaşam yolu sayın doğuştan gelen yeteneklerini ve güçlü yanlarını ortaya koyar. Bu enerjilerle uyumlu kariyerlerde hem başarı hem de derin tatmin bulursun."
      >
        <QuickNumber cta="Kariyerimi göster" />
      </PageHero>

      <Section eyebrow="Sayıya göre kariyer" title="Yaşam yolu sayına göre kariyer rehberi">
        <div className="grid gap-3 lg:grid-cols-2">
          {careerGuides.map((c) => (
            <Card key={c.number} id={`sayi-${c.number}`} as="article" className="scroll-mt-24">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 flex-none place-items-center rounded-[16px] bg-gold font-display text-4xl font-semibold text-gold-ink">
                  {c.number}
                </span>
                <h3 className="font-display text-3xl font-semibold leading-tight">{c.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.idealCareers.map((x) => (
                  <Pill key={x}>{x}</Pill>
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{c.workStyle}</p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[14px] bg-surface-2 p-4">
                  <dt className="text-[12px] font-semibold text-gold">Güçlü yanlar</dt>
                  <dd className="mt-1 text-[14px] text-muted">{c.strengths}</dd>
                </div>
                <div className="rounded-[14px] bg-surface-2 p-4">
                  <dt className="text-[12px] font-semibold text-gold">Dikkat et</dt>
                  <dd className="mt-1 text-[14px] text-muted">{c.challenges}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[13px] text-faint">Uzak dur: {c.avoidCareers}</p>
              <Link href={numberHref(c.number)} className="mt-2 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold">
                {c.number} sayısının tam profili →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CTABand
        title="Sayını hesapla, yolunu bul"
        lead="Yaşam yolu sayını öğren ve rehberde tam sana göre olan kariyer yolunu keşfet."
        secondary={{ href: "/gucler-ve-yetenekler", label: "Güçlü yanlarım" }}
      />
    </>
  );
}
