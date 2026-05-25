import type { Metadata } from "next";
import Link from "next/link";
import { Gem, Sparkles, ChevronRight } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Numeroloji ile Güçlü Yanlar ve Gizli Yetenekler — Doğum Tarihinden Kişilik Analizi",
  description: "Numeroloji ile güçlü yanlarınızı ve gizli yeteneklerinizi keşfedin. Doğum tarihinizden hesaplanan yaşam yolu sayınız doğal becerilerinizi, kişilik özelliklerinizi ve gelişim alanlarınızı ortaya koyar. Ücretsiz analiz.",
  keywords: "numeroloji güçlü yanlar, gizli yetenekler numeroloji, numeroloji kişilik analizi, yaşam yolu yetenekler, numeroloji kişilik güçleri, doğum tarihi kişilik özellikleri, numeroloji karakter analizi",
  alternates: { canonical: "https://kozmograf.com/gucler-ve-yetenekler" },
  openGraph: {
    title: "Numeroloji ile Güçlü Yanlar ve Gizli Yetenekler — Kişilik Analizi | Kozmograf",
    description: "Doğum tarihinize göre gizli yeteneklerinizi ve doğal güçlerinizi numeroloji ile keşfedin. Ücretsiz kişilik ve yetenek analizi.",
    url: "https://kozmograf.com/gucler-ve-yetenekler",
  },
};

const strengthProfiles = [
  {
    number: 1,
    accent: "#F5C842",
    title: "Öncü Güç",
    tagline: "Doğuştan Lider",
    coreStrengths: [
      { name: "Liderlik", desc: "Doğal otorite ve yön gösterme yeteneği" },
      { name: "Kararlılık", desc: "Zor kararları almaktan çekinmeme" },
      { name: "Özgünlük", desc: "Kendine özgü bir yol açma gücü" },
      { name: "Motivasyon", desc: "Hem kendini hem başkalarını harekete geçirme" },
    ],
    hiddenTalent: "Görünürde lider gibi durmak zorunda hissetseniz de en büyük gizli yeteneğiniz, başkalarında henüz göremedikleri potansiyeli görebilmektir.",
    growthArea: "Başkalarının bakış açısına yer açmak ve işbirliğinin gücünü deneyimlemek",
    superpower: "Yoktan bir şey yaratma — vizyon ile eylemi birleştirme",
  },
  {
    number: 2,
    accent: "#7C3AED",
    title: "Empatik Güç",
    tagline: "Derin Bağlantı Kurucusu",
    coreStrengths: [
      { name: "Empati", desc: "Başkalarının duygularını derinlemesine hissetme" },
      { name: "Arabuluculuk", desc: "Çatışmaları barışçıl çözme yeteneği" },
      { name: "Sezgi", desc: "Söylenmeyeni okuma kapasitesi" },
      { name: "Sabır", desc: "Süreci güvensizlik hissetmeden bekleme gücü" },
    ],
    hiddenTalent: "Ortaya çıkmayan gerilimleri ve dengesizlikleri başkalarından çok önce fark eden mükemmel bir 'enerji sensörüsünüz.' Bu, inanılmaz değerli bir yetenektir.",
    growthArea: "Kendi ihtiyaçlarını başkalarının ihtiyaçları kadar değerli görmek",
    superpower: "Her iki tarafın da kendini duyulmuş hissettiği köprüler kurmak",
  },
  {
    number: 3,
    accent: "#DB2777",
    title: "Yaratıcı Güç",
    tagline: "İfade ve İlham Ustası",
    coreStrengths: [
      { name: "Yaratıcılık", desc: "Var olmayan şeyleri hayal etme ve yaratma" },
      { name: "İletişim", desc: "Karmaşık fikirleri canlı biçimde ifade etme" },
      { name: "Optimizm", desc: "Koşullar ne olursa olsun umut taşıma" },
      { name: "Sosyal Zekâ", desc: "İnsanları birbirine bağlama yeteneği" },
    ],
    hiddenTalent: "Hayal ettiğiniz şeyleri gerçekmiş gibi anlatma ve böylece başkalarını da bu vizyona inandırma gücünüz vardır. Bu nadir bir liderlik yeteneğidir.",
    growthArea: "Yaratıcı fikirleri hayata geçirecek pratik adımları atmak",
    superpower: "Sıradan anları unutulmaz deneyimlere dönüştürmek",
  },
  {
    number: 4,
    accent: "#059669",
    title: "İnşa Gücü",
    tagline: "Sağlam Temeller Kurucusu",
    coreStrengths: [
      { name: "Disiplin", desc: "Uzun vadeli hedeflere tutarlı şekilde bağlı kalma" },
      { name: "Güvenilirlik", desc: "Verilen sözü tutma ve hesap verebilirlik" },
      { name: "Analitik düşünce", desc: "Sorunları sistematik olarak çözme" },
      { name: "Pratiklik", desc: "Fikirleri uygulanabilir planlara dönüştürme" },
    ],
    hiddenTalent: "Diğerlerinin kaos gördüğü yerde siz bir düzen ve sistem görürsünüz. Bu 'gizli düzen', kaotik ortamlarda inanılmaz değer yaratır.",
    growthArea: "Mükemmeli beklemek yerine 'iyi'yi kabul etmek ve esneklik göstermek",
    superpower: "Büyük fikirleri somut, sürdürülebilir gerçekliklere dönüştürmek",
  },
  {
    number: 5,
    accent: "#0284C7",
    title: "Özgür Güç",
    tagline: "Değişim ve Keşif Ustası",
    coreStrengths: [
      { name: "Adaptasyon", desc: "Yeni koşullara hızla uyum sağlama" },
      { name: "Çok yönlülük", desc: "Birden fazla alanda eş zamanlı başarı" },
      { name: "Merak", desc: "Sürekli öğrenme ve keşfetme isteği" },
      { name: "Bağlantı kurma", desc: "Farklı dünyalar arasında köprüler oluşturma" },
    ],
    hiddenTalent: "Birbiriyle ilgisiz görünen konular arasında bağlantılar kurabilirsiniz. Bu sentez yeteneği, inovasyon için kritik bir kaynaktır.",
    growthArea: "Bir alana derinlemesine odaklanmak ve ürettiğinizi tamamlamak",
    superpower: "Her ortamda hayatta kalma ve büyüme — değişim sizi besledikçe siz de büyürsünüz",
  },
  {
    number: 6,
    accent: "#DC2626",
    title: "Şefkat Gücü",
    tagline: "Toplumun Kalbi",
    coreStrengths: [
      { name: "Şefkat", desc: "Koşulsuz sevgi ve anlayış sunma kapasitesi" },
      { name: "Sorumluluk", desc: "Üstlenilen her şeyi eksiksiz yapma güdüsü" },
      { name: "Estetik duyarlılık", desc: "Güzeli ve uyumu fark etme yeteneği" },
      { name: "Besleyicilik", desc: "Etrafındakileri büyütme ve destekleme" },
    ],
    hiddenTalent: "Bir ortamı ya da ilişkiyi daha girmeden 'okuyabilirsiniz.' Bu ortam zekâsı, çevrenizi iyileştirmede olağanüstü bir araç.",
    growthArea: "Kendi ihtiyaçlarını ihmal etmeden başkalarına hizmet etmek; sınır koymak bir zayıflık değil, güçtür",
    superpower: "Bulunduğu her ortamı daha sıcak, daha güvenli, daha insan hissettirmek",
  },
  {
    number: 7,
    accent: "#9B59F5",
    title: "Bilge Güç",
    tagline: "Derinliğin Bekçisi",
    coreStrengths: [
      { name: "Analiz", desc: "Yüzeyin altındaki gerçeği görme kapasitesi" },
      { name: "Sezgi", desc: "Kanıt olmadan doğruyu hissetme yeteneği" },
      { name: "Araştırma", desc: "Bir konuyu gerçekten anlayana dek derinleşme" },
      { name: "Farkındalık", desc: "İç dünyaya ve anlama derin ilgi" },
    ],
    hiddenTalent: "Yüzeysel bilgilerden derin örüntüler çıkarabilirsiniz — bu nadir bir zihinsel yetenek. Analistler, dedektifler ve filozoflar bu güce sahiptir.",
    growthArea: "Bildiklerini paylaşmak ve insanlarla bağlantı kurmak — bilgelik paylaşılınca büyür",
    superpower: "Bir sorunun gerçek kökenini bulmak — başkasının göremediği şeyi görmek",
  },
  {
    number: 8,
    accent: "#F59E0B",
    title: "Yönetici Güç",
    tagline: "Güç ve Bolluk Ustası",
    coreStrengths: [
      { name: "Stratejik düşünce", desc: "Büyük resmi görme ve buna göre hareket etme" },
      { name: "Liderlik", desc: "Kaynakları ve insanları yönetme yeteneği" },
      { name: "Finansal zekâ", desc: "Değeri ve fırsatı sezgisel olarak tanıma" },
      { name: "Azim", desc: "Başarı için gerektiği kadar ısrar etme gücü" },
    ],
    hiddenTalent: "Güç dinamiklerini ve organizasyonel yapıları başkalarından çok daha hızlı okursunuz. Bu 'güç haritası' okuma yeteneği, inanılmaz stratejik bir avantaj.",
    growthArea: "Başarının maddi boyutlarının ötesinde anlam aramak; güç, paylaşıldığında daha da büyür",
    superpower: "Kaynakları, insanları ve fikirleri bir araya getirerek büyük sonuçlar üretmek",
  },
  {
    number: 9,
    accent: "#10B981",
    title: "Vizyoner Güç",
    tagline: "İnsanlığın Şampiyonu",
    coreStrengths: [
      { name: "Büyük vizyon", desc: "Bir bütün olarak insanlığı ve geleceği görme yeteneği" },
      { name: "Şefkat", desc: "Tanımadıklarına bile derin bir empati" },
      { name: "İlham", desc: "Başkalarını daha büyük ideallere yönlendirme" },
      { name: "Bütünleştirme", desc: "Farklı bakış açılarını tek bir büyük tabloda birleştirme" },
    ],
    hiddenTalent: "İnsanlarda, olaylar ya da ilişkiler sona ermeden önce bunların biteceğini sezebilirsiniz. Bu 'döngü bilinci', değişim süreçlerinde eşsiz bir rehberlik sağlar.",
    growthArea: "Büyük idealleri somut adımlara indirgemek; dünyayı değiştirmek, tek bir eylemden başlar",
    superpower: "Ayrışmış insanları, toplulukları ve fikirleri ortak bir amaç etrafında birleştirmek",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Numeroloji ile Güçlü Yanlar ve Gizli Yetenekler",
      description: "Yaşam yolu sayınıza göre doğal güçlerinizi ve gizli yeteneklerinizi keşfedin.",
      url: "https://kozmograf.com/gucler-ve-yetenekler",
      author: { "@type": "Organization", name: "Kozmograf" },
      publisher: { "@type": "Organization", name: "Kozmograf" },
      dateModified: "2025-05-01",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Numeroloji gerçekten yeteneklerimi gösterebilir mi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Numeroloji, doğuştan gelen eğilimleri ve potansiyel güçlü yanları ortaya koyar. Kesin bir kader değil; kendinizi daha iyi anlamak ve farkındalık geliştirmek için güçlü bir araçtır.",
          },
        },
        {
          "@type": "Question",
          name: "Gizli yetenek nedir numerolojide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gizli yetenek, kişinin farkında olmadığı ya da tam olarak değerlendirmediği doğal bir kapasitedir. Numeroloji bu örüntüleri sayılar aracılığıyla yüzeye çıkarır.",
          },
        },
      ],
    },
  ],
};

export default function GuclerVeYeteneklerPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        className="relative overflow-hidden pb-16 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(5,150,105,0.07) 0%, transparent 60%)",
        }}
      >
        <div className="text-center fade-up relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
            <div
              className="px-4 py-1.5 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(5,150,105,0.3)",
                background: "rgba(5,150,105,0.06)",
              }}
            >
              <Gem className="w-3 h-3" style={{ color: "#059669" }} />
              <span
                style={{
                  color: "#059669",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Güçlü Yanlar Rehberi
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
              textShadow: "0 0 80px rgba(5,150,105,0.2)",
            }}
          >
            Güçlü Yanlar & Yetenekler
          </h1>
          <LastUpdated />
          <p
            className="fade-up-d3"
            style={{
              color: "#059669",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}
          >
            Sayınızda Yazılı Olan Potansiyel
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
            Doğum tarihinizden hesaplanan yaşam yolu sayınız, doğal güçlerinizi, henüz keşfetmediğiniz
            gizli yeteneklerinizi ve büyüme için en verimli alanlarınızı ortaya koyar.
          </p>
          <Link href="/#numerology-form" className="koz-btn-primary inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Sayımı ve Güçlerimi Keşfet
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
              ✦ Sayıya Göre Güç Profili
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
              Her Sayının Benzersiz Güç Profili
            </h2>
          </div>

          <div className="space-y-0">
            {strengthProfiles.map((profile) => (
              <article
                key={profile.number}
                className="py-10"
                style={{ borderTop: "1px solid var(--koz-border)" }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-14 h-14 flex items-center justify-center"
                        style={{
                          background: profile.accent + "14",
                          border: `1px solid ${profile.accent}35`,
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ color: profile.accent, fontSize: "1.6rem", fontWeight: 600, lineHeight: 1 }}
                        >
                          {profile.number}
                        </span>
                      </div>
                      <div>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#EAE6FF",
                            lineHeight: 1.2,
                          }}
                        >
                          {profile.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: profile.accent,
                            opacity: 0.8,
                            marginTop: "2px",
                          }}
                        >
                          {profile.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      {profile.coreStrengths.map((strength) => (
                        <div key={strength.name} className="flex gap-2">
                          <span style={{ color: profile.accent, fontSize: "11px", flexShrink: 0, marginTop: "1px" }}>
                            ◈
                          </span>
                          <div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#EAE6FF",
                                marginRight: "4px",
                              }}
                            >
                              {strength.name}:
                            </span>
                            <span style={{ fontSize: "11px", color: "var(--koz-text-muted)" }}>
                              {strength.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-3">
                    <div
                      style={{
                        background: profile.accent + "08",
                        border: `1px solid ${profile.accent}20`,
                        padding: "18px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: profile.accent,
                          marginBottom: "8px",
                        }}
                      >
                        ✦ Süper Güç
                      </p>
                      <p
                        className="font-display"
                        style={{
                          fontSize: "1rem",
                          fontStyle: "italic",
                          color: "#EAE6FF",
                          lineHeight: 1.5,
                        }}
                      >
                        {profile.superpower}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(155,89,245,0.05)",
                        border: "1px solid rgba(155,89,245,0.2)",
                        padding: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#9B59F5",
                          marginBottom: "8px",
                        }}
                      >
                        ✦ Gizli Yetenek
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                        {profile.hiddenTalent}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "rgba(245,200,66,0.05)",
                        border: "1px solid rgba(245,200,66,0.15)",
                        padding: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#F5C842",
                          marginBottom: "8px",
                        }}
                      >
                        ⟳ Büyüme Alanı
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.7 }}>
                        {profile.growthArea}
                      </p>
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
            ✦ Senin Güç Profilin
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
            Güçlerini Keşfetmeye Hazır mısın?
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
            Yaşam yolu sayını öğren ve yukarıdaki güç profilinde tam sana ait olan bölümü keşfet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#numerology-form" className="koz-btn-primary inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ücretsiz Hesapla
            </Link>
            <Link
              href="/kariyer-numerolojisi"
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
              Kariyer Rehberi
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}