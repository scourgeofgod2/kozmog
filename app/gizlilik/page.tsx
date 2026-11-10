import type { Metadata } from "next";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import { Breadcrumbs, Card, PageHero } from "@/components/ds";

export const metadata: Metadata = {
  title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
  description: "Kozmograf hangi verileri, hangi amaçla işler? Gizlilik politikası ve KVKK aydınlatma metni.",
  alternates: { canonical: "https://kozmograf.com/gizlilik" },
};

export default function GizlilikPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Gizlilik ve KVKK" }]} />
      <PageHero eyebrow={`Son güncelleme: ${LEGAL_UPDATED}`} title="Gizlilik ve" accent="KVKK" />
      <Card className="koz-prose mb-10 max-w-3xl">
        <p>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında kozmograf.com
          (&quot;Kozmograf&quot;) tarafından hangi kişisel verilerin, hangi amaçla ve nasıl işlendiğini açıklar.
        </p>

        <h2>Hangi verileri işliyoruz?</h2>
        <ul>
          <li>
            <strong>Doğum tarihi ve (isteğe bağlı) ad soyad:</strong> Numeroloji hesaplaması ve kişisel yorum üretmek
            için formda girdiğin bilgiler.
          </li>
          <li>
            <strong>Teknik veriler:</strong> IP adresi, tarayıcı bilgisi ve ziyaret edilen sayfa adresi. Bunlar sunucu
            erişim kayıtlarında tutulabilir; IP adresi ayrıca kötüye kullanımı önlemek için (istek sınırlama) en fazla
            24 saat boyunca bellekte tutulur.
          </li>
          <li>
            <strong>Sipariş verileri (ücretli raporlar):</strong> Ad soyad, doğum tarihi, varsa partnerinin adı ve doğum
            tarihi ile raporun gönderileceği e-posta adresi. Sipariş bilgileri bir veritabanında saklanmaz; sipariş
            bildirimi ve rapor e-posta ile iletilir.
          </li>
        </ul>
        <p>Üyelik sistemi, çerez tabanlı reklam veya analitik takibi şu anda kullanılmamaktadır.</p>

        <h2>Verileri ne için kullanıyoruz?</h2>
        <ul>
          <li>Numeroloji sayılarını hesaplamak ve sonucu sana göstermek,</li>
          <li>İsteğin üzerine yapay zekâ destekli kişisel yorum ve satın aldığın raporu hazırlamak, raporu sana iletmek,</li>
          <li>Hizmetin güvenliğini sağlamak ve kötüye kullanımı engellemek.</li>
        </ul>

        <h2>Verileri kimlerle paylaşıyoruz?</h2>
        <p>
          Kişisel yorumu üretebilmek için doğum tarihin, ad soyadın (girdiysen) ve hesaplanan sayılar, yorum metnini
          oluşturan yapay zekâ hizmet sağlayıcısına (Inworld AI ve onun kullandığı model altyapısı) iletilir. Bu
          sağlayıcıların sunucuları yurt dışında bulunabilir. Formu göndererek yorum oluşturulmasını talep ettiğinde bu
          aktarıma açık rıza vermiş olursun. Ad soyad alanını boş bırakarak yalnızca doğum tarihiyle de yorum alabilirsin.
        </p>
        <p>
          Sipariş onayı ve rapor e-postaları Resend (Resend Inc., ABD) e-posta altyapısı üzerinden gönderilir; bu
          nedenle e-posta adresin, adın ve rapor içeriği yurt dışındaki sunuculara aktarılır. Sipariş verirken bu
          aktarıma açık rıza vermiş olursun. Veriler bunun dışında üçüncü kişilerle paylaşılmaz, satılmaz. Sipariş
          yazışmaları ve fatura/muhasebe kayıtları yasal saklama süreleri boyunca tutulur.
        </p>

        <h2>Ne kadar süre saklıyoruz?</h2>
        <p>
          Girdiğin doğum tarihi ve isim bir veritabanında saklanmaz; yalnızca sonuç sayfasının adresinde (URL) yer alır
          ve yorum üretildikten sonra sunucuda tutulmaz. Sunucu erişim kayıtları teknik ihtiyaçlar için sınırlı bir süre
          saklanır.
        </p>

        <h2>Hakların</h2>
        <p>
          KVKK&apos;nın 11. maddesi uyarınca verilerinin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini
          isteme, itiraz etme ve diğer yasal haklarını kullanmak için{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> adresine konu satırına &quot;KVKK&quot; yazarak
          başvurabilirsin.
        </p>

        <h2>Değişiklikler</h2>
        <p>
          Hizmete üyelik, ödeme veya analitik gibi yeni özellikler eklendiğinde bu metin güncellenir. Güncel tarih
          sayfanın başında yer alır.
        </p>
      </Card>
    </>
  );
}
