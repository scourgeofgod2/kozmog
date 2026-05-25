import type { Metadata } from "next";
import Link from "next/link";
import { Route, ArrowRight, Star, Sparkles, ChevronRight } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Yaşam Yolu Sayısı — Numeroloji Hesaplama ve Anlam Rehberi",
  description:
    "Yaşam yolu sayınızı öğrenin ve anlamını keşfedin. 1'den 9'a, usta sayılar 11, 22, 33 dahil tüm yaşam yolu sayılarının detaylı açıklamaları.",
  keywords:
    "yaşam yolu sayısı, yaşam yolu sayısı hesaplama, yaşam yolu numeroloji, numeroloji 1 2 3 4 5 6 7 8 9",
  alternates: { canonical: "https://kozmograf.com/yasam-yolu" },
  openGraph: {
    title: "Yaşam Yolu Sayısı — Numeroloji Rehberi | Kozmograf",
    description:
      "Doğum tarihinizden hesaplanan yaşam yolu sayınızın derin anlamını keşfedin.",
    url: "https://kozmograf.com/yasam-yolu",
  },
};

const lifePathNumbers = [
  {
    number: 1,
    title: "Lider",
    keywords: "Bağımsızlık · Öncülük · Özgünlük",
    description:
      "1 yaşam yolu sayısına sahip kişiler doğal liderlerdir. Bağımsız düşünce, özgün yaklaşım ve öncü ruhlarıyla fark yaratırlar. En büyük ders: başkalarına bağımlı olmadan kendi yolunu çizmek.",
    accent: "#F5C842",
    careers: "Girişimcilik, yöneticilik, sanatçılık, icatçılık",
  },
  {
    number: 2,
    title: "Diplomatik Ortak",
    keywords: "İşbirliği · Denge · Hassasiyet",
    description:
      "2 yaşam yolu sayısı derin empati ve işbirliği enerjisi taşır. Bu kişiler barış yapıcı, dengeli ve sezgisel yapılarıyla ilişkilerde güçlü köprüler kurar.",
    accent: "#7C3AED",
    careers: "Danışmanlık, diplomasi, psikoloji, hemşirelik",
  },
  {
    number: 3,
    title: "Yaratıcı İfadeci",
    keywords: "Yaratıcılık · İletişim · Neşe",
    description:
      "3 yaşam yolu sayısı yaratıcılık ve ifade enerjisiyle doludur. Sanat, müzik, yazarlık veya konuşma yoluyla dünyayla bağlantı kurarlar. Hayata ışık ve neşe katarlar.",
    accent: "#DB2777",
    careers: "Sanat, yazarlık, oyunculuk, öğretmenlik, tasarım",
  },
  {
    number: 4,
    title: "İnşaatçı",
    keywords: "Çalışkanlık · Güvenilirlik · Düzen",
    description:
      "4 yaşam yolu sayısı sağlam temeller ve sistematik çalışma anlamına gelir. Bu kişiler güvenilir, disiplinli ve pratiktir. Uzun vadeli hedeflere ulaşmada olağanüstü kararlılık gösterirler.",
    accent: "#059669",
    careers: "Mühendislik, mimarlık, muhasebe, proje yönetimi",
  },
  {
    number: 5,
    title: "Özgür Ruh",
    keywords: "Özgürlük · Macera · Değişim",
    description:
      "5 yaşam yolu sayısı özgürlük ve değişim enerjisi taşır. Maceraperest, uyum sağlayan ve meraklı bu kişiler yeni deneyimlere açıktır. Rutin onları kısıtlar; değişim onları besler.",
    accent: "#0284C7",
    careers: "Seyahat, gazetecilik, satış, girişimcilik, performans sanatları",
  },
  {
    number: 6,
    title: "Bakıcı",
    keywords: "Sorumluluk · Hizmet · Sevgi",
    description:
      "6 yaşam yolu sayısı aile, sorumluluk ve hizmet enerjisi taşır. Bu kişiler şefkatli, koruyucu ve güvenilirdir. Topluma ve sevdiklerine adanmış bir yaşam sürerler.",
    accent: "#DC2626",
    careers: "Sağlık, sosyal hizmet, öğretmenlik, ev tasarımı, danışmanlık",
  },
  {
    number: 7,
    title: "Bilge Araştırmacı",
    keywords: "Ruhanilik · Analiz · Sezgi",
    description:
      "7 yaşam yolu sayısı derin düşünce ve ruhani araştırma enerjisi taşır. Bu kişiler analitik, sezgisel ve içe dönük yapılarıyla gerçeği araştırır. Yalnızlık onlar için yenilenmedir.",
    accent: "#9B59F5",
    careers: "Araştırma, felsefe, bilim, yazarlık, maneviyat",
  },
  {
    number: 8,
    title: "Güç Odaklı",
    keywords: "Başarı · Güç · Bolluk",
    description:
      "8 yaşam yolu sayısı maddi başarı ve güç enerjisi taşır. Kararlı, hırslı ve stratejik bu kişiler büyük hedeflere ulaşmak için doğmuştur. İş dünyasında sıklıkla zirveye çıkarlar.",
    accent: "#F59E0B",
    careers: "İş dünyası, finans, yöneticilik, hukuk, gayrimenkul",
  },
  {
    number: 9,
    title: "İnsancıl Bilge",
    keywords: "Hümanizm · Tamamlama · Evrensellik",
    description:
      "9 yaşam yolu sayısı insanlığa hizmet ve tamamlama enerjisi taşır. Bu kişiler şefkatli, idealist ve evrensel perspektife sahiptir. Dünyayı daha iyi bir yer yapmak için çabalarlar.",
    accent: "#10B981",
    careers: "Sosyal aktivizm, sanat, eğitim, spiritüellik, sağlık hizmetleri",
  },
  {
    number: 11,
    title: "Sezgi Ustası",
    keywords: "İlham · Ruhsal Rehberlik · Vizyon",
    description:
      "11 usta sayısı yüksek sezgi ve ruhsal ilham enerjisi taşır. Bu kişiler sıradan insanların göremediği şeyleri hissedebilir. Yüksek potansiyelleriyle başkalarına ilham kaynağı olurlar.",
    accent: "#C4B5FD",
    isMaster: true,
    careers: "Maneviyat, sanat, şiir, psikoloji, liderlik",
  },
  {
    number: 22,
    title: "Ana İnşaatçı",
    keywords: "Büyük Vizyon · Pratik Güç · Kalıcı Eserler",
    description:
      "22 usta sayısı büyük projeleri hayata geçirme gücü taşır. 4'ün pratikliğini evrensel vizyonla birleştirir. Tarihte iz bırakan kurumlar, yapılar ve sistemler inşa edebilirler.",
    accent: "#F5C842",
    isMaster: true,
    careers: "Mimarlık, mühendislik, siyaset, büyük ölçekli girişimcilik",
  },
  {
    number: 33,
    title: "Usta Öğretmen",
    keywords: "Şefkat · İyileştirme · Evrensel Sevgi",
    description:
      "33 usta sayısı en yüksek ruhsal enerjiyi taşır. Şefkat, iyileştirme ve evrensel sevgiyle insanlığa hizmet eden bu kişiler, dünyada derin izler bırakır. Son derece nadir rastlanan bir sayıdır.",
    accent: "#EC4899",
    isMaster: true,
    careers: "Maneviyat, iyileştirme sanatları, öğretmenlik, sosyal liderlik",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Yaşam Yolu Sayısı — Numeroloji Hesaplama ve Anlam Rehberi",
      description:
        "Yaşam yolu sayınızı öğrenin ve anlamını keşfedin. 1'den 9'a tüm sayıların detaylı açıklamaları.",
      url: "https://kozmograf.com/yasam-yolu",
      author: { "@type": "Organization", name: "Kozmograf" },
      publisher: { "@type": "Organization", name: "Kozmograf" },
      dateModified: "2025-05-01",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Yaşam yolu sayısı nasıl hesaplanır?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Doğum tarihinizin tüm rakamlarını toplayın ve tek basamağa indirgeyin. Örneğin 15.03.1990: 1+5+0+3+1+9+9+0 = 28 → 2+8 = 10 → 1+0 = 1. Sonuç 11, 22 veya 33 ise bu usta sayısı olarak kalır.",
          },
        },
        {
          "@type": "Question",
          name: "Yaşam yolu sayısı ne anlama gelir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yaşam yolu sayısı, numerolojide en önemli sayıdır. Doğum tarihinizden hesaplanır ve hayatınızın temel amacını, yolculuğunuzu ve doğal eğilimlerinizi ortaya koyar.",
          },
        },
        {
          "@type": "Question",
          name: "Usta sayılar nedir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "11, 22 ve 33 usta sayılarıdır. Bu sayılar tek basamağa indirgenmez çünkü yüksek ruhsal potansiyeli ve özel yaşam misyonunu temsil eder.",
          },
        },
      ],
    },
  ],
};

export default function YasamYoluPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="relative overflow-hidden pb-16 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="text-center fade-up relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
            <div
              className="px-4 py-1.5 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(124,58,237,0.3)",
                background: "rgba(124,58,237,0.06)",
              }}
            >
              <Route className="w-3 h-3" style={{ color: "#9B59F5" }} />
              <span
                style={{
                  color: "#9B59F5",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Numeroloji Rehberi
              </span>
            </div>
          </div>

          <h1
            className="font-display fade-up-d2"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#EAE6FF",
              marginBottom: "0.5rem",
              textShadow: "0 0 80px rgba(124,58,237,0.3)",
            }}
          >
            Yaşam Yolu Sayısı
          </h1>
          <LastUpdated />
          <p
            className="fade-up-d3"
            style={{
              color: "#9B59F5",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}
          >
            Doğum Tarihinizin Gizli Mesajı
          </p>

          <p
            className="fade-up-d4 mx-auto"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "560px",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Yaşam yolu sayısı, numerolojide en temel ve en anlamlı sayıdır. Doğum tarihinizden
            hesaplanır; hayatınızın amacını, doğal yeteneklerinizi ve karşılaşacağınız dersleri
            ortaya koyar.
          </p>

          <Link
            href="/#numerology-form"
            className="koz-btn-primary inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Yaşam Yolu Sayımı Hesapla
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--koz-deep)", borderTop: "1px solid var(--koz-border)" }}>
        <div className="container mx-auto px-4 max-w-4xl py-16">
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
              ✦ Hesaplama Yöntemi
            </span>
            <h2
              className="font-display mt-3 mb-5"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.2,
              }}
            >
              Yaşam Yolu Sayısı Nasıl Hesaplanır?
            </h2>
            <p style={{ color: "var(--koz-text-muted)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Yaşam yolu sayısını bulmak için doğum tarihinizin tüm rakamlarını toplayın ve sonucu
              tek basamağa indirgeyin. 11, 22 veya 33 gibi usta sayılar elde edilirse bu sayılar
              olduğu gibi kalır.
            </p>
            <div
              style={{
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.2)",
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9B59F5",
                  marginBottom: "10px",
                }}
              >
                Örnek Hesaplama
              </p>
              <p
                style={{
                  color: "#EAE6FF",
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                  lineHeight: 2,
                }}
              >
                Doğum tarihi: 15 Mart 1990
                <br />
                1 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 28
                <br />
                2 + 8 = 10
                <br />
                1 + 0 ={" "}
                <span style={{ color: "#F5C842", fontWeight: 700 }}>1</span>
                <br />
                <span style={{ color: "var(--koz-text-muted)", fontSize: "0.85rem" }}>
                  → Yaşam Yolu Sayısı: 1 (Lider)
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--koz-void)" }}>
        <div className="container mx-auto px-4 max-w-4xl py-16">
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
              ✦ Tüm Sayılar
            </span>
            <h2
              className="font-display mt-3"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.2,
              }}
            >
              Yaşam Yolu Sayılarının Anlamları
            </h2>
          </div>

          <div className="space-y-0">
            {lifePathNumbers.map((item) => (
              <article
                key={item.number}
                className="py-8"
                style={{ borderTop: "1px solid var(--koz-border)" }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 flex items-center justify-center"
                      style={{
                        background: item.accent + "14",
                        border: `1px solid ${item.accent}35`,
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          color: item.accent,
                          fontSize: item.isMaster ? "1.3rem" : "1.6rem",
                          fontWeight: 600,
                          lineHeight: 1,
                        }}
                      >
                        {item.number}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3
                        className="font-display"
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          fontStyle: "italic",
                          color: "#EAE6FF",
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.isMaster && (
                        <span
                          style={{
                            fontSize: "8px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: item.accent,
                            border: `1px solid ${item.accent}40`,
                            padding: "2px 8px",
                            background: item.accent + "10",
                          }}
                        >
                          Usta Sayı
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: item.accent,
                        marginBottom: "8px",
                        opacity: 0.8,
                      }}
                    >
                      {item.keywords}
                    </p>
                    <p
                      style={{
                        color: "var(--koz-text-muted)",
                        lineHeight: 1.8,
                        fontSize: "0.9rem",
                        marginBottom: "8px",
                      }}
                    >
                      {item.description}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--koz-text-faint)",
                        fontStyle: "italic",
                      }}
                    >
                      Kariyer alanları: {item.careers}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--koz-surface)", borderTop: "1px solid var(--koz-border)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl py-16 text-center">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
            }}
          >
            ✦ Hemen Keşfet
          </span>
          <h2
            className="font-display mt-4 mb-4"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EAE6FF",
              lineHeight: 1.2,
            }}
          >
            Yaşam Yolu Sayını Öğren
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
            Doğum tarihini gir, saniyeler içinde yaşam yolu sayını ve kişisel AI yorumunu al.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#numerology-form" className="koz-btn-primary inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ücretsiz Hesapla
            </Link>
            <Link
              href="/uyumluluk"
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{
                border: "1px solid var(--koz-border-bright)",
                color: "var(--koz-text-muted)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 160ms",
              }}
            >
              Uyumluluğa Git
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}