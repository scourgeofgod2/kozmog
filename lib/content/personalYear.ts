// Kişisel yıl sayıları (1–9, 11, 22). Pisagor numerolojisinde 9 yıllık döngü.

export interface PersonalYear {
  n: number;
  title: string;
  theme: string;
  summary: string;
  love: string;
  work: string;
  money: string;
  advice: string;
  avoid: string;
}

export const personalYears: PersonalYear[] = [
  {
    n: 1,
    title: "Yeni Başlangıçlar Yılı",
    theme: "Tohum ekme · Cesaret · Bağımsızlık",
    summary:
      "Dokuz yıllık döngünün ilk yılı. Geçmişin yükleri geride kalır, önünde boş bir sayfa vardır. Bu yıl attığın adımlar önümüzdeki dokuz yılın yönünü belirler.",
    love: "Yeni biriyle tanışmak ya da mevcut ilişkide yeni bir sayfa açmak için güçlü bir yıl. Kendi ihtiyaçlarını net söylemekten çekinme.",
    work: "Yeni iş, yeni proje, kendi işini kurma fikri… Erteleme. İnisiyatif almak ödüllendirilir.",
    money: "Yatırım için tohum dönemi. Hemen büyük kazanç bekleme ama uzun vadeli planı şimdi kur.",
    advice: "Başkalarının onayını bekleme. Niyetini netleştir ve ilk adımı at.",
    avoid: "Eski alışkanlıklara geri dönmek, karar vermeyi sürekli ertelemek.",
  },
  {
    n: 2,
    title: "Sabır ve Ortaklık Yılı",
    theme: "İşbirliği · Denge · Sezgi",
    summary:
      "Geçen yıl ekilen tohumlar toprağın altında kök salıyor. Görünür sonuçlar yavaş gelir; bu yılın gücü sabırda, ilişkilerde ve detaylarda.",
    love: "İlişkiler yılın merkezinde. Derinleşen bağlar, barışmalar ve duygusal yakınlık için çok uygun.",
    work: "Tek başına değil, ekip olarak kazanırsın. Ortaklıklar, anlaşmalar ve diplomasi öne çıkar.",
    money: "Ani hamleler yerine istikrar. Ortak bütçe ve anlaşmaları dikkatle oku.",
    advice: "Acele etme. Dinle, gözlemle ve sezgine güven.",
    avoid: "Aşırı alınganlık, kendi ihtiyaçlarını başkaları için bastırmak.",
  },
  {
    n: 3,
    title: "Yaratıcılık ve İfade Yılı",
    theme: "Neşe · İletişim · Sosyallik",
    summary:
      "Enerji yükselir, hayat renklenir. Kendini ifade etmek, üretmek, görünür olmak için mükemmel bir yıl. Sosyal çevren genişler.",
    love: "Flört, eğlence ve hafiflik. Bekarlar için hareketli bir yıl; ilişkide olanlar için birlikte yeni deneyimler.",
    work: "Yazı, sanat, sosyal medya, satış, sunum… İletişim gerektiren her alan parlar. Fikirlerini paylaş.",
    money: "Harcamalar artabilir; keyif ile israf arasındaki çizgiyi koru.",
    advice: "Mükemmeli bekleme, üret ve paylaş.",
    avoid: "Enerjiyi çok fazla yöne dağıtmak, yarım kalan işler.",
  },
  {
    n: 4,
    title: "Temel Atma Yılı",
    theme: "Disiplin · Emek · İstikrar",
    summary:
      "Çalışma ve inşa yılı. Hayalleri somut planlara dönüştürme zamanı. Yorucu gelebilir ama bu yıl attığın temeller yıllarca taşır.",
    love: "Ciddiyet ve bağlılık. Ev, ortak gelecek, sorumluluk konuları gündemde.",
    work: "Sistem kurma, düzen, uzmanlaşma. Kısa yollar yerine sağlam adımlar kazandırır.",
    money: "Bütçe, birikim ve borç kapatma için ideal. Gayrimenkul ve uzun vadeli planlar öne çıkar.",
    advice: "Rutin kur, sağlığına ve bedenine dikkat et.",
    avoid: "Katılık, her şeyi kontrol etme isteği, aşırı çalışma.",
  },
  {
    n: 5,
    title: "Değişim ve Özgürlük Yılı",
    theme: "Hareket · Macera · Dönüşüm",
    summary:
      "Döngünün ortası: kapılar açılır, hayat hızlanır. Seyahat, taşınma, iş değişikliği ya da beklenmedik fırsatlar. Esnek olan kazanır.",
    love: "Heyecan ve sürpriz. Rutinden sıkılan ilişkiler sarsılabilir; yenilik katmak iyi gelir.",
    work: "Yeni alanlar, yeni şehirler, yeni insanlar. Teklifleri değerlendir ama sözleşmeleri dikkatle oku.",
    money: "Dalgalı olabilir. Fırsatlara açık ol ama riskleri sınırla.",
    advice: "Değişime direnme, merakla karşıla.",
    avoid: "Düşünmeden verilen ani kararlar, aşırılıklar.",
  },
  {
    n: 6,
    title: "Sevgi ve Sorumluluk Yılı",
    theme: "Aile · Ev · Şefkat",
    summary:
      "Kalbin yılı. Aile, ev, ilişkiler ve sevdiklerine karşı sorumluluklar ön planda. Vermenin ve almanın dengesini öğrenirsin.",
    love: "Evlilik, nişan, birlikte yaşama, aileyi büyütme gibi kararlar için en güçlü yıllardan biri.",
    work: "Hizmet, bakım, eğitim, danışmanlık alanları öne çıkar. İş yerinde destekleyici rol üstlenirsin.",
    money: "Ev ve aile harcamaları artabilir; ortak kararlar al.",
    advice: "Başkalarına bakarken kendini unutma.",
    avoid: "Herkesin yükünü üstlenmek, mükemmeliyetçilik.",
  },
  {
    n: 7,
    title: "İçe Dönüş ve Bilgelik Yılı",
    theme: "Öğrenme · Ruhsallık · Analiz",
    summary:
      "Dışarıdan çok içeride olan bir yıl. Kendini dinleme, öğrenme, araştırma ve ruhsal derinleşme zamanı. Yalnız kalmak ihtiyaçtır, eksiklik değil.",
    love: "Derin ve anlamlı bağlar arayışı. Yüzeysel ilişkiler seni yorar.",
    work: "Eğitim, sertifika, uzmanlık, araştırma için ideal. Büyük atılımlar yerine strateji kur.",
    money: "Gösterişli harcamalar yerine bilgiye yatırım.",
    advice: "Sessizliğe alan aç: meditasyon, doğa, kitaplar.",
    avoid: "Kendini tamamen izole etmek, aşırı şüphecilik.",
  },
  {
    n: 8,
    title: "Güç ve Hasat Yılı",
    theme: "Başarı · Para · Otorite",
    summary:
      "Emeklerin karşılığını alma yılı. Kariyer, para ve statü konularında güçlü bir enerji. Hedeflerin büyükse bu yıl onları zorla.",
    love: "Güç dengeleri gündemde. Eşit ve saygılı bir ilişki kurmak öncelik.",
    work: "Terfi, zam, büyük anlaşmalar, liderlik pozisyonları. Kendini ortaya koy.",
    money: "Kazanç potansiyeli yüksek; yatırım ve büyük kararlar için uygun. Etik ol.",
    advice: "Gücünü sorumlulukla kullan; hak ettiğini iste.",
    avoid: "Hırsın ilişkilerin ve sağlığın önüne geçmesi.",
  },
  {
    n: 9,
    title: "Tamamlanma ve Bırakma Yılı",
    theme: "Kapanış · Arınma · Şefkat",
    summary:
      "Dokuz yıllık döngünün son yılı. Artık sana hizmet etmeyen ilişkileri, işleri ve alışkanlıkları bırakma zamanı. Gelecek yılın yeni başlangıcına yer açarsın.",
    love: "Bitişler ve affetme. Tamamlanan ilişkiler kapanır, güçlü olanlar olgunlaşır.",
    work: "Projeleri bitir, yeni büyük işlere bu yıl değil, bir sonraki yıl başla.",
    money: "Borçları kapat, eşyaları sadeleştir; bağış ve paylaşım iyi gelir.",
    advice: "Tutunma, teşekkür et ve bırak.",
    avoid: "Geçmişe takılı kalmak, yeni başlangıçları zorlamak.",
  },
  {
    n: 11,
    title: "Uyanış Yılı (Usta Yıl)",
    theme: "Sezgi · İlham · Farkındalık",
    summary:
      "2 yılının yoğunlaşmış, usta hali. Sezgilerin keskinleşir, rüyalar ve tesadüfler anlam kazanır. Duygusal olarak yoğun ama ruhsal olarak çok verimli bir yıl.",
    love: "Ruh eşi bağlantıları, derin duygusal karşılaşmalar. Hassasiyetini koru.",
    work: "İlham verdiğin, öğrettiğin, yaratıcı ya da şifa odaklı işler öne çıkar.",
    money: "Sezgiyle gelen fırsatlar; yine de mantığınla kontrol et.",
    advice: "İç sesini dinle, enerjini koru, sınır koy.",
    avoid: "Kaygıya kapılmak, kendini aşırı yormak.",
  },
  {
    n: 22,
    title: "Büyük İnşa Yılı (Usta Yıl)",
    theme: "Vizyon · Kalıcı eser · Liderlik",
    summary:
      "4 yılının usta hali. Büyük hayalleri gerçeğe dönüştürme gücü. Uzun vadeli, kalıcı ve başkalarına da fayda sağlayan projeler için olağanüstü bir yıl.",
    love: "Ortak hedefler ve birlikte kurulan bir gelecek.",
    work: "Şirket kurma, büyük projeler, toplumsal etki. Planla ve sabırla uygula.",
    money: "Uzun vadeli büyük yatırımlar; disiplin şart.",
    advice: "Büyük düşün, küçük ve düzenli adımlarla ilerle.",
    avoid: "Baskı altında ezilmek, her şeyi tek başına taşımak.",
  },
  {
    n: 33,
    title: "Şifa ve Hizmet Yılı (Usta Yıl)",
    theme: "Koşulsuz sevgi · Öğretmenlik · Şefkat",
    summary:
      "6 yılının usta hali. Sevgi, şifa ve hizmet temaları yoğunlaşır. Başkalarına destek olurken kendi kalbin de iyileşir.",
    love: "Derin bağlılık, aile ve sevdiklerin için fedakârlık; dengeyi koru.",
    work: "Eğitim, sağlık, danışmanlık ve topluma hizmet alanları öne çıkar.",
    money: "Paylaşım ve cömertlik; kendi ihtiyaçlarını da gözet.",
    advice: "Vermek kadar almaya da izin ver.",
    avoid: "Kurtarıcı rolüne sıkışmak, tükenmişlik.",
  },
];

export function getPersonalYear(n: number) {
  return personalYears.find((p) => p.n === n);
}
