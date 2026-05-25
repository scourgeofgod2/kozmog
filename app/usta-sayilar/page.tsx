import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ChevronRight, Star } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Usta Sayılar 11, 22, 33 — Numerolojide Master Numbers Rehberi",
  description:
    "Numerolojide usta sayılar (master numbers) 11, 22 ve 33'ün anlamını öğrenin. Yaşam yolu sayınız usta sayı mı? Misyonunuzu, güçlerinizi ve zorluklarınızı keşfedin.",
  keywords:
    "usta sayılar, master numbers numeroloji, numeroloji 11 sayısı, numeroloji 22 sayısı, numeroloji 33 sayısı, yaşam yolu 11, yaşam yolu 22, yaşam yolu 33, 11 sayısının anlamı",
  alternates: { canonical: "https://kozmograf.com/usta-sayilar" },
  openGraph: {
    title: "Usta Sayılar 11, 22, 33 — Master Numbers Rehberi | Kozmograf",
    description:
      "11, 22 ve 33 usta sayılarının derin anlamı, misyonu ve zorlukları. Yaşam yolu sayınız usta sayı mı öğrenin.",
    url: "https://kozmograf.com/usta-sayilar",
  },
};

const masterNumbers = [
  {
    number: 11,
    title: "Aydınlanmış Sezgici",
    subtitle: "Ilham & Sezgi",
    accent: "#C4B5FD",
    accentDark: "#7C3AED",
    baseNumber: 2,
    mission:
      "İnsanlığa ilham vermek ve ruhsal bilinçlenme sürecine rehberlik etmek. Sayı 11, kozmik bir anten gibi yüksek frekanslı bilgileri alır ve dünyaya iletir.",
    strengths: [
      "Olağanüstü sezgi ve 6. his",
      "Güçlü empati ve duyarlılık",
      "İlham verici liderlik kapasitesi",
      "Sanatsal ve yaratıcı derinlik",
      "Ruhsal farkındalık ve içgörü",
    ],
    challenges: [
      "Aşırı hassasiyet ve duygusal dalgalanmalar",
      "Kendi enerjisini yönetme güçlüğü",
      "Mükemmeliyetçilik ve öz-eleştiri",
      "Yüksek beklentiler altında ezilme",
      "Fiziksel dünyaya bağlı kalmakta zorlanma",
    ],
    careers: ["Psikolog / Terapist", "Sanatçı / Müzisyen", "Ruhsal rehber", "Yazar / Şair", "Öğretmen / Eğitimci"],
    famousPeople: "Çoğu vizioner lider, sanatçı ve ruhsal öğretmenin 11 enerji taşıdığı gözlemlenmiştir.",
    calculation:
      "Doğum tarihinizin rakam toplamı 11 veya 29 (2+9=11) çıktığında usta sayıya ulaşılır. Bu noktada 2'ye indirgeme yapılmaz.",
    lifeTheme: "Bilgeliği ışığa dönüştürmek",
    shadowSide:
      "Gücünü kullanmaktan kaçınmak, sezgilerini görmezden gelmek. 11 enerjisi kullanılmadığında içe kapanıklık ve kaygı bozukluğu olarak tezahür edebilir.",
  },
  {
    number: 22,
    title: "Usta İnşaatçı",
    subtitle: "Vizyon & Manifestasyon",
    accent: "#FCD34D",
    accentDark: "#D97706",
    baseNumber: 4,
    mission:
      "Büyük hayalleri somut gerçekliklere dönüştürmek. Sayı 22, tüm usta sayıların en güçlüsü olarak kabul edilir — ideal dünyayı fiziksel dünyada inşa etme kapasitesi taşır.",
    strengths: [
      "İdeallerini hayata geçirme gücü",
      "Pratik zeka ile vizyonun birleşimi",
      "Büyük ölçekli organizasyon yeteneği",
      "Kalıcı eserler bırakma kapasitesi",
      "Kararlılık ve disiplin",
    ],
    challenges: [
      "Sorumluluğun ağırlığı altında bunalmak",
      "Mükemmeliyetçilik nedeniyle başlayamamak",
      "Başkalarını kontrol etme eğilimi",
      "Kişisel ihtiyaçları ihmal etmek",
      "Vizyon ile pratik arasında denge kurmak",
    ],
    careers: ["Mimar / Şehir plancısı", "Girişimci / İş insanı", "Politikacı / Devlet adamı", "Mühendis", "STK / Vakıf kurucusu"],
    famousPeople: "Tarihte büyük kurumlar, binalar ve hareketler yaratan kişilerin 22 enerjisi taşıdığı öne sürülür.",
    calculation:
      "Doğum tarihi toplamı 22 veya 40 (4+0=4, ama 22 olarak kalır) çıktığında usta sayıya ulaşılır. 4'e indirgeme yapılmaz.",
    lifeTheme: "Hayalleri kalıcı gerçekliklere dönüştürmek",
    shadowSide:
      "Büyük potansiyelden kaçınmak, sıradan bir yaşamla yetinmek. 22 enerjisi baskılandığında katılık, takıntı ve hayal kırıklığı olarak kendini gösterir.",
  },
  {
    number: 33,
    title: "Usta Öğretmen",
    subtitle: "Sevgi & Hizmet",
    accent: "#6EE7B7",
    accentDark: "#059669",
    baseNumber: 6,
    mission:
      "Koşulsuz sevgiyi somutlaştırmak ve insanlığın ruhsal evrimine katkıda bulunmak. Sayı 33, en nadir usta sayı olup tam anlamıyla yaşanması en zorlu olanıdır.",
    strengths: [
      "Derin ve koşulsuz sevgi kapasitesi",
      "İlham verici öğretmenlik",
      "Evrensel şefkat ve anlayış",
      "Kendini adama gücü",
      "İyileştirici enerji",
    ],
    challenges: [
      "Öz-fedakarlığın sınırlarını çizmek",
      "Başkalarının acısını kendi acısı gibi hissetmek",
      "Kişisel ilişkilerde aşırı vermek",
      "Dünya ile ruhsal alan arasında dengeyi korumak",
      "Gerçek 33 enerjisine ulaşmak için önemli bir olgunluk gerekmesi",
    ],
    careers: ["Ruhsal lider / Öğretmen", "Hekim / Terapist", "Sosyal girişimci", "Sanatçı", "Koç / Danışman"],
    famousPeople:
      "Gerçek anlamda 33 enerjisi taşıyan kişiler son derece nadirdir. Bu sayı daha çok yaşam yolu sayısı değil, kişisel yıl ya da diğer hesaplamalarda ortaya çıkar.",
    calculation:
      "Doğum tarihi toplamı 33 olduğunda usta sayıya ulaşılır. Gerçekte bu oldukça nadir bir durumdur; birçok numeroloji sistemi 33'ü yalnızca gün, ay ve yıl ayrı ayrı toplandığında 11+11+11=33 gibi özel hesaplama yöntemleriyle kabul eder.",
    lifeTheme: "Sevgiyi eyleme dönüştürmek",
    shadowSide:
      "Ruhsal ego ve kurtarıcı kompleksi. 33 enerjisi dengelenmediğinde aşırı müdahalecilik, şehitlik duygusu ve hayal kırıklığı ortaya çıkabilir.",
  },
];

const faqItems = [
  {
    q: "Usta sayı (master number) nedir?",
    a: "Usta sayılar, numerolojide 11, 22 ve 33 rakamlarıdır. Bu sayılar tek basamağa indirgenmez çünkü diğer sayıların iki katı enerji ve potansiyel taşırlar. Yüksek ruhsal misyon ve büyük sorumluluk anlamına gelirler.",
  },
  {
    q: "Numerolojide 11 sayısı ne anlama gelir?",
    a: "11 sayısı 'Aydınlanmış Sezgici' olarak bilinir. Olağanüstü sezgi, empati ve ilham verme yeteneğini temsil eder. 11 yaşam yolu sayısına sahip kişiler genellikle sanatçı, terapist veya ruhsal rehber olarak başkalarına ilham verir. Temel sayı olan 2'nin tüm özelliklerini daha yoğun biçimde taşır.",
  },
  {
    q: "Numerolojide 22 sayısı ne anlama gelir?",
    a: "22 'Usta İnşaatçı' olarak tanımlanır ve tüm usta sayıların en güçlüsü kabul edilir. Büyük hayalleri somut gerçekliklere dönüştürme kapasitesini temsil eder. 22 yaşam yolu sayısına sahip kişiler, kalıcı eserler ve kurumlar yaratma potansiyeli taşır.",
  },
  {
    q: "Numerolojide 33 sayısı ne anlama gelir?",
    a: "33 'Usta Öğretmen' olarak bilinir ve en nadir usta sayıdır. Koşulsuz sevgi, fedakarlık ve insanlığa hizmet misyonunu temsil eder. Gerçek anlamda 33 yaşam yolu sayısına sahip olmak oldukça nadirdir ve bazı numeroloji sistemlerinde kabul kriterleri farklılık gösterir.",
  },
  {
    q: "Usta sayıya sahip olmak avantajlı mı?",
    a: "Usta sayılar hem yüksek potansiyel hem de yüksek zorluk anlamına gelir. Sıradan sayılara göre daha büyük bir misyon yükü taşırlar. Bu enerjiyi kullanamamak çoğu zaman kaygı, hayal kırıklığı ve gerginlikle sonuçlanır. Doğru yönlendirildiğinde ise olağanüstü başarı ve etki alanı yaratılabilir.",
  },
  {
    q: "Yaşam yolu sayım 11, 22 veya 33 mü bilemiyorum nasıl anlayabilirim?",
    a: "Doğum tarihinizin tüm rakamlarını topladığınızda 11, 22 veya 33 çıkıyorsa usta sayı taşıyorsunuz demektir. Örneğin: 29.11.1991 → 2+9+1+1+1+9+9+1=33. Bu hesaplamayı kozmograf.com üzerindeki ücretsiz hesaplayıcı ile yapabilirsiniz.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Usta Sayılar 11, 22, 33 — Numerolojide Master Numbers Rehberi",
      description:
        "Numerolojide usta sayılar (master numbers) 11, 22 ve 33'ün anlamı, misyonu, güçlü yanları ve zorlukları.",
      url: "https://kozmograf.com/usta-sayilar",
      author: { "@type": "Organization", name: "Kozmograf Numeroloji" },
      publisher: {
        "@type": "Organization",
        name: "Kozmograf Numeroloji",
        url: "https://kozmograf.com",
      },
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "tr",
      about: {
        "@type": "Thing",
        name: "Usta Sayılar",
        description: "Numerolojide 11, 22 ve 33 usta sayılarının anlamı ve önemi",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function UstaSayilar() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section
        className="relative overflow-hidden pb-20 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center fade-up relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
              <div
                className="px-4 py-1.5 inline-flex items-center gap-2"
                style={{
                  border: "1px solid rgba(245,200,66,0.25)",
                  background: "rgba(245,200,66,0.05)",
                }}
              >
                <span style={{ color: "#F5C842", fontSize: "9px" }}>✦</span>
                <span
                  style={{
                    color: "#F5C842",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Master Numbers
                </span>
              </div>
            </div>

            <h1
              className="font-display fade-up-d2"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#EAE6FF",
                marginBottom: "0.3em",
                textShadow: "0 0 80px rgba(124,58,237,0.3)",
              }}
            >
              Usta Sayılar
            </h1>
            <LastUpdated />
            <p
              className="font-display fade-up-d3"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#F5C842",
                marginBottom: "1.5rem",
                textShadow: "0 0 60px rgba(245,200,66,0.2)",
              }}
            >
              11 · 22 · 33
            </p>

            <p
              className="fade-up-d4 mx-auto"
              style={{
                color: "var(--koz-text-muted)",
                maxWidth: "580px",
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Numerolojide bazı sayılar tek basamağa indirgenmez — çünkü taşıdıkları enerji çok büyüktür. 11, 22 ve 33; yüksek misyon, derin sorumluluk ve olağanüstü potansiyeli temsil eden usta sayılardır.
            </p>

            <div className="fade-up-d5 flex flex-wrap justify-center gap-3">
              {masterNumbers.map((mn) => (
                <div
                  key={mn.number}
                  className="inline-flex items-center gap-2 px-5 py-2.5"
                  style={{
                    border: `1px solid ${mn.accent}40`,
                    background: mn.accent + "08",
                  }}
                >
                  <Star className="w-3 h-3" style={{ color: mn.accent }} />
                  <span
                    style={{
                      color: mn.accent,
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {mn.number} — {mn.subtitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USTA SAYI PROFİLLERİ */}
      <section
        style={{
          background: "var(--koz-void)",
          borderTop: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl py-20">
          <div className="mb-12">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Profil Rehberi
            </span>
            <h2
              className="font-display mt-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.15,
              }}
            >
              Her Usta Sayının Anlamı
            </h2>
            <div className="koz-rule mt-4" style={{ maxWidth: "160px" }} />
          </div>

          <div className="space-y-16">
            {masterNumbers.map((mn) => (
              <article key={mn.number} id={`sayi-${mn.number}`}>
                <div
                  className="p-1 mb-8"
                  style={{
                    background: `linear-gradient(90deg, ${mn.accent}30 0%, transparent 100%)`,
                    borderLeft: `3px solid ${mn.accent}`,
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="font-display flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "56px",
                          height: "56px",
                          background: mn.accent + "15",
                          border: `2px solid ${mn.accent}50`,
                          color: mn.accent,
                          fontSize: "1.5rem",
                          fontWeight: 700,
                        }}
                      >
                        {mn.number}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: mn.accent,
                            opacity: 0.8,
                          }}
                        >
                          Usta Sayı {mn.number} · Temel: {mn.baseNumber}
                        </p>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "1.6rem",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#EAE6FF",
                            lineHeight: 1.1,
                          }}
                        >
                          {mn.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--koz-text-muted)",
                        lineHeight: 1.8,
                      }}
                    >
                      {mn.mission}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    className="p-5"
                    style={{
                      background: "var(--koz-card)",
                      border: "1px solid var(--koz-border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: mn.accent,
                        marginBottom: "1rem",
                      }}
                    >
                      ✦ Güçlü Yanlar
                    </p>
                    <ul className="space-y-2">
                      {mn.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2"
                          style={{ fontSize: "13px", color: "var(--koz-text-muted)", lineHeight: 1.6 }}
                        >
                          <span style={{ color: mn.accent, marginTop: "2px", flexShrink: 0 }}>·</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="p-5"
                    style={{
                      background: "var(--koz-card)",
                      border: "1px solid var(--koz-border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--koz-text-faint)",
                        marginBottom: "1rem",
                      }}
                    >
                      ✦ Zorluklar
                    </p>
                    <ul className="space-y-2">
                      {mn.challenges.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2"
                          style={{ fontSize: "13px", color: "var(--koz-text-muted)", lineHeight: 1.6 }}
                        >
                          <span style={{ color: "var(--koz-text-faint)", marginTop: "2px", flexShrink: 0 }}>·</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div
                    className="p-4"
                    style={{
                      background: mn.accent + "08",
                      border: `1px solid ${mn.accent}20`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: mn.accent,
                        marginBottom: "0.75rem",
                      }}
                    >
                      İdeal Kariyer Alanları
                    </p>
                    <ul className="space-y-1">
                      {mn.careers.map((c, i) => (
                        <li key={i} style={{ fontSize: "12px", color: "var(--koz-text-muted)" }}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="p-4"
                    style={{
                      background: "var(--koz-card)",
                      border: "1px solid var(--koz-border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--koz-text-faint)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Hesaplama
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                      {mn.calculation}
                    </p>
                  </div>

                  <div
                    className="p-4"
                    style={{
                      background: "var(--koz-card)",
                      border: "1px solid var(--koz-border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--koz-text-faint)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Gölge Yön
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                      {mn.shadowSide}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section
        style={{
          background: "var(--koz-deep)",
          borderTop: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <div className="max-w-2xl mx-auto">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Sık Sorulan Sorular
            </span>
            <h2
              className="font-display mt-3 mb-8"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
              }}
            >
              Usta Sayılar Hakkında
            </h2>

            <div className="space-y-0">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="py-6"
                  style={{ borderTop: "1px solid var(--koz-border)" }}
                >
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#EAE6FF",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {item.q}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--koz-text-muted)",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--koz-surface)",
          borderTop: "1px solid var(--koz-border)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(124,58,237,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-7xl py-20 text-center relative z-10">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
            }}
          >
            ✦ Usta Sayın Var Mı?
          </span>
          <h2
            className="font-display mt-4 mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EAE6FF",
              lineHeight: 1.15,
            }}
          >
            Yaşam Yolu Sayını Hesapla
          </h2>
          <p
            className="mx-auto mb-8"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "420px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            Doğum tarihinle 11, 22 ya da 33 usta sayısına sahip olup olmadığını öğren.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="koz-btn-primary">
              <Sparkles className="w-4 h-4" />
              Ücretsiz Hesapla
            </Link>
            <Link
              href="/yasam-yolu"
              className="inline-flex items-center gap-2"
              style={{
                padding: "10px 20px",
                border: "1px solid var(--koz-border-bright)",
                color: "var(--koz-text-muted)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              Yaşam Yolu Rehberi
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}