import type { Metadata } from "next";
import Link from "next/link";
import NumerologyForm from "@/components/forms/NumerologyForm";
import {
  Card,
  CTABand,
  Eyebrow,
  FAQ,
  JsonLd,
  NumberTile,
  Pill,
  Section,
  Constellation,
  buttonStyles,
  Illustration,
  faqJsonLd,
} from "@/components/ds";
import Image from "next/image";
import { images, type ImageKey } from "@/lib/content/images.generated";
import { ALL_NUMBERS, getProfile, numberHref } from "@/lib/content/profiles";
import { tr } from "@/content/tr";
import { packages } from "@/lib/content/packages";
import { INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: tr.seoTitle },
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  alternates: { canonical: "https://kozmograf.com" },
};

const faqItems = [
  {
    q: "Numeroloji nedir?",
    a: "Numeroloji, sayıların sembolik anlamlarını inceleyen kadim bir sistemdir. Doğum tarihin ve ismin sayılara dönüştürülür; ortaya çıkan sayılar kişiliğin, yaşam amacın ve potansiyelin hakkında düşünmen için bir çerçeve sunar.",
  },
  {
    q: "Yaşam yolu sayısı nasıl hesaplanır?",
    a: "Doğum tarihinin gün, ay ve yıl rakamları toplanır ve tek basamağa indirgenir. Örneğin 15.03.1990 için: 1+5+0+3+1+9+9+0 = 28, 2+8 = 10, 1+0 = 1. Yaşam yolu sayın 1'dir. 11, 22 ve 33 usta sayı olduğundan bunlara ulaşıldığında indirgeme yapılmaz.",
  },
  {
    q: "Numeroloji analizi ücretsiz mi?",
    a: "Evet. Yaşam yolu, kader, ruh ve kişilik sayıların ile kişisel yorumun ücretsizdir; üyelik gerekmez.",
  },
  {
    q: "Kader sayısı ile yaşam yolu sayısı aynı mı?",
    a: "Hayır. Yaşam yolu sayısı doğum tarihinden hesaplanır ve hayatta izlediğin ana yolu gösterir. Kader sayısı ise tam adının harflerinden elde edilir ve dünyaya sunduğun potansiyeli yansıtır.",
  },
  {
    q: "Usta sayılar (11, 22, 33) nedir?",
    a: "Usta sayılar, hesaplama sırasında tek basamağa indirgenmeyen özel sayılardır. Daha yüksek bir potansiyele ve buna eşlik eden daha büyük sorumluluklara işaret ettikleri kabul edilir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kozmograf Numeroloji",
      url: "https://kozmograf.com",
      logo: "https://kozmograf.com/brand/instagram-profil-koyu.png",
      sameAs: [INSTAGRAM_URL],
      description: tr.siteDescription,
    },
    { "@type": "WebSite", name: "Kozmograf Numeroloji", url: "https://kozmograf.com", inLanguage: "tr" },
    {
      "@type": "WebApplication",
      name: "Ücretsiz Numeroloji Hesaplayıcı",
      url: "https://kozmograf.com",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    },
    faqJsonLd(faqItems),
  ],
};

const tools: { href: string; title: string; desc: string; img: ImageKey; featured?: boolean }[] = [
  { href: "/kisisel-yil", title: "2027 Kişisel Yılın", desc: "Yeni yıl sana hangi temayı getiriyor?", img: "sayfa-kisisel-yil-2027", featured: true },
  { href: "/uyumluluk", title: "Aşk Uyumu", desc: "İki doğum tarihi, tek uyum skoru.", img: "sayfa-ask-uyumu-numeroloji" },
  { href: "/melek-sayilari", title: "Melek Sayıları", desc: "111, 222, 444… sürekli görüyorsan.", img: "sayfa-melek-sayilari" },
  { href: "/saat-anlami", title: "Ayna Saatler", desc: "11:11 ve 22:22 ne anlatıyor?", img: "sayfa-ayna-saatler-11-11" },
  { href: "/isim-numeroloji", title: "İsim Numerolojisi", desc: "Kader sayın isminde saklı.", img: "sayfa-isim-numerolojisi-harf-tablosu" },
  { href: "/karmik-borc", title: "Karmik Borç", desc: "13, 14, 16, 19 sende var mı?", img: "sayfa-karmik-borc-sayilari" },
];

const guides = [
  { title: tr.whatIsNumerology, html: tr.whatIsNumerologyContent },
  { title: tr.lifePathNumberGuide, html: tr.lifePathNumberGuideContent },
  { title: tr.masterNumbersSection, html: tr.masterNumbersContent },
  { title: tr.numerologyCompatibilityGuide, html: tr.numerologyCompatibilityContent },
  { title: tr.howToCalculate, html: tr.howToCalculateContent },
  { title: tr.numerologyBenefits, html: tr.numerologyBenefitsContent },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ── Giriş + form ─────────────────────────────────────────── */}
      <section className="relative grid items-start gap-8 pb-12 pt-8 sm:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="relative">
          <Constellation className="pointer-events-none absolute -top-4 right-0 w-[300px] opacity-50 sm:w-[380px]" />
          <Eyebrow className="relative mt-24 sm:mt-28">Ücretsiz numeroloji okuması</Eyebrow>
          <h1 className="relative mt-4 font-display text-[2.9rem] font-medium leading-[1] tracking-[-0.01em] sm:text-7xl">
            Doğum tarihin sana <em className="text-gold">ne söylüyor?</em>
          </h1>
          <p className="relative mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Yaşam yolu sayını 10 saniyede öğren. Kader, ruh ve kişilik sayıların hesaplanır, kişisel yorumun hemen
            hazırlanır.
          </p>
          <div className="relative mt-6 hidden flex-wrap gap-2 sm:flex">
            <Pill>✦ Pisagor sistemi</Pill>
            <Pill>Türkçe harf desteği</Pill>
            <Pill>Usta sayılar 11·22·33</Pill>
          </div>
        </div>

        <Card id="hesapla" className="scroll-mt-24 lg:mt-10">
          <h2 className="mb-5 font-display text-2xl font-semibold">Sayılarını hesapla</h2>
          <NumerologyForm />
        </Card>
      </section>

      {/* ── Sonuç önizlemesi (bento) ─────────────────────────────── */}
      <Section eyebrow="Sonucun böyle görünecek" title="Bir tarih, altı sayı, tek bir hikâye">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-[var(--radius-card)] bg-gold p-6 text-gold-ink">
            <div>
              <p className="text-[13px] font-semibold">Yaşam Yolu</p>
              <p className="mt-1 font-display text-4xl font-semibold">Mistik</p>
              <p className="mt-2 max-w-[240px] text-[15px] leading-snug">
                Bilgelik, içe dönüş ve derin sezgi. Cevapları kalabalıkta değil, sessizlikte bulursun.
              </p>
            </div>
            <p className="mt-6 self-end font-display text-[9rem] font-semibold leading-[0.75]">7</p>
          </div>
          <NumberTile label="Kader" value="3" sub="Sanatçı" />
          <NumberTile label="Ruh" value="11" sub="Usta sayı ✦" tone="violet" />
          <NumberTile label="Kişilik" value="8" sub="Yönetici" />
          <NumberTile label="2027 Kişisel Yıl" value="5" sub="Değişim yılı" tone="raised" />
        </div>
      </Section>

      {/* ── Araçlar ───────────────────────────────────────────────── */}
      <Section eyebrow="Keşfet" title="Sayıların başka neler anlatıyor?">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={
                "group overflow-hidden rounded-[var(--radius-card)] border bg-surface transition-colors hover:border-gold/70 " +
                (t.featured ? "border-gold/60" : "border-line")
              }
            >
              <Image
                src={images[t.img].src}
                alt={images[t.img].alt}
                width={images[t.img].width}
                height={images[t.img].height}
                unoptimized
                sizes="(min-width: 1024px) 370px, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="block p-3 sm:p-5">
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold leading-snug text-text sm:text-[17px]">{t.title}</span>
                  <span aria-hidden="true" className="text-gold transition-transform group-hover:translate-x-1">→</span>
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-muted sm:text-[14px]">{t.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Sayılar şeridi ───────────────────────────────────────── */}
      <Section
        eyebrow="Sayıların anlamı"
        title="Her sayının bir karakteri var"
        lead="Sayına dokun, güçlü yanlarını, zorluklarını ve yaşam dersini oku."
      >
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {ALL_NUMBERS.map((n) => {
            const p = getProfile(n);
            return (
              <Link
                key={n}
                href={numberHref(n)}
                className="overflow-hidden rounded-[var(--radius-tile)] border border-line bg-surface transition-colors hover:border-gold/70"
              >
                <Image
                  src={images[`sayi-${n}` as ImageKey].src}
                  alt={images[`sayi-${n}` as ImageKey].alt}
                  width={800}
                  height={800}
                  unoptimized
                  sizes="(min-width: 640px) 180px, 33vw"
                  className="h-auto w-full"
                />
                <span className="block px-3 pb-3 text-[13px] text-muted">
                  {n} · {p?.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── Rehber yazıları ──────────────────────────────────────── */}
      <Section eyebrow="Rehber" title={tr.seoArticleTitle}>
        <Illustration
          k="sayfa-ana-sayfa-numeroloji-haritasi"
          className="mb-4"
          sizes="(min-width: 1152px) 1104px, 100vw"
          caption="Pisagor numerolojisinde 1'den 9'a sayılar ve aralarındaki enneagram ilişkisi."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {guides.map((g) => (
            <Card key={g.title} as="article">
              <h3 className="font-display text-2xl font-semibold text-text">{g.title}</h3>
              {/* İçerik sabit, kod içindeki tr.ts metinlerinden geliyor */}
              <div className="koz-prose mt-2 [&>h3:first-child]:hidden" dangerouslySetInnerHTML={{ __html: g.html }} />
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/sayilarin-anlami" className={buttonStyles("secondary")}>
            Tüm sayıların anlamı →
          </Link>
        </div>
      </Section>

      <Section eyebrow="Kişisel raporlar" title="Daha derine inmek ister misin?" lead="Seçtiğin konuya odaklanan ayrıntılı PDF raporun, ödeme onayından sonra 1 saat içinde telefonunda.">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {packages.map((p) => (
            <Link
              key={p.slug}
              href={`/siparis?paket=${p.slug}`}
              className={
                "flex min-h-[150px] flex-col justify-between rounded-[var(--radius-card)] p-4 transition-colors sm:p-5 " +
                (p.featured ? "bg-gold text-gold-ink" : "border border-line bg-surface hover:border-gold/70")
              }
            >
              <span className="text-[15px] font-semibold leading-snug sm:text-[17px]">{p.name}</span>
              <span className={"text-[13px] " + (p.featured ? "" : "text-muted")}>{p.tagline}</span>
              <span className="font-display text-3xl font-semibold">{p.price} TL</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sık sorulanlar" title="Merak edilenler">
        <FAQ items={faqItems} />
      </Section>

      <CTABand href="#hesapla" />
    </>
  );
}
