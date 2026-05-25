import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ChevronRight, Clock } from "lucide-react";
import LastUpdated from "@/components/ui/LastUpdated";

export const metadata: Metadata = {
  title: "Saatlerin Anlamı — 11:11, 22:22, 00:00 Çift Saatlerin Numerolojik Mesajları",
  description: "11:11 anlamı nedir? 22:22, 00:00, 01:01 ve tüm çift saatlerin numerolojik ve spiritüel mesajlarını öğrenin. Saat anlamları rehberi: tekrarlayan sayılar, melek sayıları ve evrenin mesajları. Ücretsiz.",
  keywords: "11:11 anlamı, saat 11:11 ne demek, çift saatler anlamı, 22:22 anlamı, 00:00 anlamı, saatlerin anlamı numeroloji, melek sayıları saatler, tekrarlayan saatler anlamı, 01:01 anlamı, 03:03 anlamı",
  alternates: { canonical: "https://kozmograf.com/saat-anlami" },
  openGraph: {
    title: "11:11 Anlamı, Çift Saatler ve Melek Sayıları — Numeroloji Saat Rehberi | Kozmograf",
    description: "11:11, 22:22, 00:00 ve tüm çift saatlerin numerolojik mesajları. Tekrarlayan saatler ve melek sayılarının spiritüel anlamları. Ücretsiz rehber.",
    url: "https://kozmograf.com/saat-anlami",
  },
};

const mirrorHours = [
  {
    time: "00:00",
    digit: 0,
    accent: "#C4B5FD",
    title: "Sonsuzluk Kapısı",
    message:
      "Tüm potansiyelin sıfır noktası. Yeni bir döngünün başlangıcı ve evrenin sana 'her şey mümkün' dediği an. Niyetini temizle, yeni başlangıçlar için alan aç.",
    angel: "Evrenden boş bir sayfa sana sunuluyor. Ne yaratmak istiyorsun?",
    numerology: "0 sayısı tüm sayıların kaynağı, sonsuzluk ve tam dönüşüm enerjisi taşır.",
  },
  {
    time: "01:01",
    digit: 1,
    accent: "#F5C842",
    title: "Yeni Başlangıç",
    message:
      "Liderlik, bağımsızlık ve yeni adımların zamanı. Aklındaki düşünceler gerçeğe dönüşmeye hazır — dikkatli ol, neye odaklanıyorsun?",
    angel: "Cesur ol. Hayalinin peşinden git. Evren seni destekliyor.",
    numerology: "01:01 → 1+1=2, 1 sayısının gücünü 2'nin işbirliği enerjisiyle birleştiriyor.",
  },
  {
    time: "02:02",
    digit: 2,
    accent: "#818CF8",
    title: "İlişki & Denge",
    message:
      "Sabır ve güven zamanı. Bir ortaklık ya da ilişki konusunda mesaj alıyorsun. Dengeyi bul, yalnız hareket etme.",
    angel: "Güven ver, güven al. Yanındaki insanlara değer ver.",
    numerology: "02:02 → 2+2=4, denge ve sağlam temeller enerjisi.",
  },
  {
    time: "03:03",
    digit: 3,
    accent: "#FB923C",
    title: "Yaratıcı İfade",
    message:
      "Yaratıcılığını, sesini ve özgün ifadeni dünyayla paylaşmanın zamanı. Sanat, yazı, müzik — ne seni neşelendiriyorsa ona zaman ayır.",
    angel: "İfade et, paylaş, neşeyi yay. Yarattıklarının değeri var.",
    numerology: "03:03 → 3+3=6, yaratıcılık ve şefkat enerjisi.",
  },
  {
    time: "04:04",
    digit: 4,
    accent: "#34D399",
    title: "Sağlam Temel",
    message:
      "Çalışkanlık ve disiplinin karşılığını alacaksın. Sabırla inşa ettiğin her şey meyvesini verecek. Vazgeçme.",
    angel: "Adım adım devam et. Sağlam temeller büyük yapıları taşır.",
    numerology: "04:04 → 4+4=8, güç ve maddi manifestasyon enerjisi.",
  },
  {
    time: "05:05",
    digit: 5,
    accent: "#38BDF8",
    title: "Değişim Kapısı",
    message:
      "Büyük bir değişim yaklaşıyor. Eski alışkanlıkları bırak, yeniye hazırlan. Bu dönüşüm senin iyiliğin için.",
    angel: "Değişimden korkma. Kapılar açılıyor.",
    numerology: "05:05 → 5+5=10→1, dönüşüm ve yeni başlangıç enerjisi.",
  },
  {
    time: "06:06",
    digit: 6,
    accent: "#F472B6",
    title: "Sevgi & Uyum",
    message:
      "Ev, aile ve sevgi ilişkilerinde denge arama zamanı. Başkalarına verirken kendinizi de ihmal etmeyin.",
    angel: "Koşulsuz sevgi ver ve al. Şefkat güçtür.",
    numerology: "06:06 → 6+6=12→3, sevgi ve yaratıcı ifade enerjisi.",
  },
  {
    time: "07:07",
    digit: 7,
    accent: "#A78BFA",
    title: "Ruhsal Uyanış",
    message:
      "Sezgine güven. İçsel bilgeliğin sana rehberlik etmeye hazır. Meditasyon, günlük tutma ya da sessizlikte zaman geçir.",
    angel: "Cevaplar içindedir. Sessizleş ve dinle.",
    numerology: "07:07 → 7+7=14→5, ruhsal derinlik ve özgürlük enerjisi.",
  },
  {
    time: "08:08",
    digit: 8,
    accent: "#F97316",
    title: "Bolluk & Güç",
    message:
      "Maddi ve ruhsal bolluk frekansı. Para, kariyer ve güç konularında olumlu gelişmeler kapıda. Büyük düşün.",
    angel: "Hak ediyorsun. Al.",
    numerology: "08:08 → 8+8=16→7, güç ve ruhsal bilgelik enerjisi.",
  },
  {
    time: "09:09",
    digit: 9,
    accent: "#10B981",
    title: "Tamamlanma",
    message:
      "Bir döngü kapanıyor. Bırak gitsin. Eskiye tutunmak yerine minnetle uğurla — yeni alan açılıyor.",
    angel: "Bırakmak kaybetmek değil, yer açmaktır.",
    numerology: "09:09 → 9+9=18→9, tamamlanma ve evrensel sevgi enerjisi.",
  },
  {
    time: "10:10",
    digit: 1,
    accent: "#FCD34D",
    title: "Manifestasyon",
    message:
      "Düşüncelerin son derece güçlü. 10:10 gördüğünde pozitif kalın, negatif düşüncelerden uzak durun — çünkü hızla gerçeğe dönüşüyorlar.",
    angel: "Ne düşünüyorsan o oluyorsun. Dikkatli ol.",
    numerology: "10:10 → 1+0+1+0=2, birlik ve denge enerjisi.",
  },
  {
    time: "11:11",
    digit: 11,
    accent: "#C4B5FD",
    title: "Uyanış Kapısı",
    message:
      "En güçlü ve en sık görülen senkronisite. Evren seninle tam temas halinde. Ruhsal uyanışın zamanı — bu anı fark et, niyetini netleştir.",
    angel: "Düşüncelerini izle. Arzuların manifestasyona çok yakın.",
    numerology: "11:11 usta sayı enerjisi — ruhsal uyanış, sezgi ve ilham kapısı.",
    isSpecial: true,
  },
  {
    time: "12:12",
    digit: 3,
    accent: "#FB923C",
    title: "İlerleme & Güven",
    message:
      "Doğru yoldasın. Tereddütlerini bir kenara bırak ve ilerlemeye devam et. Evren senin adımlarını destekliyor.",
    angel: "Güven. Mükemmel zamanda mükemmel yerde oluyorsun.",
    numerology: "12:12 → 1+2+1+2=6, sevgi ve sorumluluk enerjisi.",
  },
  {
    time: "13:13",
    digit: 4,
    accent: "#34D399",
    title: "Dönüşüm Çalışması",
    message:
      "13 şans değil, dönüşüm sayısıdır. Köklü bir değişim için çalışmanın zamanı. Eski kalıpları kır.",
    angel: "Eski sürümünün ölümü, yeni sürümünün doğumudur.",
    numerology: "13:13 → 1+3+1+3=8, güç ve dönüşüm enerjisi.",
  },
  {
    time: "14:14",
    digit: 5,
    accent: "#38BDF8",
    title: "Özgürlük Mesajı",
    message:
      "Seni kısıtlayan her şeyden özgürleşme zamanı. Macera ve değişim kapıda bekliyor.",
    angel: "Bağlarını çöz. Özgürsün.",
    numerology: "14:14 → 1+4+1+4=10→1, özgürlük ve yeni başlangıç enerjisi.",
  },
  {
    time: "15:15",
    digit: 6,
    accent: "#F472B6",
    title: "Sevgi Frekansı",
    message:
      "Kalp enerjisi zirveye çıkıyor. Sevgi ilişkileri, romantizm ve şefkat konularında güçlü bir mesaj var.",
    angel: "Kalbin söylediğini dinle.",
    numerology: "15:15 → 1+5+1+5=12→3, sevgi ve ifade enerjisi.",
  },
  {
    time: "16:16",
    digit: 7,
    accent: "#A78BFA",
    title: "İçsel Bilgelik",
    message:
      "Dışarıya bakma, içeriye bak. Sorularının cevapları sezginde saklı. Meditasyon ve yalnız zaman öneriliyor.",
    angel: "Sustuğunda duyacaksın.",
    numerology: "16:16 → 1+6+1+6=14→5, ruhsal araştırma ve değişim enerjisi.",
  },
  {
    time: "17:17",
    digit: 8,
    accent: "#F97316",
    title: "Zafer & Tanınma",
    message:
      "Çabalarının tanınacağı bir dönem geliyor. Kendine güven — başarın hak edilmiş.",
    angel: "Işığını saklamaın. Öne çık.",
    numerology: "17:17 → 1+7+1+7=16→7, zafer ve ruhsal olgunluk enerjisi.",
  },
  {
    time: "18:18",
    digit: 9,
    accent: "#10B981",
    title: "Hizmet & Empati",
    message:
      "Başkalarına hizmet etme enerjisi güçlü. Yardım et, paylaş, bağış yap — ne verirsen o geri gelir.",
    angel: "Verenin eli hiç boş kalmaz.",
    numerology: "18:18 → 1+8+1+8=18→9, hizmet ve tamamlanma enerjisi.",
  },
  {
    time: "19:19",
    digit: 1,
    accent: "#F5C842",
    title: "Lider Enerjisi",
    message:
      "Kendi yolunu çizmenin zamanı. Başkalarının onayına ihtiyacın yok — kendi otoriteni sahiplen.",
    angel: "Lider olarak doğdun. Bunu hatırla.",
    numerology: "19:19 → 1+9+1+9=20→2, liderlik ve denge enerjisi.",
  },
  {
    time: "20:20",
    digit: 2,
    accent: "#818CF8",
    title: "Güven & Sabır",
    message:
      "Her şey zamanında gelecek. Aceleci kararlar verme — sabır ve güven en büyük gücündür şu an.",
    angel: "Zamanlama mükemmel. Güven.",
    numerology: "20:20 → 2+0+2+0=4, sabır ve sağlam zemin enerjisi.",
  },
  {
    time: "21:21",
    digit: 3,
    accent: "#FB923C",
    title: "Umut & Neşe",
    message:
      "Pozitif enerjinin en güçlü olduğu an. Dileklerini yaz, hayallerini canlandır. Umut mucize yaratır.",
    angel: "İyimser ol. En güzel şeyler yolda.",
    numerology: "21:21 → 2+1+2+1=6, umut ve sevgi enerjisi.",
  },
  {
    time: "22:22",
    digit: 22,
    accent: "#FCD34D",
    title: "Usta İnşaatçı",
    message:
      "22 usta sayısının tam enerjisi. Hayallerini somutlaştırmak için evren sana güç veriyor. Büyük düşün, adım at.",
    angel: "Seni destekleyen görünmez bir güç var. Korkma, inşa et.",
    numerology: "22:22 usta sayı enerjisi — manifestasyon, inşa etme ve büyük vizyonlar.",
    isSpecial: true,
  },
  {
    time: "23:23",
    digit: 5,
    accent: "#38BDF8",
    title: "Son Mesaj",
    message:
      "Günün son senkronisite fırsatı. Değişime açık ol, yarın farklı olacak. Geceyi minnetle kapat.",
    angel: "Her son yeni bir başlangıcın habercisidir.",
    numerology: "23:23 → 2+3+2+3=10→1, değişim ve yeni döngü enerjisi.",
  },
];

const faqItems = [
  {
    q: "Çift saatleri görmek ne anlama gelir?",
    a: "Çift saatler (11:11, 22:22 gibi) numerolojide 'senkronisite' olarak adlandırılır. Carl Jung'un tanımladığı bu kavrama göre, anlamlı tesadüfler evrenin bize bir mesaj gönderdiğinin işareti olabilir. Numeroloji perspektifinden çift saatler, ilgili sayının enerjisinin yoğunlaştığı anlardır.",
  },
  {
    q: "11:11 görmek ne anlama gelir?",
    a: "11:11, en güçlü senkronisite anlarından biri olarak kabul edilir. Numerolojide 11 usta sayısının enerjiyle yüklendiği bu an, ruhsal uyanış, sezgi ve manifestasyon kapısı olarak yorumlanır. Bu anı fark ettiğinizde niyetinizi netleştirmeniz ve olumlu düşünceler tutmanız önerilir.",
  },
  {
    q: "Saatlerdeki sayılar gerçekten bir anlam taşıyor mu?",
    a: "Bu, kişisel inanca bağlı bir sorudur. Bilimsel olarak kanıtlanmış bir sistem değildir; ancak sayı sembolizmi binlerce yıllık kadim bir gelenektir. Psikolojik açıdan, bu saatlere dikkat etmek öz-farkındalık ve niyete odaklanmak için bir araç olarak kullanılabilir.",
  },
  {
    q: "Her gün aynı saati görmek ne anlama gelir?",
    a: "Tekrarlayan saat görüntüleri, bilinçdışınızın o sayının enerjisiyle rezonans halinde olduğunun işareti olarak yorumlanır. Numeroloji perspektifinde, o sayının taşıdığı tema hayatınızda aktif bir rol oynuyor olabilir. Bu örüntüyü fark etmek, o alanda bir mesaj almak anlamına gelebilir.",
  },
  {
    q: "Melek sayıları nedir?",
    a: "Melek sayıları (angel numbers), tekrar eden sayı dizileri — özellikle saat formatında görülenler — için kullanılan popüler bir terimdir. 111, 222, 333, 444, 555 gibi diziler de bu kapsamda değerlendirilir. Numeroloji ve ruhsal geleneklerin kesişim noktasında yer alır.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Saatlerin Numerolojik Anlamı — Çift Saatler ve Mesajları",
      description:
        "11:11, 22:22, 00:00 ve tüm çift saatlerin numerolojik anlamı. Her saatin taşıdığı enerji ve mesaj.",
      url: "https://kozmograf.com/saat-anlami",
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
        name: "Saatlerin Numerolojik Anlamı",
        description: "Çift saatler ve tekrar eden saat rakamlarının numerolojik yorumu",
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

export default function SaatAnlami() {
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
                  Melek Sayıları & Senkronisite
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
              Saatlerin
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
              Gizli Mesajı
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
              Telefona baktığınızda tekrar tekrar 11:11 ya da 22:22 görüyor musunuz? Bu rastlantı değil — evrenin size gönderdiği bir mesaj. Tüm çift saatlerin numerolojik anlamını öğrenin.
            </p>

            <div
              className="fade-up-d5 inline-flex items-center gap-3 px-5 py-3"
              style={{
                border: "1px solid rgba(196,181,253,0.3)",
                background: "rgba(196,181,253,0.05)",
              }}
            >
              <Clock className="w-4 h-4" style={{ color: "#C4B5FD" }} />
              <span
                style={{
                  color: "var(--koz-text-muted)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                00:00'dan 23:23'e 24 Saat Rehberi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SAAT REHBERİ */}
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
              ✦ Saat Rehberi
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
              Her Saatin Mesajı
            </h2>
            <div className="koz-rule mt-4" style={{ maxWidth: "160px" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {mirrorHours.map((hour) => (
              <article
                key={hour.time}
                className="p-5"
                style={{
                  background: hour.isSpecial ? hour.accent + "0A" : "var(--koz-card)",
                  border: `1px solid ${hour.isSpecial ? hour.accent + "40" : "var(--koz-border)"}`,
                  borderLeft: `3px solid ${hour.accent}`,
                  position: "relative",
                }}
              >
                {hour.isSpecial && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: hour.accent,
                      background: hour.accent + "15",
                      padding: "2px 8px",
                    }}
                  >
                    USTA SAYI
                  </div>
                )}

                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="font-display flex-shrink-0"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: hour.accent,
                      letterSpacing: "0.04em",
                      minWidth: "56px",
                    }}
                  >
                    {hour.time}
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
                      {hour.title}
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--koz-text-muted)",
                    lineHeight: 1.7,
                    marginBottom: "0.75rem",
                  }}
                >
                  {hour.message}
                </p>

                <div
                  className="p-3"
                  style={{
                    background: hour.accent + "08",
                    border: `1px solid ${hour.accent}20`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: hour.accent,
                      marginBottom: "0.3rem",
                    }}
                  >
                    Mesaj
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#EAE6FF",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}
                  >
                    "{hour.angel}"
                  </p>
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--koz-text-faint)",
                    lineHeight: 1.6,
                    marginTop: "0.75rem",
                  }}
                >
                  {hour.numerology}
                </p>
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
              Saatlerin Anlamı Hakkında
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
            ✦ Daha Derin Keşfet
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
            Yaşam Yolu Sayını Öğren
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
            Saatlerdeki mesajlar, kendi sayı enerjinle birleşince çok daha anlamlı hale gelir.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="koz-btn-primary">
              <Sparkles className="w-4 h-4" />
              Ücretsiz Analiz Al
            </Link>
            <Link
              href="/sayilarin-anlami"
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
              Sayıların Anlamı
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}