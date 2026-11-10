// app/isim-numeroloji/page.tsx sayfasından taşındı.

export const destinyProfiles = [
  {
    number: 1,
    title: "Öncü Ruh",
    accent: "#F5C842",
    traits: "Liderlik, bağımsızlık, yenilikçilik, kararlılık",
    strengths: "Doğuştan lider enerjisi taşırsınız. İsminizin frekansı sizi yeni başlangıçlara ve cesur adımlara iter.",
    challenges: "Bencillik ve inatçılıktan kaçınmak sizin için önemli bir derstir.",
    famousNames: ["Ali", "Atatürk", "Napoleon"],
    lifeTheme: "Öz-güven ve liderlik yoluyla dünyayı dönüştürmek",
  },
  {
    number: 2,
    title: "Barış Yapıcı",
    accent: "#7C3AED",
    traits: "Empati, işbirliği, hassasiyet, sezgi",
    strengths: "Çevrenizdekileri bir arada tutma yeteneğiniz olağanüstüdür. İsminizin enerjisi diplomatik bir ruh taşır.",
    challenges: "Başkalarının ihtiyaçları için kendinizi feda etmemek gerekiyor.",
    famousNames: ["Leyla", "Diana", "Gandhi"],
    lifeTheme: "Uyum ve denge yoluyla başkalarına hizmet etmek",
  },
  {
    number: 3,
    title: "Yaratıcı İfadeci",
    accent: "#DB2777",
    traits: "Yaratıcılık, neşe, iletişim, ilham",
    strengths: "İsminizin frekansı sanatsal ve sosyal alanlarda parlamanızı destekler. İfade etme yeteneğiniz güçlüdür.",
    challenges: "Dağılmadan odaklanmak ve projeleri tamamlamak geliştirmeniz gereken alan.",
    famousNames: ["Zeynep", "Shakira", "Oscar Wilde"],
    lifeTheme: "Yaratıcı ifade yoluyla başkalarını ilham vermek",
  },
  {
    number: 4,
    title: "Temel Kurucu",
    accent: "#059669",
    traits: "Güvenilirlik, disiplin, pratiklik, sabır",
    strengths: "İsminizin enerjisi güçlü yapılar kurmanızı sağlar. Sabırlı ve sistematik yaklaşımınız kalıcı sonuçlar doğurur.",
    challenges: "Değişime direnç ve katılık üzerinde çalışmak önemlidir.",
    famousNames: ["Mehmet", "Einstein", "Warren Buffett"],
    lifeTheme: "Disiplin ve emek yoluyla kalıcı değerler yaratmak",
  },
  {
    number: 5,
    title: "Özgür Ruh",
    accent: "#0EA5E9",
    traits: "Özgürlük, macera, uyum sağlama, merak",
    strengths: "İsminizin frekansı sizi değişime ve maceraya açık tutar. Çok yönlülüğünüz farklı alanlarda başarı getirir.",
    challenges: "Sabırsızlık ve kararsızlık ile başa çıkmak gerekiyor.",
    famousNames: ["Selin", "Casanova", "Abraham Lincoln"],
    lifeTheme: "Özgürlük ve deneyim yoluyla büyümek",
  },
  {
    number: 6,
    title: "Şefkat Bekçisi",
    accent: "#EC4899",
    traits: "Sorumluluk, şefkat, güzellik, uyum",
    strengths: "İsminizin enerjisi aile ve topluma adanmışlık taşır. Başkalarını besleyen ve koruyan doğal bir eğiliminiz var.",
    challenges: "Mükemmeliyetçilik ve aşırı sorumluluk duygusuyla denge kurun.",
    famousNames: ["Fatma", "Mother Teresa", "Venus Williams"],
    lifeTheme: "Sevgi ve şefkatle başkalarına hizmet etmek",
  },
  {
    number: 7,
    title: "Bilge Arayışçı",
    accent: "#8B5CF6",
    traits: "Analiz, sezgi, içe dönüklük, gizemlilik",
    strengths: "İsminizin frekansı derin düşünce ve araştırmaya yatkınlık getirir. Gizemleri çözme yeteneğiniz güçlüdür.",
    challenges: "Sosyal izolasyon ve aşırı analitik düşünceyi dengelemek önemli.",
    famousNames: ["İrem", "Nikola Tesla", "Aristotle"],
    lifeTheme: "Bilgi ve sezgi yoluyla gerçeği aramak",
  },
  {
    number: 8,
    title: "Güç Manifestörü",
    accent: "#F97316",
    traits: "Hırs, liderlik, maddi başarı, otorite",
    strengths: "İsminizin enerjisi güçlü maddi manifestasyon kapasitesi taşır. Büyük hedefleri gerçekleştirme gücünüz var.",
    challenges: "Para ve güç ile sağlıklı ilişki kurmak, egoya dikkat etmek gerekiyor.",
    famousNames: ["Yağmur", "Napoleon Hill", "Pablo Picasso"],
    lifeTheme: "Güç ve otorite yoluyla dünyayı şekillendirmek",
  },
  {
    number: 9,
    title: "İnsanlık Hizmetçisi",
    accent: "#10B981",
    traits: "Evrensel sevgi, bağışlama, idealizm, bilgelik",
    strengths: "İsminizin frekansı evrensel şefkati taşır. İnsanlığa hizmet etme içgüdünüz güçlüdür.",
    challenges: "Hayal kırıklığına dayanmak ve idealizmi pratiklikle dengelemek.",
    famousNames: ["Elif", "Gandhi", "Mother Teresa"],
    lifeTheme: "Sevgi ve hizmet yoluyla insanlığı iyileştirmek",
  },
];


export const letterRows = [
  { letters: ["A=1", "B=2", "C=3", "D=4", "E=5", "F=6", "G=7", "H=8", "I=9"] },
  { letters: ["J=1", "K=2", "L=3", "M=4", "N=5", "O=6", "P=7", "Q=8", "R=9"] },
  { letters: ["S=1", "T=2", "U=3", "V=4", "W=5", "X=6", "Y=7", "Z=8"] },
  { letters: ["Ç=3", "Ğ=7", "İ=9", "Ö=6", "Ş=1", "Ü=3"] },
];


export const faqItems = [
  {
    q: "İsim numerolojisi nasıl hesaplanır?",
    a: "Pythagoras sisteminde her harf 1-9 arasında bir sayıya karşılık gelir. İsminizin tüm harflerinin sayısal değerleri toplanır, ardından tek basamaklı bir sayı elde edilene kadar (11, 22, 33 usta sayılar hariç) basamaklar tekrar toplanır. Bu son sayı kader sayınızdır.",
  },
  {
    q: "Kader sayısı ile yaşam yolu sayısı aynı mı?",
    a: "Hayır, farklı sayılardır. Yaşam yolu sayısı doğum tarihinizden hesaplanır ve yaşam misyonunuzu gösterir. Kader sayısı (isim sayısı) adınızdan hesaplanır ve potansiyelinizi ve kişiliğinizi yansıtır.",
  },
  {
    q: "Evlilik sonrası soyad değişirse numeroloji etkilenir mi?",
    a: "Evet, soyad değişikliği kader sayısını değiştirebilir. Birçok numeroloji uzmanı doğum adını esas almanızı önerse de nikah adı ile doğum adınız arasındaki enerji farkını karşılaştırmak da değerli bir analiz sunar.",
  },
  {
    q: "Türkçe harfler (Ç, Ğ, İ, Ö, Ş, Ü) nasıl hesaplanır?",
    a: "Türkçeye özgü harflerin kökeni Latince harflerle ilişkilendirilerek değer atanır: Ç=3 (C gibi), Ğ=7 (G gibi), İ=9 (I gibi), Ö=6 (O gibi), Ş=1 (S gibi), Ü=3 (U gibi). Bu değerler Pythagoras tablosunun Türkçe uyarlamasıdır.",
  },
  {
    q: "İsim değiştirmek numerolojik açıdan işe yarar mı?",
    a: "Pek çok kültürde ve bazı numeroloji geleneklerinde isim değişikliği enerji değişikliği getirdiğine inanılır. Ancak bu kişisel bir karardır. Numeroloji açısından hem doğum adı hem de kullanılan isim analiz edilerek karşılaştırma yapılabilir.",
  },
];

