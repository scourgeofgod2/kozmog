// app/saat-anlami/page.tsx sayfasından taşındı.

export const mirrorHours = [
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


export const faqItems = [
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

