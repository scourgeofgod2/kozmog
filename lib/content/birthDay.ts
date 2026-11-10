// Doğum günü sayısı: ayın kaçında doğduğun (1–31). Her gün kendi tonunu
// taşır; tek basamağa indirgenmiş hali kök enerjisidir.

export const birthDayNotes: Record<number, string> = {
  1: "Saf öncü enerjisi. Kendi yolunu çizer, ilk adımı atmaktan çekinmezsin.",
  2: "İnce bir sezgi ve diplomasi. İnsanları bir araya getirmekte ustasın.",
  3: "Neşeli ve dışa dönük. Sözlerin ve yaratıcılığın seni öne çıkarır.",
  4: "Güvenilir ve düzenli. Başladığın işi sağlam bir şekilde bitirirsin.",
  5: "Meraklı ve hareketli. Değişim seni korkutmaz, besler.",
  6: "Sıcak ve koruyucu. Çevrendekilere kendini evinde hissettirirsin.",
  7: "Derin düşünür. Yüzeyin altını görmek, analiz etmek senin doğanda.",
  8: "Hırslı ve yönetici. Kaynakları ve insanları organize etme yeteneğin güçlü.",
  9: "Şefkatli ve idealist. Büyük resmi görür, başkalarına ilham verirsin.",
  10: "1'in liderliği 0'ın potansiyeliyle güçlenir. Kendine güvenin bulaşıcıdır.",
  11: "Usta sayı günü. Sezgilerin çok güçlü; ilham veren bir kişiliğin var.",
  12: "Yaratıcı ve ifadeci. Fikirlerini sanatsal ya da esprili bir dille aktarırsın.",
  13: "Çalışkan ve kararlı. Karmik 13 taşırsın: emek ve düzen ile parlarsın.",
  14: "Özgür ruhlu ve çok yönlü. Karmik 14 taşırsın: ölçülülük senin dersin.",
  15: "Sevgi dolu ve çekici. Aile ve yakın çevren hayatının merkezinde.",
  16: "Sezgisel ve içe dönük. Karmik 16 taşırsın: yeniden doğuşlarla güçlenirsin.",
  17: "Güçlü bir iş zekâsı ve bağımsızlık. Kendi imparatorluğunu kurmak istersin.",
  18: "Merhametli ve vizyoner. İnsanlığa hizmet eden işlerde anlam bulursun.",
  19: "Bağımsız ve kararlı. Karmik 19 taşırsın: yardım istemeyi öğrenmek dersin.",
  20: "Hassas ve uyumlu. Ekip içinde birleştirici, sessiz bir güçsün.",
  21: "Sosyal ve parlak. Yaratıcılığın insanlarla buluştuğunda en iyi halini alır.",
  22: "Usta inşaatçı günü. Büyük hayalleri somut gerçeklere dönüştürme gücün var.",
  23: "Hızlı düşünen ve iletişimci. Seyahat ve yenilik hayatına renk katar.",
  24: "Sadık ve sorumluluk sahibi. Ev ve ilişkilerinde huzur yaratırsın.",
  25: "Analitik ve sezgisel. Gözlemlerin keskin, iç dünyan zengindir.",
  26: "Pratik ve yönetici. İş ile aileyi dengeli şekilde büyütürsün.",
  27: "Bilge ve hümanist. Öğretmen ruhlu, ilham veren bir kişiliğin var.",
  28: "Bağımsız lider ama işbirliğine açık. Yeni fikirleri hayata geçirirsin.",
  29: "11'in yoğun sezgisi. Duygusal derinliğin ve ilham gücün yüksek.",
  30: "Yaratıcı ve sosyal. Kendini ifade ettikçe hayat sana kapılar açar.",
  31: "Disiplinli ve yaratıcı. Pratik zekânı özgün fikirlerle birleştirirsin.",
};

export function birthDayRoot(day: number): number {
  if (day === 11 || day === 22) return day;
  let n = day;
  while (n > 9) n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  return n;
}
