// Karmik borç sayıları 13, 14, 16, 19.

export interface KarmicDebt {
  n: number;
  reduces: number;
  title: string;
  lesson: string;
  signs: string[];
  path: string;
}

export const karmicDebts: KarmicDebt[] = [
  {
    n: 13,
    reduces: 4,
    title: "Emek ve Disiplin Borcu",
    lesson:
      "13/4, geçmişte kolay yolu seçmenin ya da emekten kaçmanın dersini taşır. Bu hayatta başarı, sabırlı ve düzenli çalışmayla gelir; kısa yollar genellikle geri teper.",
    signs: ["İşlerin sürekli yarıda kalması", "Erteleme ve odak kaybı", "Emeğin karşılığını geç almak"],
    path: "Rutin kur, küçük ama düzenli adımlarla ilerle. Bitirdiğin her iş bu borcu hafifletir.",
  },
  {
    n: 14,
    reduces: 5,
    title: "Özgürlük ve Ölçülülük Borcu",
    lesson:
      "14/5, özgürlüğün kötüye kullanılmasının dersini taşır. Bu hayatta değişim ve heyecan isteği ile sorumluluk ve ölçülülük arasında denge kurmak öğrenilir.",
    signs: ["Ani ve düşünülmemiş kararlar", "Bağımlılık eğilimleri", "Sık değişen planlar ve ilişkiler"],
    path: "Özgürlüğünü korurken sınır koy. Esneklik ile istikrar arasında bilinçli seçimler yap.",
  },
  {
    n: 16,
    reduces: 7,
    title: "Ego ve Yeniden Doğuş Borcu",
    lesson:
      "16/7, kibir ve egonun dersini taşır. Hayat zaman zaman kurduğun yapıları yıkarak seni daha sahici bir temele çağırır. Her yıkım bir yeniden doğuşa kapı açar.",
    signs: ["Ani kayıplar ya da beklenmedik değişimler", "İlişkilerde güven sınavları", "Kendini yeniden inşa etme ihtiyacı"],
    path: "Alçakgönüllülük ve içsel farkındalık. Ruhsal pratikler ve dürüstlük bu yolu kolaylaştırır.",
  },
  {
    n: 19,
    reduces: 1,
    title: "Bağımsızlık ve Paylaşım Borcu",
    lesson:
      "19/1, gücün bencilce kullanılmasının dersini taşır. Bu hayatta kendi ayakların üzerinde durmayı öğrenirken yardım istemeyi ve almayı da öğrenirsin.",
    signs: ["Her şeyi tek başına yapma ısrarı", "Yalnız kalma hissi", "Yardım istemekte zorlanmak"],
    path: "Bağımsızlığını koru ama başkalarına da alan aç. Destek istemek zayıflık değildir.",
  },
];
