import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Numerolojide Sayıların Anlamı — 1'den 9'a Tam Rehber",
  description:
    "Numerolojide 1, 2, 3, 4, 5, 6, 7, 8 ve 9 sayılarının anlamı, kişilik özellikleri, güçlü yanlar ve zorluklar. Sayınız hakkında her şey tek sayfada.",
  keywords:
    "numeroloji sayıların anlamı, numeroloji 1 sayısı, numeroloji 2 sayısı, numeroloji 3 sayısı, numeroloji 7 sayısı anlamı, numeroloji sayıları, sayıların gizemi numeroloji, numerolojide sayıların anlamları",
  alternates: { canonical: "https://kozmograf.com/sayilarin-anlami" },
  openGraph: {
    title: "Numerolojide Sayıların Anlamı 1-9 | Kozmograf",
    description:
      "1'den 9'a tüm sayıların numerolojik anlamı, kişilik profili, güçler ve zorluklar. Kapsamlı rehber.",
    url: "https://kozmograf.com/sayilarin-anlami",
  },
};

const numbers = [
  {
    n: 1,
    title: "Öncü",
    planet: "Güneş",
    accent: "#F5C842",
    element: "Ateş",
    keyword: "Liderlik & Bağımsızlık",
    description:
      "1 sayısı numerolojinin başlangıç noktasıdır. Tüm enerjilerin kaynağı, ham yaratıcı güç ve özgün kimliğin sembolüdür. 1 sayısını taşıyanlar doğuştan lider enerjisi taşır ve yeni yollar açmak için dünyaya gelmiştir.",
    strengths: ["Güçlü irade ve kararlılık", "Öncü ve yenilikçi bakış açısı", "Bağımsız düşünme yeteneği", "Motivasyon ve ilham kaynağı olma"],
    challenges: ["Bencillik ve inatçılık riski", "Başkalarının görüşünü küçümseme", "Sabırsızlık", "Yalnızlık hissi"],
    lifeLesson: "Başkalarını da beraber büyütmeyi öğrenmek",
    bestMatch: "2, 9",
    color: "Kırmızı & Altın",
  },
  {
    n: 2,
    title: "Arabulucu",
    planet: "Ay",
    accent: "#C4B5FD",
    element: "Su",
    keyword: "İşbirliği & Hassasiyet",
    description:
      "2 sayısı ikiliği, dengeyi ve ilişkileri temsil eder. Sezgi ve empati gücüyle donanmış olan 2'ler, çatışma ortamlarını uyuma dönüştüren doğal arabuluculardır. Sessiz güçleriyle arkalarında bıraktıkları iz derin olur.",
    strengths: ["Olağanüstü empati ve anlayış", "Diplomatik yaklaşım", "Güçlü sezgi", "Uyum yaratma becerisi"],
    challenges: ["Karar vermekte zorlanmak", "Başkalarına bağımlılık", "Kendi ihtiyaçlarını ihmal etmek", "Aşırı hassasiyet"],
    lifeLesson: "Sınır çizmeyi ve hayır demeyi öğrenmek",
    bestMatch: "1, 6, 9",
    color: "Gümüş & Lavanta",
  },
  {
    n: 3,
    title: "İfadeci",
    planet: "Jüpiter",
    accent: "#FB923C",
    element: "Ateş",
    keyword: "Yaratıcılık & Neşe",
    description:
      "3 sayısı yaratıcı ifadenin, iletişimin ve yaşam sevincinin sembolüdür. 3'ler dünyayı neşe ve ilhamla doldurmak için gelmiştir. Sanat, müzik, yazarlık, konuşma — yaratıcılık gerektiren her alanda doğal yetenekleri parlar.",
    strengths: ["Zengin yaratıcılık ve sanatsal yetenek", "Etkili iletişim ve hitabet", "İyimserlik ve neşe yayma", "Sosyal zeka"],
    challenges: ["Dağınıklık ve odak eksikliği", "Projeleri yarıda bırakma", "Yüzeysellik riski", "Eleştiriye aşırı hassasiyet"],
    lifeLesson: "Odaklanmayı ve derinleşmeyi öğrenmek",
    bestMatch: "1, 5, 9",
    color: "Turuncu & Sarı",
  },
  {
    n: 4,
    title: "Kurucu",
    planet: "Uranüs",
    accent: "#34D399",
    element: "Toprak",
    keyword: "Disiplin & Güvenilirlik",
    description:
      "4 sayısı sağlam temellerin, çalışkanlığın ve pratik zekânın sembolüdür. 4'ler olmadan büyük yapılar inşa edilemez. Sabır ve kararlılıklarıyla başladıkları işi her zaman bitirirler. Hayatın dört temel unsurunun — hava, su, ateş, toprak — enerjisini taşırlar.",
    strengths: ["Olağanüstü disiplin ve çalışkanlık", "Güvenilirlik ve dürüstlük", "Sistematik ve analitik düşünce", "Uzun vadeli planlama yeteneği"],
    challenges: ["Değişime direnç", "Katılık ve esneksizlik", "İş-yaşam dengesini kurmak", "Kendiliğindelik eksikliği"],
    lifeLesson: "Değişimi kucaklamayı öğrenmek",
    bestMatch: "2, 7, 8",
    color: "Yeşil & Kahverengi",
  },
  {
    n: 5,
    title: "Özgür Ruh",
    planet: "Merkür",
    accent: "#38BDF8",
    element: "Hava",
    keyword: "Özgürlük & Macera",
    description:
      "5 sayısı değişimin, özgürlüğün ve maceranın sembolüdür. 5'ler hayatı tam anlamıyla deneyimlemek için gelmiştir. Seyahat, yeni insanlar, yeni fikirler — çeşitlilik olmadan soluklamazlar. Beş duyu organının sayısı olan 5, fiziksel dünyanın tam anlamıyla keşfedilmesini simgeler.",
    strengths: ["Uyum sağlama yeteneği", "Çok yönlülük ve merak", "İletişim becerisi", "Değişim katalizörü olma"],
    challenges: ["Kararsızlık ve tutarsızlık", "Sorumluluktan kaçınma", "Aşırı uyarım arayışı", "Bağlanma güçlüğü"],
    lifeLesson: "Sorumluluk almayı ve derinleşmeyi öğrenmek",
    bestMatch: "1, 3, 7",
    color: "Turkuaz & Açık Mavi",
  },
  {
    n: 6,
    title: "Bakıcı",
    planet: "Venüs",
    accent: "#F472B6",
    element: "Toprak",
    keyword: "Sevgi & Sorumluluk",
    description:
      "6 sayısı sevginin, ailenin ve sorumluluğun sembolüdür. 6'lar başkalarına bakmak için doğmuş gibidir. Evde, toplulukta ve ilişkilerde uyum yaratmak en derin ihtiyaçlarıdır. Güzelliğe ve estetiğe derin bir bağlılıkları vardır.",
    strengths: ["Derin sevgi ve bağlılık kapasitesi", "Sorumluluk alma ve güvenilirlik", "Estetik duyarlılık", "İyileştirici enerji"],
    challenges: ["Aşırı müdahalecilik ve kontrolcülük", "Mükemmeliyetçilik", "Fedakarlık dengesini kurmak", "Başkalarına aşırı bağlılık"],
    lifeLesson: "Kendi ihtiyaçlarına da değer vermeyi öğrenmek",
    bestMatch: "2, 3, 9",
    color: "Pembe & Gül Altın",
  },
  {
    n: 7,
    title: "Bilge",
    planet: "Neptün",
    accent: "#818CF8",
    element: "Su",
    keyword: "Analiz & Sezgi",
    description:
      "7 sayısı bilgeliğin, analizin ve ruhsal derinliğin sembolüdür. 7'ler yüzeysel kalmayı sevmez; her şeyin özüne inmek isterler. Hem bilimsel hem de mistik sorulara eşit ilgi duyarlar. Yalnızlık onlar için bir kayıp değil, şarj olma zamanıdır.",
    strengths: ["Derin analitik düşünce", "Güçlü sezgi ve içgörü", "Araştırma ve gizem çözme", "Felsefi derinlik"],
    challenges: ["Sosyal izolasyon eğilimi", "Aşırı eleştiricilik", "Başkalarına güvenmekte zorlanmak", "Duygusal mesafe"],
    lifeLesson: "Başkalarıyla köprü kurmayı ve güvenmeyi öğrenmek",
    bestMatch: "4, 5",
    color: "Mor & İndigo",
  },
  {
    n: 8,
    title: "Güç Odağı",
    planet: "Satürn",
    accent: "#F97316",
    element: "Toprak",
    keyword: "Güç & Bolluk",
    description:
      "8 sayısı maddi başarının, gücün ve manifestasyonun sembolüdür. 8'ler büyük hedeflere ulaşmak için gereken kararlılığa ve stratejik zekaya doğuştan sahiptir. Sonsuz işareti (∞) andıran şekliyle, maddi ve ruhsal dünyanın dengesini temsil eder.",
    strengths: ["Güçlü liderlik ve otorite", "Stratejik düşünce ve vizyon", "Maddi başarıya ulaşma kapasitesi", "Azim ve güç"],
    challenges: ["Para ve güç ile sağlıklı ilişki kurmak", "Kontrolcü davranışlar", "İş-yaşam dengesi", "Ego ile başa çıkmak"],
    lifeLesson: "Gücü paylaşmayı ve başkalarını yükseltmeyi öğrenmek",
    bestMatch: "2, 4, 6",
    color: "Koyu Kırmızı & Bronz",
  },
  {
    n: 9,
    title: "Evrensel Bilge",
    planet: "Mars",
    accent: "#10B981",
    element: "Ateş",
    keyword: "Şefkat & Tamamlanma",
    description:
      "9 sayısı tüm sayıların tamamlanması ve evrensel sevginin sembolüdür. 9'lar insanlığa hizmet etmek için gelmiştir. Geniş bir empati, bağışlama kapasitesi ve idealizm taşırlar. 9 ile çarpılan her sayı tekrar 9'a döner — bu matematiksel özellik onun sonsuzluk enerjisini simgeler.",
    strengths: ["Evrensel sevgi ve şefkat", "İnsanlığa hizmet içgüdüsü", "Bağışlama kapasitesi", "İdealizm ve vizyon"],
    challenges: ["Hayal kırıklığına dayanmak", "Sınır koymak", "Bağlanmak ve bırakmak", "Gerçekçilik ile idealizm dengesi"],
    lifeLesson: "Hizmet ederken kendinizi kaybetmemeyi öğrenmek",
    bestMatch: "3, 6, 1",
    color: "Altın & Turkuaz",
  },
];

const dinSorulari = [
  {
    q: "Numeroloji İslam'a uygun mu?",
    a: "Numeroloji konusunda İslam alimleri arasında farklı görüşler bulunmaktadır. Sayıların matematiksel özelliklerini incelemek ve kişilik analizi yapmak amacıyla kullanılan numeroloji ile geleceği bilme iddiasındaki uygulamalar ayrı değerlendirilmelidir. Diyanet İşleri Başkanlığı'nın genel tutumuna göre, geleceği bilmenin yalnızca Allah'a ait olduğu ve bu tür araçların fala başvurmak gibi değerlendirilebileceği belirtilmektedir. Kişisel bir karar olup dini rehberlik için ilgili alimler veya Diyanet'e başvurulması önerilir.",
  },
  {
    q: "Numeroloji günah mı?",
    a: "Bu sorunun cevabı kişinin niyetine ve kullanım biçimine bağlıdır. Dini alimlerin büyük çoğunluğu; sayıların kişilik analizi ve öz-farkındalık amacıyla incelenmesini, geleceği bilme veya gayba hükmetme iddiasındaki uygulamalardan farklı değerlendirmektedir. Kesin bir fetva için yetkili İslam alimlerine veya Diyanet İşleri Başkanlığı'na başvurulması en doğru yaklaşımdır.",
  },
  {
    q: "Numeroloji caiz mi?",
    a: "Caiz olup olmadığı konusunda farklı alim görüşleri mevcuttur. Kimi alimler öz-farkındalık ve psikolojik analiz aracı olarak kullanılan numerolojinin zararlı olmadığını belirtirken, kimi alimler her türlü hurafe ve batıl inançtan kaçınılması gerektiğini vurgulamaktadır. Diyanet İşleri Başkanlığı'na veya güvendiğiniz bir İslam alimіне danışarak kendi kararınızı vermeniz önerilir.",
  },
  {
    q: "Numeroloji bilimsel mi?",
    a: "Numeroloji, akademik çevrelerde bilimsel bir disiplin olarak kabul görmez. Modern psikoloji ve nörobilim tarafından ampirik olarak doğrulanmış bir yöntem değildir. Bununla birlikte, kişilik ve öz-farkındalık üzerine düşünmek için kullanılan bir çerçeve olarak, bazı insanlar için anlamlı içgörüler sunabilmektedir. Astroloji ve sembolizm gibi kadim sistemlerle benzer bir konumda değerlendirilir.",
  },
];

const faqItems = [
  {
    q: "Numeroloji nedir, nasıl çalışır?",
    a: "Numeroloji, sayıların mistik ve sembolik anlamlarını inceleyen kadim bir sistemdir. Doğum tarihi ve isim gibi kişisel verileri sayılara dönüştürerek kişilik, yaşam amacı ve potansiyel hakkında içgörüler sunar. Pythagorasçı numeroloji en yaygın kullanılan sistemdir.",
  },
  {
    q: "Hangi sayı en güçlüdür?",
    a: "Numerolojide hiçbir sayı diğerinden 'daha iyi' veya 'daha güçlü' değildir. Her sayının kendine özgü güçlü yanları ve zorlukları vardır. Usta sayılar (11, 22, 33) yüksek enerji taşısa da bu aynı zamanda büyük zorluklara da işaret eder.",
  },
  ...dinSorulari,
  {
    q: "Aynı yaşam yolu sayısına sahip herkes aynı mı?",
    a: "Hayır. Yaşam yolu sayısı tek bir numeroloji bileşenidir. Kader sayısı, ruh arzusu sayısı, kişisel yıl ve doğum günü sayısı gibi diğer faktörler her kişinin profilini benzersiz kılar. Ayrıca kültürel arka plan, yetiştiriliş tarzı ve kişisel seçimler sayıların ifadesini şekillendirir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Numerolojide Sayıların Anlamı — 1'den 9'a Tam Rehber",
      description:
        "Numerolojide 1'den 9'a tüm sayıların anlamı, kişilik özellikleri, güçlü yanlar ve yaşam dersleri.",
      url: "https://kozmograf.com/sayilarin-anlami",
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
        name: "Numeroloji Sayıları",
        description: "1'den 9'a numerolojik sayıların anlamları ve özellikleri",
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

export default function SayilarinAnlami() {
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
                  Tam Rehber
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
              Sayıların
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
              Gizli Anlamı
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
              1'den 9'a kadar her sayı farklı bir enerji, kişilik ve yaşam dersi taşır. Kendi sayınızı bulun, derin anlamını keşfedin.
            </p>

            <div className="fade-up-d5 flex flex-wrap justify-center gap-2">
              {numbers.map((num) => (
                <a
                  key={num.n}
                  href={`#sayi-${num.n}`}
                  className="inline-flex items-center justify-center font-display"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: num.accent + "15",
                    border: `1px solid ${num.accent}40`,
                    color: num.accent,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}
                >
                  {num.n}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAYI REHBERİ */}
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
              ✦ 1'den 9'a Rehber
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
              Her Sayının Profili
            </h2>
            <div className="koz-rule mt-4" style={{ maxWidth: "160px" }} />
          </div>

          <div className="space-y-0">
            {numbers.map((num) => (
              <article
                key={num.n}
                id={`sayi-${num.n}`}
                className="py-10"
                style={{ borderTop: "1px solid var(--koz-border)" }}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-[28%]">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="font-display flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "52px",
                          height: "52px",
                          background: num.accent + "15",
                          border: `2px solid ${num.accent}40`,
                          color: num.accent,
                          fontSize: "1.4rem",
                          fontWeight: 700,
                        }}
                      >
                        {num.n}
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
                          Sayı {num.n} · {num.planet}
                        </p>
                        <h3
                          className="font-display"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            fontStyle: "italic",
                            color: "#EAE6FF",
                            lineHeight: 1.1,
                          }}
                        >
                          {num.title}
                        </h3>
                      </div>
                    </div>
                    <div className="pl-[64px] space-y-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: num.accent,
                        }}
                      >
                        {num.keyword}
                      </p>
                      <div className="flex gap-3">
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--koz-text-faint)",
                            background: "var(--koz-surface)",
                            border: "1px solid var(--koz-border)",
                            padding: "2px 8px",
                          }}
                        >
                          {num.element}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--koz-text-faint)",
                            background: "var(--koz-surface)",
                            border: "1px solid var(--koz-border)",
                            padding: "2px 8px",
                          }}
                        >
                          {num.color}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-[72%] space-y-4">
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--koz-text-muted)",
                        lineHeight: 1.8,
                      }}
                    >
                      {num.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div
                        className="p-4"
                        style={{
                          background: num.accent + "08",
                          border: `1px solid ${num.accent}25`,
                          borderLeft: `3px solid ${num.accent}`,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: num.accent,
                            marginBottom: "0.6rem",
                          }}
                        >
                          Güçlü Yanlar
                        </p>
                        <ul className="space-y-1">
                          {num.strengths.map((s, i) => (
                            <li
                              key={i}
                              style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.6 }}
                            >
                              · {s}
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
                            marginBottom: "0.6rem",
                          }}
                        >
                          Zorluklar
                        </p>
                        <ul className="space-y-1">
                          {num.challenges.map((c, i) => (
                            <li
                              key={i}
                              style={{ fontSize: "12px", color: "var(--koz-text-muted)", lineHeight: 1.6 }}
                            >
                              · {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div
                        className="flex-1 min-w-[160px] p-3"
                        style={{
                          background: "var(--koz-card)",
                          border: "1px solid var(--koz-border)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--koz-text-faint)",
                            marginBottom: "0.3rem",
                          }}
                        >
                          Yaşam Dersi
                        </p>
                        <p style={{ fontSize: "12px", color: "#EAE6FF", fontStyle: "italic" }}>
                          {num.lifeLesson}
                        </p>
                      </div>
                      <div
                        className="flex-1 min-w-[120px] p-3"
                        style={{
                          background: "var(--koz-card)",
                          border: "1px solid var(--koz-border)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--koz-text-faint)",
                            marginBottom: "0.3rem",
                          }}
                        >
                          Uyumlu Sayılar
                        </p>
                        <p style={{ fontSize: "13px", color: num.accent, fontWeight: 700 }}>
                          {num.bestMatch}
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

      {/* SSS — Din soruları dahil */}
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
              Numeroloji Hakkında
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

      {/* İSTATİSTİK & KAYNAK BLOĞU */}
      <section
        style={{
          background: "var(--koz-void)",
          borderTop: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl py-16">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
            }}
          >
            ✦ Numeroloji Hakkında Bilgiler
          </span>
          <h2
            className="font-display mt-3 mb-8"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EAE6FF",
            }}
          >
            Sayılar ve Kişilik: Ne Kadar Bilinçli Yaklaşılıyor?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                stat: "%72",
                label: "Farkındalık Arayanlar",
                desc: "Pew Research Center verilerine göre yetişkinlerin %72'si spiritüel anlam arayışında kişilik sistemlerini (astroloji, numeroloji vb.) kullandığını belirtmektedir.",
                source: "Pew Research Center, 2023",
                sourceUrl: "https://www.pewresearch.org/religion/2023/11/27/spirituality-among-americans/",
                accent: "#7C3AED",
              },
              {
                stat: "4.000+",
                label: "Yıllık Geçmiş",
                desc: "Numeroloji, Pisagor'un (MÖ 570-495) matematik felsefesine ve Babil, Mısır ile İbrani geleneklerine dayanan 4.000 yılı aşkın bir geçmişe sahiptir.",
                source: "Encyclopedia Britannica",
                sourceUrl: "https://www.britannica.com/topic/numerology",
                accent: "#F5C842",
              },
              {
                stat: "9",
                label: "Temel Arketip",
                desc: "Pythagorasçı numeroloji sisteminde 1'den 9'a kadar her sayı, evrensel bir insan arketipini temsil eder. Tüm çok basamaklı sayılar bu 9 temel enerjiden birine indirgenir.",
                source: "Pythagoras, MÖ 6. yüzyıl",
                sourceUrl: "https://www.britannica.com/biography/Pythagoras",
                accent: "#10B981",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--koz-card)",
                  border: `1px solid ${item.accent}25`,
                  borderTop: `3px solid ${item.accent}`,
                  padding: "20px",
                }}
              >
                <p
                  className="font-display"
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    color: item.accent,
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.stat}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#EAE6FF",
                    marginBottom: "8px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--koz-text-muted)",
                    lineHeight: 1.7,
                    marginBottom: item.sourceUrl ? "8px" : 0,
                  }}
                >
                  {item.desc}
                </p>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "10px",
                      color: item.accent,
                      opacity: 0.7,
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ↗ {item.source}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--koz-card)",
              border: "1px solid var(--koz-border)",
              borderLeft: "3px solid #F5C842",
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F5C842",
                marginBottom: "10px",
              }}
            >
              Sayıların Matematiksel Özelliği
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--koz-text-muted)",
                lineHeight: 1.8,
              }}
            >
              9 sayısının eşsiz bir matematiksel özelliği vardır: 9 ile çarpılan her tam sayının rakamları toplandığında yeniden 9 elde edilir (örneğin 9×8=72, 7+2=9). Bu nedenle 9, numerolojide "tamamlanma ve döngünün kapanması"nın evrensel sembolü olarak kabul edilir. Benzer şekilde, herhangi bir sayıya 9 eklenip tekrar indirgeme yapıldığında başlangıç sayısına dönülür — bu özellik, numerolojinin matematiksel tutarlılığının temel dayanaklarından biridir.
            </p>
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
            ✦ Sayını Keşfet
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
              maxWidth: "400px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            Doğum tarihinle hangi enerjiyi taşıdığını öğren.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="koz-btn-primary">
              <Sparkles className="w-4 h-4" />
              Ücretsiz Analiz Al
            </Link>
            <Link
              href="/usta-sayilar"
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
              Usta Sayılar (11·22·33)
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}