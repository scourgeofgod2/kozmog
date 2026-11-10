import type { Metadata } from "next";
import { personalYears } from "@/lib/content/personalYear";
import QuickNumber from "@/components/forms/QuickNumber";
import { Breadcrumbs, Card, CTABand, FAQ, JsonLd, PageHero, RelatedLinks, Section, faqJsonLd } from "@/components/ds";

const YEAR = 2027;

export const metadata: Metadata = {
  title: `${YEAR} Kişisel Yıl Sayısı Hesaplama — ${YEAR} Senin İçin Nasıl Geçecek?`,
  description: `${YEAR} numerolojisi: doğum tarihinle kişisel yıl sayını hesapla. Aşk, kariyer ve para için ${YEAR} yılının teması, fırsatları ve dikkat etmen gerekenler. ${YEAR} evrensel yıl sayısı 11.`,
  keywords: `${YEAR} numeroloji, ${YEAR} kişisel yıl sayısı, kişisel yıl hesaplama, ${YEAR} numeroloji yorumu, ${YEAR} nasıl geçecek, ${YEAR} evrensel yıl, kişisel yıl 1, kişisel yıl 9`,
  alternates: { canonical: "https://kozmograf.com/kisisel-yil" },
  openGraph: {
    title: `${YEAR} Kişisel Yıl Sayın — ${YEAR} Seni Ne Bekliyor? | Kozmograf`,
    description: `Doğum tarihini gir, ${YEAR} kişisel yıl sayını ve yılın temasını öğren.`,
    url: "https://kozmograf.com/kisisel-yil",
  },
};

const faq = [
  {
    q: "Kişisel yıl sayısı nasıl hesaplanır?",
    a: `Doğum gününün ve ayının rakamları, içinde bulunulan yılın rakamlarıyla toplanır ve tek basamağa indirgenir. Örneğin 15 Mart doğumlu biri için ${YEAR}: 1+5 + 3 + 2+0+2+7 = 20 → 2+0 = 2. Kişisel yıl sayısı 2'dir.`,
  },
  {
    q: `${YEAR} yılının evrensel sayısı nedir?`,
    a: `${YEAR} yılının rakamları toplandığında 2+0+2+7 = 11 elde edilir. 11 bir usta sayıdır; sezgi, ilham ve farkındalık temalarını taşır. Bu, herkes için ortak olan arka plan enerjisidir; kişisel yıl sayın ise sana özeldir.`,
  },
  {
    q: "Kişisel yıl ne zaman başlar?",
    a: "Yaygın yaklaşımda kişisel yıl 1 Ocak'ta başlar ve 31 Aralık'ta biter. Bazı numerologlar ise yılın etkisinin doğum gününden itibaren tam hissedildiğini söyler. Geçiş dönemlerinde iki yılın enerjisini birlikte hissetmen doğaldır.",
  },
  {
    q: "Kişisel yıl döngüsü nedir?",
    a: "Kişisel yıllar 1'den 9'a uzanan dokuz yıllık bir döngü izler: 1 başlangıç, 5 değişim, 9 kapanıştır. Ardından döngü yeniden 1 ile başlar.",
  },
];

export default function KisiselYilPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...faqJsonLd(faq) }} />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: `${YEAR} kişisel yıl` }]} />
      <PageHero
        eyebrow={`${YEAR} numerolojisi`}
        title={`${YEAR} senin için`}
        accent="nasıl geçecek?"
        lead="Kişisel yıl sayın, yılın sana getireceği ana temayı gösterir: başlangıç mı, değişim mi, hasat mı, kapanış mı? Doğum tarihini gir, yılını oku."
      >
        <QuickNumber
          mode="personalYear"
          year={YEAR}
          anchorPrefix="yil-"
          cta={`${YEAR} yılımı göster`}
          resultLabel={`${YEAR} kişisel yılın`}
        />
      </PageHero>

      <Section>
        <div className="grid gap-3 md:grid-cols-[1fr_1.4fr]">
          <div className="flex min-h-[240px] flex-col justify-between rounded-[var(--radius-card)] bg-violet p-6 text-violet-ink">
            <p className="text-[13px] font-semibold">{YEAR} evrensel yıl sayısı</p>
            <p className="font-display text-[8rem] font-semibold leading-[0.8]">11</p>
            <p className="font-display text-2xl font-semibold">Usta sayı: uyanış ve sezgi</p>
          </div>
          <Card className="koz-prose">
            <p>
              <strong>{YEAR}</strong>, rakamları toplandığında <strong>11</strong> eden bir usta yıl. Numerolojide 11;
              sezginin keskinleştiği, ilhamın ve farkındalığın arttığı, duyguların yoğunlaştığı bir enerji olarak
              yorumlanır. Bu enerji herkes için ortak bir arka plan çizer.
            </p>
            <p>
              Senin yılını asıl belirleyen ise doğum gününden ve ayından hesaplanan <strong>kişisel yıl sayın</strong>.
              Aşağıda her sayının {YEAR} için anlamını bulabilirsin.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Kişisel yıl sayıları" title={`Sayına göre ${YEAR}`}>
        <div className="flex flex-col gap-4">
          {personalYears.map((y) => (
            <article key={y.n} id={`yil-${y.n}`} className="grid scroll-mt-24 gap-3 lg:grid-cols-[280px_1fr]">
              <div
                className={
                  "flex min-h-[180px] flex-col justify-between rounded-[var(--radius-card)] p-6 " +
                  (y.n > 9 ? "bg-violet text-violet-ink" : "bg-gold text-gold-ink")
                }
              >
                <span className="text-[13px] font-semibold">Kişisel yıl</span>
                <span className="font-display text-8xl font-semibold leading-[0.8]">{y.n}</span>
                <h3 className="font-display text-2xl font-semibold leading-tight">{y.title}</h3>
              </div>
              <Card>
                <p className="text-[13px] text-gold">{y.theme}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-text">{y.summary}</p>
                <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { k: "Aşk", v: y.love },
                    { k: "İş", v: y.work },
                    { k: "Para", v: y.money },
                  ].map((x) => (
                    <div key={x.k} className="rounded-[14px] bg-surface-2 p-4">
                      <dt className="text-[12px] font-semibold text-gold">{x.k}</dt>
                      <dd className="mt-1 text-[14px] leading-relaxed text-muted">{x.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <p className="text-[14px] text-text">
                    <span className="font-semibold text-gold">Tavsiye: </span>
                    {y.advice}
                  </p>
                  <p className="text-[14px] text-muted">
                    <span className="font-semibold text-faint">Kaçın: </span>
                    {y.avoid}
                  </p>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Kişisel yıl hakkında">
        <FAQ items={faq} />
      </Section>

      <Section title="Yılını daha derinden oku">
        <RelatedLinks
          links={[
            { href: "/#hesapla", label: "Tam numeroloji haritan", desc: "Yaşam yolu + kişisel yorum" },
            { href: "/uyumluluk", label: "Aşk uyumu", desc: "Partnerinle uyumunuz" },
            { href: "/melek-sayilari", label: "Melek sayıları", desc: "Yıl boyunca gördüğün işaretler" },
          ]}
        />
      </Section>

      <CTABand
        title={`${YEAR}'ye hazır mısın?`}
        lead="Yaşam yolu sayınla birlikte kişisel yorumunu al; yılın sana özel anlamını gör."
      />
    </>
  );
}
