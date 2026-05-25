import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ChevronRight, Type } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "İsim Numerolojisi — İsmin Sayısal Anlamı ve Kader Sayısı",
  description:
    "İsim numerolojisi ile adınızın taşıdığı enerjiyi ve kader sayınızı keşfedin. Pythagoras sistemiyle her harfin sayısal değerini öğrenin. Türkçe isimler için tam rehber.",
  keywords:
    "isim numeroloji, isim sayısı hesaplama, kader sayısı, Pythagoras numeroloji, harflerin sayısal değeri, isim analizi numeroloji",
  alternates: { canonical: "https://kozmograf.com/isim-numeroloji" },
  openGraph: {
    title: "İsim Numerolojisi — Adının Gizli Enerjisini Keşfet | Kozmograf",
    description:
      "İsmin sayısal değeri kişiliğin ve kaderinin şifrelerini taşır. Pythagoras sistemiyle isim analizi yap.",
    url: "https://kozmograf.com/isim-numeroloji",
  },
};

const letterValues: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  Ç: 3, Ğ: 7, İ: 9, Ö: 6, Ş: 1, Ü: 3,
};

const destinyProfiles = [
  {
    number: 1,
    title: "Öncü Ruh",
    accent: "#F5C842",
    traits: "Liderlik, bağımsızlık, yenilikçilik, kararlılık",
    strengths: "Doğuştan lider enerjisi taşırsınız. İsminizin frekansı sizi yeni başlangıçlara ve cesur adımlara iter.",
    challenges: "Bencillik ve inatçılıktan kaçınmak sizin için önemli bir derstir.",
    famousNames: ["Ali", "Atatürk", "Napoleon"],
    lifeTheme: "Öz-güven ve liderlik yoluyla dünyayı dönüştürmek",
  },
  {
    number: 2,
    title: "Barış Yapıcı",
    accent: "#7C3AED",
    traits: "Empati, işbirliği, hassasiyet, sezgi",
    strengths: "Çevrenizdekileri bir arada tutma yeteneğiniz olağanüstüdür. İsminizin enerjisi diplomatik bir ruh taşır.",
    challenges: "Başkalarının ihtiyaçları için kendinizi feda etmemek gerekiyor.",
    famousNames: ["Leyla", "Diana", "Gandhi"],
    lifeTheme: "Uyum ve denge yoluyla başkalarına hizmet etmek",
  },
  {
    number: 3,
    title: "Yaratıcı İfadeci",
    accent: "#DB2777",
    traits: "Yaratıcılık, neşe, iletişim, ilham",
    strengths: "İsminizin frekansı sanatsal ve sosyal alanlarda parlamanızı destekler. İfade etme yeteneğiniz güçlüdür.",
    challenges: "Dağılmadan odaklanmak ve projeleri tamamlamak geliştirmeniz gereken alan.",
    famousNames: ["Zeynep", "Shakira", "Oscar Wilde"],
    lifeTheme: "Yaratıcı ifade yoluyla başkalarını ilham vermek",
  },
  {
    number: 4,
    title: "Temel Kurucu",
    accent: "#059669",
    traits: "Güvenilirlik, disiplin, pratiklik, sabır",
    strengths: "İsminizin enerjisi güçlü yapılar kurmanızı sağlar. Sabırlı ve sistematik yaklaşımınız kalıcı sonuçlar doğurur.",
    challenges: "Değişime direnç ve katılık üzerinde çalışmak önemlidir.",
    famousNames: ["Mehmet", "Einstein", "Warren Buffett"],
    lifeTheme: "Disiplin ve emek yoluyla kalıcı değerler yaratmak",
  },
  {
    number: 5,
    title: "Özgür Ruh",
    accent: "#0EA5E9",
    traits: "Özgürlük, macera, uyum sağlama, merak",
    strengths: "İsminizin frekansı sizi değişime ve maceraya açık tutar. Çok yönlülüğünüz farklı alanlarda başarı getirir.",
    challenges: "Sabırsızlık ve kararsızlık ile başa çıkmak gerekiyor.",
    famousNames: ["Selin", "Casanova", "Abraham Lincoln"],
    lifeTheme: "Özgürlük ve deneyim yoluyla büyümek",
  },
  {
    number: 6,
    title: "Şefkat Bekçisi",
    accent: "#EC4899",
    traits: "Sorumluluk, şefkat, güzellik, uyum",
    strengths: "İsminizin enerjisi aile ve topluma adanmışlık taşır. Başkalarını besleyen ve koruyan doğal bir eğiliminiz var.",
    challenges: "Mükemmeliyetçilik ve aşırı sorumluluk duygusuyla denge kurun.",
    famousNames: ["Fatma", "Mother Teresa", "Venus Williams"],
    lifeTheme: "Sevgi ve şefkatle başkalarına hizmet etmek",
  },
  {
    number: 7,
    title: "Bilge Arayışçı",
    accent: "#8B5CF6",
    traits: "Analiz, sezgi, içe dönüklük, gizemlilik",
    strengths: "İsminizin frekansı derin düşünce ve araştırmaya yatkınlık getirir. Gizemleri çözme yeteneğiniz güçlüdür.",
    challenges: "Sosyal izolasyon ve aşırı analitik düşünceyi dengelemek önemli.",
    famousNames: ["İrem", "Nikola Tesla", "Aristotle"],
    lifeTheme: "Bilgi ve sezgi yoluyla gerçeği aramak",
  },
  {
    number: 8,
    title: "Güç Manifestörü",
    accent: "#F97316",
    traits: "Hırs, liderlik, maddi başarı, otorite",
    strengths: "İsminizin enerjisi güçlü maddi manifestasyon kapasitesi taşır. Büyük hedefleri gerçekleştirme gücünüz var.",
    challenges: "Para ve güç ile sağlıklı ilişki kurmak, egoya dikkat etmek gerekiyor.",
    famousNames: ["Yağmur", "Napoleon Hill", "Pablo Picasso"],
    lifeTheme: "Güç ve otorite yoluyla dünyayı şekillendirmek",
  },
  {
    number: 9,
    title: "İnsanlık Hizmetçisi",
    accent: "#10B981",
    traits: "Evrensel sevgi, bağışlama, idealizm, bilgelik",
    strengths: "İsminizin frekansı evrensel şefkati taşır. İnsanlığa hizmet etme içgüdünüz güçlüdür.",
    challenges: "Hayal kırıklığına dayanmak ve idealizmi pratiklikle dengelemek.",
    famousNames: ["Elif", "Gandhi", "Mother Teresa"],
    lifeTheme: "Sevgi ve hizmet yoluyla insanlığı iyileştirmek",
  },
];

const letterRows = [
  { letters: ["A=1", "B=2", "C=3", "D=4", "E=5", "F=6", "G=7", "H=8", "I=9"] },
  { letters: ["J=1", "K=2", "L=3", "M=4", "N=5", "O=6", "P=7", "Q=8", "R=9"] },
  { letters: ["S=1", "T=2", "U=3", "V=4", "W=5", "X=6", "Y=7", "Z=8"] },
  { letters: ["Ç=3", "Ğ=7", "İ=9", "Ö=6", "Ş=1", "Ü=3"] },
];

const faqItems = [
  {
    q: "İsim numerolojisi nasıl hesaplanır?",
    a: "Pythagoras sisteminde her harf 1-9 arasında bir sayıya karşılık gelir. İsminizin tüm harflerinin sayısal değerleri toplanır, ardından tek basamaklı bir sayı elde edilene kadar (11, 22, 33 usta sayılar hariç) basamaklar tekrar toplanır. Bu son sayı kader sayınızdır.",
  },
  {
    q: "Kader sayısı ile yaşam yolu sayısı aynı mı?",
    a: "Hayır, farklı sayılardır. Yaşam yolu sayısı doğum tarihinizden hesaplanır ve yaşam misyonunuzu gösterir. Kader sayısı (isim sayısı) adınızdan hesaplanır ve potansiyelinizi ve kişiliğinizi yansıtır.",
  },
  {
    q: "Evlilik sonrası soyad değişirse numeroloji etkilenir mi?",
    a: "Evet, soyad değişikliği kader sayısını değiştirebilir. Birçok numeroloji uzmanı doğum adını esas almanızı önerse de nikah adı ile doğum adınız arasındaki enerji farkını karşılaştırmak da değerli bir analiz sunar.",
  },
  {
    q: "Türkçe harfler (Ç, Ğ, İ, Ö, Ş, Ü) nasıl hesaplanır?",
    a: "Türkçeye özgü harflerin kökeni Latince harflerle ilişkilendirilerek değer atanır: Ç=3 (C gibi), Ğ=7 (G gibi), İ=9 (I gibi), Ö=6 (O gibi), Ş=1 (S gibi), Ü=3 (U gibi). Bu değerler Pythagoras tablosunun Türkçe uyarlamasıdır.",
  },
  {
    q: "İsim değiştirmek numerolojik açıdan işe yarar mı?",
    a: "Pek çok kültürde ve bazı numeroloji geleneklerinde isim değişikliği enerji değişikliği getirdiğine inanılır. Ancak bu kişisel bir karardır. Numeroloji açısından hem doğum adı hem de kullanılan isim analiz edilerek karşılaştırma yapılabilir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "İsim Numerolojisi — İsmin Sayısal Anlamı ve Kader Sayısı",
      description:
        "Pythagoras sistemiyle isim numerolojisi hesaplama rehberi. Her harfin sayısal değeri ve kader sayınızın anlamı.",
      url: "https://kozmograf.com/isim-numeroloji",
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
        name: "İsim Numerolojisi",
        description: "İsimlerin harflerinden sayısal anlam çıkarma sanatı",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function IsimNumeroloji() {
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
          background:
            "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 60%)",
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
                  Pythagoras Sistemi
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
              İsmin Taşıdığı
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
              Gizli Enerji
            </p>

            <p
              className="fade-up-d4 mx-auto"
              style={{
                color: "var(--koz-text-muted)",
                maxWidth: "560px",
                fontSize: "1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              İsmin sadece bir etiket değil — frekans taşıyan bir enerji alanı. Pythagoras numerolojisi her harfe bir sayı değeri atar ve bu değerlerin toplamı, ruhunun yansımasını ortaya çıkarır.
            </p>

            <div className="fade-up-d5 flex flex-wrap justify-center gap-4">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5"
                style={{
                  border: "1px solid var(--koz-border-bright)",
                  background: "rgba(16,16,34,0.5)",
                }}
              >
                <Type className="w-3.5 h-3.5" style={{ color: "#F5C842" }} />
                <span
                  style={{
                    color: "var(--koz-text-muted)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Her Harf Bir Sayı
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5"
                style={{
                  border: "1px solid var(--koz-border-bright)",
                  background: "rgba(16,16,34,0.5)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#7C3AED" }} />
                <span
                  style={{
                    color: "var(--koz-text-muted)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Türkçe Destekli
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PYTHAGORAS TABLOSU */}
      <section
        style={{
          background: "var(--koz-deep)",
          borderTop: "1px solid var(--koz-border)",
          borderBottom: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <div className="max-w-3xl mx-auto">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Harf-Sayı Tablosu
            </span>
            <h2
              className="font-display mt-3 mb-2"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.2,
              }}
            >
              Pythagoras Sistemi
            </h2>
            <p
              style={{
                color: "var(--koz-text-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Her harf 1'den 9'a kadar bir sayıya karşılık gelir. İsminizi oluşturan harflerin değerlerini toplayın, tek basamağa indirin — bu sizin kader sayınız.
            </p>

            <div
              style={{
                background: "var(--koz-card)",
                border: "1px solid var(--koz-border)",
                padding: "1.5rem",
              }}
            >
              {letterRows.map((row, ri) => (
                <div
                  key={ri}
                  className="flex flex-wrap gap-2 mb-3"
                >
                  {row.letters.map((lv) => {
                    const [letter, val] = lv.split("=");
                    return (
                      <div
                        key={lv}
                        className="flex items-center gap-1.5 px-3 py-1.5"
                        style={{
                          background: "var(--koz-surface)",
                          border: "1px solid var(--koz-border)",
                          minWidth: "52px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "13px",
                            color: "#EAE6FF",
                          }}
                        >
                          {letter}
                        </span>
                        <span
                          style={{
                            color: "#F5C842",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          ={val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Örnek hesaplama */}
            <div
              className="mt-6 p-5"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#7C3AED",
                  marginBottom: "0.75rem",
                }}
              >
                ✦ Örnek Hesaplama
              </p>
              <p
                style={{
                  color: "var(--koz-text-muted)",
                  fontSize: "0.875rem",
                  lineHeight: 1.8,
                }}
              >
                <strong style={{ color: "#EAE6FF" }}>AHMET</strong> ismi için:
                A=1, H=8, M=4, E=5, T=2 → Toplam: <strong style={{ color: "#F5C842" }}>1+8+4+5+2 = 20</strong>
                <br />
                20 → 2+0 = <strong style={{ color: "#F5C842" }}>2</strong> (Kader Sayısı)
                <br /><br />
                <strong style={{ color: "#EAE6FF" }}>ZEYNEP</strong> ismi için:
                Z=8, E=5, Y=7, N=5, E=5, P=7 → Toplam: <strong style={{ color: "#F5C842" }}>8+5+7+5+5+7 = 37</strong>
                <br />
                37 → 3+7 = 10 → 1+0 = <strong style={{ color: "#F5C842" }}>1</strong> (Kader Sayısı)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KADER SAYISI PROFİLLERİ */}
      <section style={{ background: "var(--koz-void)" }}>
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
              ✦ Kader Sayısı Profilleri
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
              İsmin Söyledikleri
            </h2>
            <div className="koz-rule mt-4" style={{ maxWidth: "160px" }} />
          </div>

          <div className="space-y-0">
            {destinyProfiles.map((profile) => (
              <article
                key={profile.number}
                className="py-10"
                style={{ borderTop: "1px solid var(--koz-border)" }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 font-display"
                        style={{
                          background: profile.accent + "18",
                          border: `1px solid ${profile.accent}40`,
                          color: profile.accent,
                          fontSize: "1rem",
                          fontWeight: 700,
                        }}
                      >
                        {profile.number}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--koz-text-faint)",
                          }}
                        >
                          Kader Sayısı {profile.number}
                        </p>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#EAE6FF",
                            lineHeight: 1.2,
                          }}
                        >
                          {profile.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--koz-text-faint)",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                        paddingLeft: "3rem",
                      }}
                    >
                      {profile.traits}
                    </p>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div
                      className="p-4"
                      style={{
                        background: profile.accent + "08",
                        border: `1px solid ${profile.accent}25`,
                        borderLeft: `3px solid ${profile.accent}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: profile.accent,
                          marginBottom: "0.4rem",
                        }}
                      >
                        İsmin Enerjisi
                      </p>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--koz-text-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {profile.strengths}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                            marginBottom: "0.5rem",
                          }}
                        >
                          Yaşam Teması
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#EAE6FF",
                            lineHeight: 1.6,
                            fontStyle: "italic",
                          }}
                        >
                          {profile.lifeTheme}
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
                            marginBottom: "0.5rem",
                          }}
                        >
                          Gelişim Alanı
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "var(--koz-text-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          {profile.challenges}
                        </p>
                      </div>
                    </div>
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
              İsim Numerolojisi Hakkında
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
            background:
              "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(124,58,237,0.14) 0%, transparent 70%)",
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
            ✦ Şimdi Keşfet
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
            İsminin Enerjisini Hesapla
          </h2>
          <p
            className="mx-auto mb-8"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "400px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            Doğum tarihin ile birlikte ismin de ruhunun haritasını çizer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="koz-btn-primary">
              <Sparkles className="w-4 h-4" />
              Ücretsiz Analiz Al
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