// app/sayilarin-anlami/page.tsx sayfasından taşındı.

export const numbers = [
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


export const dinSorulari = [
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


export const faqItems = [
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

