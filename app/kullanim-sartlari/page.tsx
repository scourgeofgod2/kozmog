import type { Metadata } from "next";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import { Breadcrumbs, Card, PageHero } from "@/components/ds";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "Kozmograf numeroloji hizmetinin kullanım şartları.",
  alternates: { canonical: "https://kozmograf.com/kullanim-sartlari" },
};

export default function KullanimSartlariPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "Kullanım şartları" }]} />
      <PageHero eyebrow={`Son güncelleme: ${LEGAL_UPDATED}`} title="Kullanım" accent="şartları" />
      <Card className="koz-prose mb-10 max-w-3xl">
        <p>kozmograf.com&apos;u kullanarak aşağıdaki şartları kabul etmiş sayılırsın.</p>

        <h2>Hizmetin niteliği</h2>
        <p>
          Kozmograf, Pisagor numerolojisine dayalı hesaplamalar ve yapay zekâ ile hazırlanan yorumlar sunar. Numeroloji
          bilimsel olarak kanıtlanmış bir yöntem değildir; tüm içerikler <strong>eğlence ve kişisel keşif</strong>{" "}
          amaçlıdır.
        </p>
        <p>
          İçerikler tıbbi, psikolojik, hukuki veya finansal tavsiye yerine geçmez. Bu alanlardaki kararların için ilgili
          uzmana başvurmalısın.
        </p>

        <h2>Yapay zekâ yorumları</h2>
        <p>
          Kişisel yorumlar yapay zekâ tarafından otomatik olarak üretilir ve hata içerebilir. Kozmograf, yorumların
          doğruluğu veya belirli bir amaca uygunluğu konusunda garanti vermez.
        </p>

        <h2>Kabul edilebilir kullanım</h2>
        <ul>
          <li>Hizmeti otomatik araçlarla aşırı yükleyecek şekilde kullanmamak,</li>
          <li>Başkasına ait kişisel verileri izni olmadan girmemek,</li>
          <li>Sitenin işleyişini bozmaya yönelik girişimlerde bulunmamak.</li>
        </ul>
        <p>Kötüye kullanımı önlemek için istek sayısı sınırlandırılabilir.</p>

        <h2>Fikri mülkiyet</h2>
        <p>Sitedeki metin, tasarım ve logo Kozmograf&apos;a aittir; izinsiz kopyalanamaz ve ticari amaçla kullanılamaz.</p>

        <h2>Değişiklikler ve iletişim</h2>
        <p>
          Bu şartlar güncellenebilir; güncel tarih sayfanın başında yer alır. Sorular için:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Card>
    </>
  );
}
