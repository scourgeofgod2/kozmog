import type { Metadata } from "next";
import Link from "next/link";
import { packages, DELIVERY_PROMISE } from "@/lib/content/packages";
import { CONTACT_EMAIL, OG_DEFAULT } from "@/lib/site";
import { Breadcrumbs, Card, FAQ, JsonLd, PageHero, Section, buttonStyles, faqJsonLd } from "@/components/ds";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kişisel Numeroloji Raporları ve Fiyatlar",
  description: `Kişiye özel numeroloji raporları: Aşk Uyum Raporu, 2027 Yıl Rehberi ve Kozmik Harita. PDF olarak ${DELIVERY_PROMISE} teslim.`,
  alternates: { canonical: "https://kozmograf.com/paketler" },
  openGraph: {
    images: OG_DEFAULT,
    title: "Kişisel Numeroloji Raporları | Kozmograf",
    description: `PDF raporun ${DELIVERY_PROMISE} hazır. Aşk uyumu, 2027 yıl rehberi ve kozmik harita.`,
    url: "https://kozmograf.com/paketler",
  },
};

const faq = [
  {
    q: "Ödemeyi nasıl yapıyorum?",
    a: "Siparişini oluşturduktan sonra banka uygulamandan Kolay Adres (telefon numarası) ile ödemeyi yapıyorsun. Açıklamaya sipariş kodunu yazman yeterli. Ödeme bilgilerin ayrıca e-postana da gönderilir. Kart bilgisi istenmez.",
  },
  {
    q: "Rapor ne zaman gelir?",
    a: `Ödemen onaylandıktan sonra raporun ${DELIVERY_PROMISE} PDF olarak e-posta adresine gönderilir.`,
  },
  {
    q: "Ücretsiz yorumdan farkı ne?",
    a: "Ücretsiz yorum kısa bir genel bakıştır. Raporlar seçtiğin konuya odaklanan, çok daha uzun ve ayrıntılı, kaydedip tekrar okuyabileceğin kişisel PDF belgeleridir; 2027 Yıl Rehberi'nde 12 ayın her biri ayrı ayrı yorumlanır.",
  },
  {
    q: "Raporu kim hazırlıyor?",
    a: "Sayıların Pisagor numerolojisine göre hesaplanır, yorum metni yapay zekâ desteğiyle hazırlanır ve gönderilmeden önce kontrol edilir.",
  },
];

export default function PaketlerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(faq),
            ...packages.map((p) => ({
              "@type": "Product",
              name: `${p.name} — Kozmograf`,
              description: p.features.join(". "),
              offers: { "@type": "Offer", price: p.price, priceCurrency: "TRY", availability: "https://schema.org/InStock", url: `https://kozmograf.com/siparis?paket=${p.slug}` },
            })),
          ],
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Raporlar" }]} />
      <PageHero
        eyebrow="Kişisel raporlar"
        title="Sayıların sana"
        accent="özel rapor"
        lead={`Ücretsiz yorumun ötesine geç: seçtiğin konuya odaklanan, ayrıntılı ve kişisel bir PDF raporu ${DELIVERY_PROMISE} telefonunda.`}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => (
          <article
            key={p.slug}
            className={cn(
              "relative flex flex-col rounded-[var(--radius-card)] p-6",
              p.featured ? "bg-gold text-gold-ink" : "border border-line bg-surface"
            )}
          >
            {p.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-gold">En çok tercih edilen</span>
            )}
            <h2 className="font-display text-3xl font-semibold leading-tight">{p.name}</h2>
            <p className={cn("mt-1 text-[14px]", p.featured ? "" : "text-muted")}>{p.tagline}</p>
            <p className="mt-5 font-display text-5xl font-semibold">
              {p.price}
              <span className="ml-1 font-sans text-[16px] font-semibold">TL</span>
            </p>
            <ul className="mt-5 flex-1 space-y-2">
              {p.features.map((f) => (
                <li key={f} className={cn("flex gap-2 text-[14px] leading-snug", p.featured ? "" : "text-muted")}>
                  <span aria-hidden="true" className={p.featured ? "" : "text-gold"}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/siparis?paket=${p.slug}`}
              className={cn(
                "mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors",
                p.featured ? "bg-ink text-gold hover:bg-surface-2" : "bg-gold text-ink hover:bg-gold-strong"
              )}
            >
              Raporu al
            </Link>
            <a
              href={p.sample ? p.sample.pdf : "#ornekler"}
              {...(p.sample ? { target: "_blank", rel: "noopener" } : {})}
              className={cn(
                "mt-2 inline-flex min-h-[44px] items-center justify-center text-[14px] font-semibold underline underline-offset-4",
                p.featured ? "text-gold-ink" : "text-gold"
              )}
            >
              {p.sample ? "Örnek raporu gör" : "Örnekleri gör"}
            </a>
          </article>
        ))}
      </div>

      <Section
        id="ornekler"
        eyebrow="Raporun içinden"
        title="Örnek raporları incele"
        lead="Aşağıdaki örnekler hayali kişiler için hazırlandı (Deniz Ay, 21.07.1994 ve Emre Kaya, 03.11.1991). Senin raporun kendi sayılarınla, aynı derinlikte hazırlanır."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {packages
            .filter((p) => p.sample)
            .map((p) => (
              <article key={p.slug} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-4">
                <div className="grid grid-cols-2 gap-2">
                  {p.sample!.pages.map((src, i) => (
                    <a key={src} href={p.sample!.pdf} target="_blank" rel="noopener" className="block overflow-hidden rounded-[12px] border border-line">
                      <Image
                        src={src}
                        alt={`${p.name} örnek raporu, sayfa ${i + 1}`}
                        width={720}
                        height={1018}
                        unoptimized
                        sizes="(min-width: 1024px) 180px, 45vw"
                        className="h-auto w-full"
                      />
                    </a>
                  ))}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-[14px] text-muted">3 sayfa · PDF · {p.price} TL</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={p.sample!.pdf} target="_blank" rel="noopener" className={buttonStyles("secondary", "min-h-[44px] flex-1 px-4 text-[14px]")}>
                    Örneği aç
                  </a>
                  <Link href={`/siparis?paket=${p.slug}`} className={buttonStyles("primary", "min-h-[44px] flex-1 px-4 text-[14px]")}>
                    Kendi raporunu al
                  </Link>
                </div>
              </article>
            ))}
        </div>
      </Section>

      <Section eyebrow="Nasıl çalışır?" title="Üç adımda raporun elinde">
        <ol className="grid gap-3 md:grid-cols-3">
          {[
            { t: "Bilgilerini gir", d: "Paketini seç, adını ve doğum tarihini yaz. Sipariş kodun hemen oluşur." },
            { t: "Kolay Adres ile öde", d: "Banka uygulamandan telefon numarasına ödeme yap, açıklamaya sipariş kodunu yaz." },
            { t: `${DELIVERY_PROMISE} teslim`, d: "Kişisel PDF raporun e-postana gelir." },
          ].map((s, i) => (
            <li key={s.t}>
              <Card className="h-full">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-3 font-display text-xl font-semibold text-gold">{i + 1}</span>
                <h3 className="mt-4 text-[17px] font-semibold">{s.t}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.d}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Merak edilenler">
        <FAQ items={faq} />
      </Section>

      <Section id="iade" eyebrow="Ön bilgilendirme" title="Teslimat, iade ve iptal">
        <Card className="koz-prose max-w-3xl">
          <p>
            Raporlar, siparişte verdiğin bilgilere göre kişiye özel hazırlanan ve elektronik ortamda teslim edilen dijital
            içeriklerdir. Mesafeli Sözleşmeler Yönetmeliği uyarınca, onayınla hemen ifasına başlanan dijital içeriklerde
            cayma hakkı bulunmamaktadır.
          </p>
          <ul>
            <li>Ödemen onaylandıktan sonra raporun {DELIVERY_PROMISE} gönderilir.</li>
            <li>Rapor zamanında teslim edilemezse ya da teknik bir sorun olursa ödemenin tamamı iade edilir.</li>
            <li>Rapor hazırlanmadan önce siparişini iptal etmek istersen bize yazman yeterli; ödemen iade edilir.</li>
          </ul>
          <p>
            İçerikler eğlence ve kişisel keşif amaçlıdır; tıbbi, hukuki veya finansal tavsiye yerine geçmez. Soruların için:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </Card>
      </Section>
    </>
  );
}
