import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Sparkles, ChevronRight } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Kariyer Numerolojisi — Doğum Tarihine Göre Meslek ve İş Hayatı Analizi",
  description: "Kariyer numerolojisi ile doğum tarihinizden hesaplanan yaşam yolu sayınıza göre en uygun meslek alanlarını öğrenin. 1'den 9'a, usta sayılar dahil tüm sayılar için ücretsiz kariyer analizi.",
  keywords: "kariyer numeroloji, numeroloji meslek seçimi, doğum tarihine göre kariyer, yaşam yolu sayısı kariyer, numeroloji iş hayatı, numeroloji kariyer rehberi, numeroloji hangi meslek",
  alternates: { canonical: "https://kozmograf.com/kariyer-numerolojisi" },
  openGraph: {
    title: "Kariyer Numerolojisi — Doğum Tarihine Göre Meslek Analizi | Kozmograf",
    description: "Doğum tarihinize göre numeroloji kariyer analizi yapın. Yaşam yolu sayınızın iş hayatınıza yansımaları ve ideal meslek önerileri. Ücretsiz.",
    url: "https://kozmograf.com/kariyer-numerolojisi",
  },
};

const careerGuides = [
  {
    number: 1,
    title: "Lider & Girişimci",
    accent: "#F5C842",
    idealCareers: ["Girişimcilik", "CEO / Genel Müdürlük", "Siyaset", "Bağımsız danışmanlık", "İcatçılık"],
    strengths: "Bağımsız karar verme, öncülük etme, yenilikçi düşünce, motivasyon yeteneği",
    challenges: "Takım çalışmasına uyum sağlamak, başkalarına yetki devretmek",
    workStyle: "Özerk çalışma ortamlarında parlarsınız. Kendi şirketinizi kurmak ya da bir organizasyonun zirvesine ulaşmak sizin için en tatmin edici yoldur.",
    avoidCareers: "Aşırı hiyerarşik yapılar, bürokratik pozisyonlar",
  },
  {
    number: 2,
    title: "Arabulucu & Danışman",
    accent: "#7C3AED",
    idealCareers: ["Psikoloji / Psikoterapi", "İnsan kaynakları", "Diplomasi", "Hemşirelik / Bakım", "Sosyal hizmet"],
    strengths: "Empati, dinleme becerisi, uyum sağlama, ekip ruhu, barış yapıcılık",
    challenges: "Kendi ihtiyaçlarını öncelikli kılmak, sınır koymak",
    workStyle: "İşbirliğine dayalı ortamlarda en iyi performansı gösterirsiniz. Başkalarını destekleyen, köprü kuran rollerde tatmin bulursunuz.",
    avoidCareers: "Yoğun rekabet gerektiren, baskılı satış ortamları",
  },
  {
    number: 3,
    title: "Yaratıcı & İletişimci",
    accent: "#DB2777",
    idealCareers: ["Yazarlık / Gazetecilik", "Sanat & Tasarım", "Oyunculuk / Performans", "Pazarlama & Reklam", "Öğretmenlik"],
    strengths: "Yaratıcılık, iletişim gücü, ilham verme, optimizm, anlatı yeteneği",
    challenges: "Projeleri bitirmek, pratik detaylara odaklanmak",
    workStyle: "Yaratıcı özgürlüğün olduğu, ifadeye değer veren ortamlarda gelişirsiniz. Rutin ve tekrar sizi bunaltır.",
    avoidCareers: "Monoton veri işleme, tekrarlı üretim hatları",
  },
  {
    number: 4,
    title: "İnşaatçı & Uzman",
    accent: "#059669",
    idealCareers: ["Mühendislik", "Mimarlık", "Muhasebe & Finans", "Hukuk", "Proje yönetimi"],
    strengths: "Disiplin, güvenilirlik, sistematik düşünme, uzun vadeli planlama, pratiklik",
    challenges: "Esneklik göstermek, değişime hızlı adapte olmak",
    workStyle: "Yapılandırılmış, net hedeflerin olduğu ortamlarda mükemmelsiniz. Sağlam temeller üzerine inşa edilen kariyerlerde uzun vadeli başarı yakalarsınız.",
    avoidCareers: "Belirsiz roller, sürekli değişen öncelikler",
  },
  {
    number: 5,
    title: "Maceraperest & Değişim Ajanı",
    accent: "#0284C7",
    idealCareers: ["Seyahat & Turizm", "Gazetecilik & Muhabirlik", "Satış & Pazarlama", "Girişimcilik", "Dijital göçebelik"],
    strengths: "Uyum sağlama, çok yönlülük, iletişim, risk alma, keşfetme",
    challenges: "Bir konuya uzun süre odaklanmak, rutini sürdürmek",
    workStyle: "Çeşitlilik ve değişimin olduğu dinamik ortamlarda parılarsınız. Uzak çalışma ve esnek programlar sizin için idealdir.",
    avoidCareers: "9–5 ofis rutini, tek tipli görevler",
  },
  {
    number: 6,
    title: "Bakıcı & Hizmet Odaklı",
    accent: "#DC2626",
    idealCareers: ["Tıp & Sağlık hizmetleri", "Öğretmenlik & Eğitim", "Sosyal hizmet", "Ev tasarımı & Dekorasyon", "Çocuk gelişimi"],
    strengths: "Şefkat, sorumluluk, güvenilirlik, başkalarını beslemek, detay odaklılık",
    challenges: "Kendi bakımını ihmal etmek, aşırı yüklenme",
    workStyle: "Başkalarına hizmet ettiğiniz ve olumlu etki yarattığınız rollerde derin tatmin yaşarsınız. Aile ve toplum odaklı kariyer yolları size çekici gelir.",
    avoidCareers: "Yalnız çalışılan izole ortamlar, insansız teknik roller",
  },
  {
    number: 7,
    title: "Araştırmacı & Analist",
    accent: "#9B59F5",
    idealCareers: ["Bilimsel araştırma", "Felsefe & Akademi", "Yazarlık & Şiir", "Bilgi teknolojileri", "Maneviyat & Koçluk"],
    strengths: "Analitik düşünce, derinlemesine araştırma, sezgi, bağımsız çalışma, bilgelik",
    challenges: "Takım çalışmasına dahil olmak, pratik uygulamaya geçmek",
    workStyle: "Yalnız çalışabileceğiniz, derinlemesine analiz gerektiren ortamlarda en iyi performansı gösterirsiniz. Çalışmanızın anlamı ve amacı kritiktir.",
    avoidCareers: "Yüksek sosyal etkileşim gerektiren satış, açık ofis gürültüsü",
  },
  {
    number: 8,
    title: "Yönetici & Organizatör",
    accent: "#F59E0B",
    idealCareers: ["İş dünyası & Yöneticilik", "Finans & Yatırım", "Hukuk & Avukatlık", "Gayrimenkul", "Büyük ölçekli girişimcilik"],
    strengths: "Stratejik düşünce, liderlik, finansal zekâ, güç yönetimi, sonuç odaklılık",
    challenges: "İş-yaşam dengesini kurmak, para dışı değerlere alan açmak",
    workStyle: "Büyük hedeflerin, rekabetin ve başarının ön planda olduğu ortamlarda mükemmelsiniz. Güç ve etki size enerji verir.",
    avoidCareers: "Düşük ücretli yardımcı roller, büyüme fırsatsız pozisyonlar",
  },
  {
    number: 9,
    title: "Vizyoner & İnsancıl",
    accent: "#10B981",
    idealCareers: ["Sosyal aktivizm & STK", "Uluslararası ilişkiler", "Sanat & Edebiyat", "Spiritüel koçluk", "Sağlık hizmetleri"],
    strengths: "Büyük vizyon, şefkat, idealizm, ilham verme, evrensel perspektif",
    challenges: "Pratik detaylara inmek, kişisel sınırları korumak",
    workStyle: "Anlamlı, daha büyük bir amaca hizmet eden çalışmalarda derin tatmin bulursunuz. Para tek başına sizi motive etmez; etki yaratmak önemlidir.",
    avoidCareers: "Sırf kâr odaklı, etik değerlerle çelişen kurumlar",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Kariyer Numerolojisi — Sayınıza Göre İdeal Meslek Rehberi",
      description:
        "Yaşam yolu sayınıza göre en uygun kariyer alanlarını keşfedin.",
      url: "https://kozmograf.com/kariyer-numerolojisi",
      author: { "@type": "Organization", name: "Kozmograf" },
      publisher: { "@type": "Organization", name: "Kozmograf" },
      dateModified: "2025-05-01",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Numeroloji kariyer seçiminde nasıl yardımcı olur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yaşam yolu sayınız, doğal güçlerinizi ve yeteneklerinizi ortaya koyar. Bu sayının enerjisiyle uyumlu kariyer alanları seçmek, hem başarı olasılığını artırır hem de iş tatminini yükseltir.",
          },
        },
        {
          "@type": "Question",
          name: "Hangi numeroloji sayısı iş hayatında en başarılı olur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Her sayının kendi alanında üstün olduğu kariyer vardır. 8 ve 1 sayıları iş dünyasında genellikle öne çıkar; ancak 3 yaratıcı sektörlerde, 7 akademide, 9 ise sosyal alanlarda parlayabilir.",
          },
        },
      ],
    },
  ],
};

export default function KariyerNumerolojisiPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="relative overflow-hidden pb-16 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(245,200,66,0.07) 0%, transparent 60%)",
        }}
      >
        <div className="text-center fade-up relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
            <div
              className="px-4 py-1.5 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(245,200,66,0.25)",
                background: "rgba(245,200,66,0.05)",
              }}
            >
              <Briefcase className="w-3 h-3" style={{ color: "#F5C842" }} />
              <span
                style={{
                  color: "#F5C842",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Kariyer Rehberi
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
              textShadow: "0 0 80px rgba(245,200,66,0.15)",
            }}
          >
            Kariyer Numerolojisi
          </h1>
          <LastUpdated />
          <p
            className="fade-up-d3"
            style={{
              color: "#F5C842",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}
          >
            Sayınızın Sizi Yönlendirdiği Yol
          </p>
          <p
            className="fade-up-d4 mx-auto"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "540px",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            Yaşam yolu sayınız, doğuştan gelen yeteneklerinizi ve güçlü yanlarınızı ortaya koyar.
            Bu enerjilerle uyumlu kariyerlerde hem başarı hem de derin tatmin bulursunuz.
          </p>
          <Link href="/#numerology-form" className="koz-btn-primary inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Sayımı Öğren
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--koz-void)" }}>
        <div className="container mx-auto px-4 max-w-5xl py-16">
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
              ✦ Sayıya Göre Kariyer
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
              Yaşam Yolu Sayınıza Göre Kariyer Rehberi
            </h2>
          </div>

          <div className="space-y-0">
            {careerGuides.map((guide) => (
              <article
                key={guide.number}
                className="py-10"
                style={{ borderTop: "1px solid var(--koz-border)" }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: guide.accent + "14",
                          border: `1px solid ${guide.accent}35`,
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ color: guide.accent, fontSize: "1.5rem", fontWeight: 600, lineHeight: 1 }}
                        >
                          {guide.number}
                        </span>
                      </div>
                      <div>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#EAE6FF",
                            lineHeight: 1.2,
                          }}
                        >
                          {guide.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--koz-text-muted)",
                        lineHeight: 1.7,
                        fontStyle: "italic",
                      }}
                    >
                      {guide.workStyle}
                    </p>
                  </div>

                  <div className="md:w-3/4 grid sm:grid-cols-2 gap-4">
                    <div
                      style={{
                        background: guide.accent + "08",
                        border: `1px solid ${guide.accent}20`,
                        padding: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: guide.accent,
                          marginBottom: "10px",
                        }}
                      >
                        ✦ İdeal Kariyer Alanları
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {guide.idealCareers.map((career) => (
                          <li
                            key={career}
                            style={{
                              fontSize: "12px",
                              color: "var(--koz-text-muted)",
                              lineHeight: 1.8,
                              paddingLeft: "12px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: 0,
                                color: guide.accent,
                                opacity: 0.6,
                              }}
                            >
                              →
                            </span>
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div
                        style={{
                          background: "rgba(16,185,129,0.05)",
                          border: "1px solid rgba(16,185,129,0.18)",
                          padding: "14px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#10B981",
                            marginBottom: "6px",
                          }}
                        >
                          Güçlü Yanlar
                        </p>
                        <p style={{ fontSize: "11px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                          {guide.strengths}
                        </p>
                      </div>
                      <div
                        style={{
                          background: "rgba(239,68,68,0.05)",
                          border: "1px solid rgba(239,68,68,0.15)",
                          padding: "14px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#EF4444",
                            marginBottom: "6px",
                          }}
                        >
                          Dikkat Edilmesi Gerekenler
                        </p>
                        <p style={{ fontSize: "11px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                          {guide.challenges}
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

      <section
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
            ✦ Tam Profil
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
            Sayını Hesapla, Yolunu Bul
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
            Yaşam yolu sayını öğren ve yukarıdaki rehberde tam sana göre olan kariyer yolunu keşfet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#numerology-form" className="koz-btn-primary inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ücretsiz Hesapla
            </Link>
            <Link
              href="/gucler-ve-yetenekler"
              className="inline-flex items-center gap-2 px-5 py-2.5"
              style={{
                border: "1px solid var(--koz-border-bright)",
                color: "var(--koz-text-muted)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Güçlü Yanlarım
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}