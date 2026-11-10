import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";
import { Breadcrumbs, Card, PageHero, RelatedLinks, Section, buttonStyles } from "@/components/ds";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Kozmograf ile iletişime geç: soru, öneri ve iş birlikleri için bize yaz.",
  alternates: { canonical: "https://kozmograf.com/iletisim" },
};

export default function IletisimPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { label: "İletişim" }]} />
      <PageHero
        eyebrow="İletişim"
        title="Bize"
        accent="yaz"
        lead="Soruların, önerilerin, hata bildirimlerin ya da iş birliği tekliflerin için e-posta gönderebilirsin. Genellikle birkaç iş günü içinde dönüş yapıyoruz."
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Card tone="gold" className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-[13px] font-semibold">E-posta</p>
            <p className="mt-2 break-all font-display text-3xl font-semibold">{CONTACT_EMAIL}</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-semibold text-gold">
            E-posta gönder →
          </a>
        </Card>
        <Card>
          <h2 className="font-display text-2xl font-semibold">Yazmadan önce</h2>
          <ul className="mt-3 space-y-2 text-[15px] text-muted">
            <li>Numeroloji yorumları kişiye özel danışmanlık değildir; sağlık, hukuk ve finans kararları için uzmana başvur.</li>
            <li>Kişisel verilerinle ilgili taleplerin için konu satırına &quot;KVKK&quot; yazman yeterli.</li>
          </ul>
          <a href="/gizlilik" className={buttonStyles("secondary", "mt-5")}>
            Gizlilik ve KVKK
          </a>
        </Card>
      </div>
      <Section title="Belki aradığın buradadır">
        <RelatedLinks
          links={[
            { href: "/sayilarin-anlami", label: "Sayıların anlamı" },
            { href: "/kisisel-yil", label: "2027 kişisel yıl" },
            { href: "/kullanim-sartlari", label: "Kullanım şartları" },
          ]}
        />
      </Section>
    </>
  );
}
