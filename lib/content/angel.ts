// Melek sayıları: tekrar eden sayı dizileri ve numerolojik yorumları.

export interface AngelNumber {
  slug: string;
  title: string;
  essence: string;
  meaning: string;
  love: string;
  work: string;
  action: string;
  root: number;
}

export const angelNumbers: AngelNumber[] = [
  {
    slug: "000",
    title: "Sonsuz Potansiyel",
    essence: "Sıfır noktası · Bütünlük · Yeni döngü",
    meaning:
      "000, her şeyin mümkün olduğu boş bir başlangıcı simgeler. Bir döngü tamamlanmış, yenisi henüz şekillenmemiştir. Niyetlerini netleştirmek için güçlü bir an.",
    love: "İlişkinde bir sayfa kapanıp yenisinin açılmak üzere olduğunu düşün; ne istediğini netleştir.",
    work: "Planlarını sıfırdan gözden geçir. Yeni bir yön belirlemek için uygun zaman.",
    action: "Kısa bir sessizlik molası ver ve yeni döngüde ne yaratmak istediğini yaz.",
    root: 0,
  },
  {
    slug: "111",
    title: "Yeni Başlangıçlar",
    essence: "Niyet · Tezahür · Cesaret",
    meaning:
      "111, düşüncelerinin hızla gerçeğe dönüştüğü bir döneme işaret eder. 1 sayısının üçlü tekrarı başlangıç ve irade enerjisini güçlendirir. Ne düşündüğüne dikkat et.",
    love: "Yeni bir tanışma ya da ilişkide yeni bir dönem. Ne istediğini açıkça ifade et.",
    work: "Yeni proje, yeni iş fikri, girişim. İlk adımı atmak için işaret.",
    action: "Bugün gerçekleşmesini istediğin tek bir şeyi yaz ve ona dair küçük bir adım at.",
    root: 1,
  },
  {
    slug: "222",
    title: "Denge ve Güven",
    essence: "Uyum · Ortaklık · Sabır",
    meaning:
      "222, sürecin doğru ilerlediğini ve sabretmen gerektiğini hatırlatır. 2 enerjisi ilişkileri, işbirliğini ve dengeyi öne çıkarır. Her şey yerli yerine oturuyor.",
    love: "Uyum ve yakınlaşma. Kırgınlıkları onarmak ve bağı güçlendirmek için iyi bir dönem.",
    work: "Ortaklıklar ve ekip çalışması. Acele etmeden ilerle.",
    action: "Kontrol etmeye çalıştığın bir şeyi bırak ve sürece güven.",
    root: 2,
  },
  {
    slug: "333",
    title: "Yaratıcılık ve Destek",
    essence: "İfade · Neşe · Büyüme",
    meaning:
      "333, yaratıcı ifadenin ve kendini göstermenin zamanı olduğunu söyler. 3 enerjisi iletişimi, neşeyi ve üretkenliği artırır. Desteklendiğini hissetmen için bir işaret.",
    love: "Hafiflik ve eğlence. Duygularını sözle ya da yaratıcı bir jestle ifade et.",
    work: "Fikirlerini paylaş, sunum yap, üret. Görünür olmak kazandırır.",
    action: "Ertelediğin yaratıcı bir işe bugün 15 dakika ayır.",
    root: 3,
  },
  {
    slug: "444",
    title: "Koruma ve Sağlam Temel",
    essence: "İstikrar · Güven · Emek",
    meaning:
      "444, doğru yolda olduğunu ve sağlam bir temel üzerinde durduğunu gösterir. 4 enerjisi disiplin, düzen ve güvenliği temsil eder. Emeklerinin karşılığı geliyor.",
    love: "Güven ve bağlılık. İlişkide uzun vadeli adımlar için uygun.",
    work: "Sistem kur, planına sadık kal. İstikrarlı çalışma meyvesini verecek.",
    action: "Hayatında düzene sokmak istediğin bir alanı seç ve küçük bir rutin başlat.",
    root: 4,
  },
  {
    slug: "555",
    title: "Büyük Değişim",
    essence: "Dönüşüm · Özgürlük · Hareket",
    meaning:
      "555, hayatında önemli bir değişimin kapıda olduğunu söyler. 5 enerjisi özgürlük, macera ve yenilenmeyi getirir. Değişime direnmek yerine onu karşıla.",
    love: "İlişkide yenilik ihtiyacı. Rutini kırmak ya da yeni bir sayfa açmak gündemde olabilir.",
    work: "Yeni teklifler, iş değişikliği, taşınma. Esnek ol.",
    action: "Seni yeniliğe zorlayan bir durumu tehdit değil fırsat olarak yeniden yaz.",
    root: 5,
  },
  {
    slug: "666",
    title: "Denge ve Öz Şefkat",
    essence: "Aile · Sorumluluk · Kalp",
    meaning:
      "Numerolojide 666 korkulacak bir sayı değildir; 6'nın sevgi ve sorumluluk enerjisini taşır. Maddi kaygılar ile duygusal ihtiyaçlar arasında dengeyi yeniden kurma çağrısıdır.",
    love: "Sevdiklerine ve kendine şefkat. Ev ve aile konuları öne çıkar.",
    work: "Para kaygısını bırakıp değer verdiğin işe odaklan.",
    action: "Kendine ve sevdiğin birine özen gösteren küçük bir şey yap.",
    root: 6,
  },
  {
    slug: "777",
    title: "Ruhsal Uyanış",
    essence: "Bilgelik · Şans · İçgörü",
    meaning:
      "777, iç sesinle uyum içinde olduğunu ve doğru yolda ilerlediğini gösterir. 7 enerjisi öğrenmeyi, sezgiyi ve ruhsal derinleşmeyi temsil eder.",
    love: "Ruhsal düzeyde derin bağ. Yüzeysellikten uzaklaş.",
    work: "Öğrenme, araştırma, uzmanlaşma. Sezgilerine güven.",
    action: "Bugün telefonsuz bir yürüyüş yap ve aklına gelenleri not et.",
    root: 7,
  },
  {
    slug: "888",
    title: "Bolluk ve Hasat",
    essence: "Başarı · Para · Güç",
    meaning:
      "888, bolluğun ve emeklerin karşılığının yaklaştığını söyler. 8 enerjisi maddi başarı, otorite ve döngüsel kazancı temsil eder.",
    love: "Karşılıklı saygı ve dengeli bir güç ilişkisi.",
    work: "Terfi, büyük anlaşma, kazanç. Değerini bil ve iste.",
    action: "Hak ettiğin bir şeyi açıkça iste: zam, fiyat artışı ya da destek.",
    root: 8,
  },
  {
    slug: "999",
    title: "Tamamlanma",
    essence: "Kapanış · Bırakma · Şefkat",
    meaning:
      "999, bir dönemin sona erdiğini ve yeni başlangıç için yer açman gerektiğini söyler. 9 enerjisi tamamlanma, affetme ve evrensel sevgiyi taşır.",
    love: "Bitişler ve affetme. Artık sana iyi gelmeyen bağları bırak.",
    work: "Projeleri tamamla, yeni büyük işlere hazırlan.",
    action: "Hayatından çıkarmak istediğin bir şeyi seç ve bu hafta vedalaş.",
    root: 9,
  },
  {
    slug: "1010",
    title: "Kişisel Gelişim",
    essence: "Farkındalık · Yeni bakış · İlerleme",
    meaning:
      "1010, 1'in başlangıç enerjisini 0'ın sonsuz potansiyeliyle birleştirir. Kendini geliştirme ve bakış açını genişletme çağrısıdır.",
    love: "İlişkide olgunlaşma; birlikte büyümek.",
    work: "Yeni beceri, yeni eğitim, yeni yön.",
    action: "Öğrenmek istediğin bir konuda bugün ilk dersi al.",
    root: 2,
  },
  {
    slug: "1212",
    title: "Konfor Alanından Çık",
    essence: "Büyüme · Güven · Adım atma",
    meaning:
      "1212, 1 ve 2'nin tekrarıyla bağımsızlık ile işbirliği arasında denge kurmanı ister. Konfor alanından çıkıp yeni bir adım atmanın zamanı.",
    love: "Hem kendin olmak hem de partnerine alan açmak.",
    work: "Bildiğin yolun dışına çıkmak fırsat getirir.",
    action: "Seni hafifçe korkutan ama heyecanlandıran bir adımı planla.",
    root: 6,
  },
  {
    slug: "1234",
    title: "Adım Adım İlerleme",
    essence: "Düzen · Akış · Süreç",
    meaning:
      "1234, hayatının doğal bir sırayla ilerlediğini ve her adımın bir sonrakini hazırladığını gösterir. Basit tut, sırayla ilerle.",
    love: "İlişkiyi aceleye getirmeden, doğal akışında büyüt.",
    work: "Büyük hedefi küçük adımlara böl.",
    action: "En büyük hedefini dört küçük adıma ayır ve ilkini bugün yap.",
    root: 1,
  },
];

export function getAngel(slug: string) {
  return angelNumbers.find((a) => a.slug === slug);
}
