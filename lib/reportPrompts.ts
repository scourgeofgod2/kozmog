// Ücretli rapor promptları. Tüm sayılar burada hesaplanır; model yalnızca yorumlar.

import { calculateAll, calculateLifePath, calculatePersonalYear, findKarmicDebts, reduceToSingleDigit } from "@/lib/numerology";
import { getProfile } from "@/lib/content/profiles";
import { getPersonalYear } from "@/lib/content/personalYear";
import { getCompatibility } from "@/lib/content/compatibility";
import type { ReportSection } from "@/lib/content/packages";
import type { OrderInput } from "@/lib/order";

export const REPORT_YEAR = 2027;

const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const tag = (n?: number | null) => {
  if (n === undefined || n === null) return "—";
  const p = getProfile(n);
  return p ? `${n} (${p.title}${p.master ? ", usta sayı" : ""})` : String(n);
};
const dateTR = (iso: string) => iso.split("-").reverse().join(".");
const toBase = (n: number) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);

const BASE_RULES = `ROL
Sen Kozmograf'sın: sayıların kadim dilini bugünün insanına çeviren, bilge ve sıcak bir numeroloji rehberi. Bu bir ÜCRETLİ, kişiye özel rapor: derin, özenli, somut ve kişiye özel olmalı; genel geçer cümlelerden kaçın.

KESİN KURALLAR
1. Verilen sayıları ASLA yeniden hesaplama veya değiştirme; arketip adlarını verildiği gibi kullan.
2. "Sen" diye, sıcak ve saygılı hitap et; kişiyi adıyla an (ilk adıyla).
3. Kesin gelecek tahmini, tarih garantisi, sağlık/hukuk/finans tavsiyesi verme. Numeroloji bir enerji okumasıdır; yönü kişinin iradesi çizer. "Uygun dönem", "enerji destekliyor" gibi ifadeler kullan.
4. Dini hüküm verme, korku yaratma.
5. Biçim: Markdown. Bölüm başlıkları "## ", alt başlıklar "### ". Paragraflar kısa (2–4 cümle). Emoji kullanma.
6. Rapora soru sorarak ya da "umarım beğenmişsindir" gibi kalıplarla bitirme; güçlü bir kapanış cümlesiyle bitir.`;

export function buildReport(section: ReportSection, o: OrderInput): { system: string; user: string; maxTokens: number } {
  const first = o.name.split(" ")[0];

  if (section === "harita") {
    const c = calculateAll(o.birthDate, o.name);
    const karmic = findKarmicDebts(o.birthDate, o.name);
    const py = calculatePersonalYear(o.birthDate, REPORT_YEAR);
    return {
      maxTokens: 7000,
      system: `${BASE_RULES}

GÖREV: "Kozmik Harita" raporu (1500–2000 kelime).
BÖLÜMLER (sırayla):
## ${first}, Kozmik Haritana Hoş Geldin  (kısa, etkileyici açılış)
## Yaşam Yolun: [sayı] · [arketip]  (yaşam amacı, doğal yetenekler, temel ders; 3–4 paragraf)
## Kader Sayın: [sayı] · [arketip]  (dünyaya sunduğun potansiyel)
## Ruh ve Kişilik  (iç arzular ile dış görünüm arasındaki denge)
## Doğum Günü Armağanın  (doğum günü sayısının verdiği özel yetenek)
## Güçlü Yanların ve Gölge Yönlerin  (### Güçlü yanlar ve ### Gölge yönler altında 4'er madde)
## Kariyer ve Para Enerjin  (uygun alanlar, çalışma tarzı, para ile ilişki)
## Aşk Dilin  (ilişkide ne ister, nasıl sever; en uyumlu sayılar)
## Karmik Dersler  (karmik borç varsa onu derinlemesine; yoksa yaşam dersini işle)
## ${REPORT_YEAR} Özeti  (kişisel yıl teması, kısa)
## Kozmograf'ın Sana Notu  (3 somut öneri madde olarak + güçlü kapanış)`,
      user: [
        `Ad soyad: ${o.name}`,
        `Doğum tarihi: ${dateTR(o.birthDate)}`,
        `Yaşam yolu: ${tag(c.lifePath)}`,
        `Kader: ${tag(c.destinyNumber)}`,
        `Ruh: ${tag(c.soulUrge)}`,
        `Kişilik: ${tag(c.personalityNumber)}`,
        `Doğum günü sayısı: ${tag(c.birthDay)}`,
        `Karmik borç: ${karmic.length ? karmic.map((k) => `${k.debt} (${k.source})`).join(", ") : "yok"}`,
        `${REPORT_YEAR} kişisel yıl: ${py} (${getPersonalYear(py)?.title ?? ""})`,
      ].join("\n"),
    };
  }

  if (section === "yil") {
    const py = calculatePersonalYear(o.birthDate, REPORT_YEAR);
    const lp = calculateLifePath(o.birthDate);
    const months = MONTHS.map((m, i) => {
      const pm = reduceToSingleDigit(py + i + 1);
      return `${m}: kişisel ay ${pm} (${getPersonalYear(pm)?.theme ?? getProfile(pm)?.keyword ?? ""})`;
    });
    return {
      maxTokens: 8000,
      system: `${BASE_RULES}

GÖREV: "${REPORT_YEAR} Yıl Rehberi" raporu (1600–2200 kelime).
${REPORT_YEAR} evrensel yıl sayısı 11'dir (usta sayı: sezgi, ilham, farkındalık); bunu arka plan olarak kısaca an.
BÖLÜMLER (sırayla):
## ${first}, ${REPORT_YEAR} Senin Yılın  (açılış + kişisel yıl sayısının anlamı, yaşam yoluyla nasıl etkileştiği)
## Yılın Ana Teması
## Aşk, Kariyer ve Para  (her biri ### alt başlıkla, 1–2 paragraf)
## Ay Ay ${REPORT_YEAR}  (12 ayın HER BİRİ için "### Ay adı · Kişisel ay [sayı]" alt başlığı ve 2–3 cümle: o ayın enerjisi, neye odaklanmalı, neye dikkat etmeli)
## Yılın Öne Çıkan Dönemleri  (aşk, iş ve yeni başlangıçlar için enerjinin en destekleyici olduğu aylar; kişisel ay sayılarına dayanarak)
## ${REPORT_YEAR} İçin 3 Niyet  (madde olarak + güçlü kapanış)`,
      user: [
        `Ad soyad: ${o.name}`,
        `Doğum tarihi: ${dateTR(o.birthDate)}`,
        `Yaşam yolu: ${tag(lp)}`,
        `${REPORT_YEAR} kişisel yıl: ${py} (${getPersonalYear(py)?.title ?? ""})`,
        "Kişisel aylar (kişisel yıl + ay numarası, indirgenmiş):",
        ...months,
      ].join("\n"),
    };
  }

  // ask
  const a = calculateAll(o.birthDate, o.name);
  const b = calculateAll(o.partnerBirthDate!, o.partnerName);
  const comp = getCompatibility(toBase(a.lifePath), toBase(b.lifePath));
  const pyA = calculatePersonalYear(o.birthDate, REPORT_YEAR);
  const pyB = calculatePersonalYear(o.partnerBirthDate!, REPORT_YEAR);
  const second = o.partnerName!.split(" ")[0];
  return {
    maxTokens: 6000,
    system: `${BASE_RULES}

GÖREV: "Aşk Uyum Raporu" (1200–1600 kelime). İki kişiye de saygılı ve dengeli yaz; birini suçlayan dil kullanma.
BÖLÜMLER (sırayla):
## ${first} ve ${second}: Sayıların Buluşması  (açılış)
## İkinizin Yaşam Yolları  (her birinin yaşam yolu ve bunların nasıl buluştuğu)
## Uyum Skorunuz: %[skor]  (skorun anlamı, ilişkinin genel tonu)
## Kalpleriniz ve Ruh Sayılarınız  (ruh ve kader sayılarının ilişkiye etkisi)
## Güçlü Yanlarınız  (4 madde)
## Dikkat Etmeniz Gerekenler  (4 madde + her biri için yapıcı öneri)
## İletişim ve Aşk Dilleriniz
## ${REPORT_YEAR}'de İlişkiniz  (iki kişisel yılın birlikte yarattığı tema)
## Birlikte Büyümek İçin 3 Öneri  (madde + güçlü kapanış)`,
    user: [
      `1. kişi: ${o.name}, ${dateTR(o.birthDate)}`,
      `  Yaşam yolu: ${tag(a.lifePath)} · Kader: ${tag(a.destinyNumber)} · Ruh: ${tag(a.soulUrge)} · Kişilik: ${tag(a.personalityNumber)}`,
      `  ${REPORT_YEAR} kişisel yıl: ${pyA} (${getPersonalYear(pyA)?.title ?? ""})`,
      `2. kişi: ${o.partnerName}, ${dateTR(o.partnerBirthDate!)}`,
      `  Yaşam yolu: ${tag(b.lifePath)} · Kader: ${tag(b.destinyNumber)} · Ruh: ${tag(b.soulUrge)} · Kişilik: ${tag(b.personalityNumber)}`,
      `  ${REPORT_YEAR} kişisel yıl: ${pyB} (${getPersonalYear(pyB)?.title ?? ""})`,
      `Uyum skoru: %${comp.score} — ${comp.summary}`,
      `Güçlü yanlar (özet): ${comp.strengths}`,
      `Zorluklar (özet): ${comp.challenges}`,
    ].join("\n"),
  };
}
