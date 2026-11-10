// Site gezinme yapısı — Header, Footer ve sitemap aynı listeyi kullanır.

export interface NavItem {
  href: string;
  label: string;
  desc?: string;
}

export const primaryNav: NavItem[] = [
  { href: "/sayilarin-anlami", label: "Sayılar" },
  { href: "/kisisel-yil", label: "2027 Yılın" },
  { href: "/uyumluluk", label: "Aşk Uyumu" },
  { href: "/melek-sayilari", label: "Melek Sayıları" },
  { href: "/saat-anlami", label: "Saatler" },
  { href: "/paketler", label: "Raporlar" },
];

export const guideGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Hesaplayıcılar",
    items: [
      { href: "/", label: "Numeroloji Hesaplama", desc: "Tüm sayıların tek seferde" },
      { href: "/kisisel-yil", label: "Kişisel Yıl 2027", desc: "Bu yıl seni ne bekliyor" },
      { href: "/uyumluluk", label: "Aşk Uyumu", desc: "İki doğum tarihi, bir skor" },
      { href: "/isim-numeroloji", label: "İsim Numerolojisi", desc: "Kader sayını isminden bul" },
      { href: "/karmik-borc", label: "Karmik Borç", desc: "13, 14, 16, 19 var mı?" },
      { href: "/paketler", label: "Kişisel Raporlar", desc: "PDF, 1 saat içinde" },
    ],
  },
  {
    title: "Sayılar",
    items: [
      { href: "/sayilarin-anlami", label: "Sayıların Anlamı", desc: "1'den 9'a tam rehber" },
      { href: "/yasam-yolu", label: "Yaşam Yolu Sayısı" },
      { href: "/usta-sayilar", label: "Usta Sayılar 11·22·33" },
      { href: "/dogum-gunu-sayisi", label: "Doğum Günü Sayısı" },
    ],
  },
  {
    title: "İşaretler",
    items: [
      { href: "/melek-sayilari", label: "Melek Sayıları", desc: "111, 222, 333…" },
      { href: "/saat-anlami", label: "Ayna Saatler", desc: "11:11, 22:22…" },
    ],
  },
  {
    title: "Yaşam",
    items: [
      { href: "/kariyer-numerolojisi", label: "Kariyer Numerolojisi" },
      { href: "/gucler-ve-yetenekler", label: "Güçler ve Yetenekler" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { href: "/iletisim", label: "İletişim" },
  { href: "/gizlilik", label: "Gizlilik ve KVKK" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
];
