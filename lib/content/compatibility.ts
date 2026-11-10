// app/uyumluluk sayfasından taşındı.

export const compatibilityMatrix: Record<number, Record<number, { score: number; summary: string; strengths: string; challenges: string }>> = {
  1: {
    1: { score: 72, summary: "Güçlü ama rekabetçi bir birliktelik", strengths: "Karşılıklı saygı, bağımsızlık, ortak hedefler", challenges: "Ego çatışmaları, liderlik yarışı" },
    2: { score: 88, summary: "Birbirini mükemmel tamamlayan bir çift", strengths: "Lider ve destekçi dengesi, güçlü uyum", challenges: "1'in baskınlığı 2'yi yorabilir" },
    3: { score: 82, summary: "Dinamik, yaratıcı ve eğlenceli bir ilişki", strengths: "Yaratıcılık, enerji, iletişim gücü", challenges: "Sorumluluk paylaşımı zaman zaman sorun çıkarır" },
    4: { score: 65, summary: "Farklı tempolarda ilerleyen bir birliktelik", strengths: "4'ün istikrarı 1'in vizyonunu destekler", challenges: "Esneklik ve hız konusunda anlaşmazlıklar" },
    5: { score: 78, summary: "Özgür ruhların enerjik buluşması", strengths: "Macera, yenilik, özgürlük sevgisi", challenges: "Kararlılık eksikliği, dengesizlik riski" },
    6: { score: 70, summary: "Denge arayan bir ilişki", strengths: "6'nın şefkati 1'i yumuşatır", challenges: "Kontrol çatışmaları, farklı öncelikler" },
    7: { score: 60, summary: "Derin ama zorlu bir bağ", strengths: "Entelektüel uyum, birbirini büyüleme", challenges: "İletişim güçlüğü, duygusal mesafe" },
    8: { score: 85, summary: "Güçlü bir güç ortaklığı", strengths: "Başarı odaklılık, ortak hırslar", challenges: "İkisi de lider olmak ister" },
    9: { score: 75, summary: "İlham verici ve büyütücü bir ilişki", strengths: "9'un vizyonu 1'i dengeler", challenges: "Farklı değer sistemleri" },
  },
  2: {
    2: { score: 80, summary: "Uyumlu, hassas ve dengeli bir birliktelik", strengths: "Derin empati, karşılıklı anlayış", challenges: "Karar almakta güçlük, aşırı uyumluluk" },
    3: { score: 85, summary: "Neşeli ve destekleyici bir çift", strengths: "3'ün neşesi 2'yi açar, güçlü iletişim", challenges: "2'nin duygusal ihtiyaçları bazen karşılanmayabilir" },
    4: { score: 78, summary: "Güvenli ve istikrarlı bir birliktelik", strengths: "Güven, sadakat, uzun vadeli uyum", challenges: "Spontanlık eksikliği" },
    5: { score: 62, summary: "Zıtlıkların çekimi — dikkat gerekli", strengths: "Birbirini tamamlama potansiyeli", challenges: "5'in özgürlük ihtiyacı 2'yi güvensizleştirir" },
    6: { score: 92, summary: "En uyumlu eşleşmelerden biri", strengths: "Şefkat, hizmet, aile değerleri", challenges: "Bazen fazla iç dönük kalabilirler" },
    7: { score: 70, summary: "Sessiz ama derin bir bağ", strengths: "Sezgisel anlayış, ruhsal bağlantı", challenges: "İletişimi söze dökmek zor olabilir" },
    8: { score: 68, summary: "Güç ile şefkatin buluşması", strengths: "8'in başarısı 2'nin desteğiyle pekişir", challenges: "Değer öncelikleri farklılaşabilir" },
    9: { score: 88, summary: "Şefkatli ve idealizmle dolu bir birliktelik", strengths: "Ortak insancıl değerler, derin empati", challenges: "Pratik konularda zorluk" },
  },
  3: {
    3: { score: 76, summary: "Yaratıcı enerjilerin buluşması", strengths: "Yaratıcılık, eğlence, neşe", challenges: "Sorumluluktan kaçınma eğilimi" },
    4: { score: 60, summary: "Yaratıcılık ile pratikliğin çatışması", strengths: "4 dengeyi sağlar, 3 renk katar", challenges: "Yaşam tarzı farklılıkları" },
    5: { score: 87, summary: "Dinamik ve özgür bir ilişki", strengths: "Macera, iletişim, enerji", challenges: "Her ikisi de istikrardan kaçınabilir" },
    6: { score: 80, summary: "Yaratıcılık ve sevginin buluşması", strengths: "6'nın istikrarı 3'ü dengeler", challenges: "3'ün özgürlük ihtiyacı zaman zaman sorun yaratır" },
    7: { score: 65, summary: "Farklı dünyaların karşılaşması", strengths: "3 7'yi dışa açar, 7 3'ü derinleştirir", challenges: "İletişim tarzı farklılıkları" },
    8: { score: 72, summary: "Başarılı bir ekip çalışması", strengths: "8'in hırsı 3'ün yaratıcılığıyla birleşir", challenges: "Öncelik çatışmaları" },
    9: { score: 90, summary: "Harika bir uyum — yaratıcılık ve vizyon", strengths: "Ortak yaratıcı değerler, birbirini ilham", challenges: "Her ikisi de pratik olmayabilir" },
  },
  4: {
    4: { score: 82, summary: "İstikrarlı, güvenilir ve sağlam bir birliktelik", strengths: "Ortak değerler, güven, uzun vadeli planlama", challenges: "Rutinleşme, spontanlık eksikliği" },
    5: { score: 55, summary: "Zıt enerjilerin zorlu dansı", strengths: "Birbirinden öğrenme potansiyeli", challenges: "5'in özgürlüğü 4'ün istikrarıyla çatışır" },
    6: { score: 88, summary: "Mükemmel bir aile temeli", strengths: "Ortak sorumluluk anlayışı, güven", challenges: "Aşırı rutinleşme riski" },
    7: { score: 75, summary: "Sessiz ama sağlam bir bağ", strengths: "Karşılıklı saygı, derin bağlılık", challenges: "Duygusal ifade güçlüğü" },
    8: { score: 80, summary: "Güçlü bir iş ve yaşam ortaklığı", strengths: "Başarı odaklılık, pratik uyum", challenges: "Çalışmak yerine ilişkiyi beslemek unutulabilir" },
    9: { score: 62, summary: "Toprak ve gökyüzünün buluşması", strengths: "9'un vizyonu 4'ü genişletir", challenges: "Hayata bakış açısı farklılıkları" },
  },
  5: {
    5: { score: 70, summary: "Özgür ruhların heyecanlı birlikteliği", strengths: "Macera, özgürlük, yenilik", challenges: "Kararlılık ve istikrar eksikliği" },
    6: { score: 65, summary: "Özgürlük ve sorumluluk arasında denge arayışı", strengths: "6'nın sevgisi 5'i yumuşatır", challenges: "5'in bağlanma korkusu 6'yı üzer" },
    7: { score: 75, summary: "Zihinsel bağlantısı güçlü bir ilişki", strengths: "Merak, keşif, entelektüel uyum", challenges: "Duygusal derinlik kurulması zaman alabilir" },
    8: { score: 68, summary: "Enerji farklılıkları olan bir ilişki", strengths: "8'in istikrarı 5'i dengeler", challenges: "Kontrol ve özgürlük çatışması" },
    9: { score: 80, summary: "Büyük ideallerin paylaşıldığı bir birliktelik", strengths: "Macera, özgürlük, idealizm", challenges: "Pratik konularda zorluk" },
  },
  6: {
    6: { score: 85, summary: "Şefkat dolu bir yuva ortaklığı", strengths: "Ortak değerler, aile sevgisi, hizmet", challenges: "Bağımlılık riski, kişisel sınırları kaybetme" },
    7: { score: 70, summary: "Ruhsal derinliklerin buluşması", strengths: "Ruhsal büyüme, karşılıklı öğrenme", challenges: "7'nin içe dönüklüğü 6'yı yalnız hissettirebilir" },
    8: { score: 78, summary: "Başarı ve huzurun birlikteliği", strengths: "8'in başarısı ile 6'nın huzuru dengeli bir yaşam yaratır", challenges: "Zaman öncelikleri çatışabilir" },
    9: { score: 88, summary: "Hizmet ve şefkatin mükemmel birleşimi", strengths: "Ortak insancıl değerler, derin anlayış", challenges: "İkisi de başkalarına öncelik verip birbirini ihmal edebilir" },
  },
  7: {
    7: { score: 78, summary: "Derin ruhsal bir bağ", strengths: "Entelektüel uyum, maneviyat, derinlik", challenges: "Sosyal izolasyon riski, duygusal mesafe" },
    8: { score: 72, summary: "Zihin ve güç birlikteliği", strengths: "7'nin bilgeliği 8'in başarısını destekler", challenges: "Değer çatışmaları" },
    9: { score: 82, summary: "Ruhsal yolculuğun ortakları", strengths: "Maneviyat, bilgelik, derin anlayış", challenges: "Pratik hayattan kopukluk riski" },
  },
  8: {
    8: { score: 75, summary: "Güçlü bir güç çifti", strengths: "Başarı, güç, maddi hedefler", challenges: "İkisi de lider olmak ister, ego çatışması" },
    9: { score: 70, summary: "Başarı ve değerlerin kesişimi", strengths: "Büyük vizyonlar paylaşımı", challenges: "8 maddi, 9 ruhsal odaklıdır" },
  },
  9: {
    9: { score: 85, summary: "İnsanlığa hizmetin büyük birlikteliği", strengths: "Ortak idealler, şefkat, vizyon", challenges: "Her ikisi de kendi ideallerini önde tutabilir" },
  },
};


export function getCompatibility(n1: number, n2: number) {
  const low = Math.min(n1, n2);
  const high = Math.max(n1, n2);
  return compatibilityMatrix[low]?.[high] ?? {
    score: 65,
    summary: "Farklı enerjiler — büyüme fırsatı",
    strengths: "Birbirinden öğrenme, tamamlama",
    challenges: "Anlayış ve sabır gerektirir",
  };
}
