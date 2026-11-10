import type { Metadata } from "next";
import { ButtonLink, RelatedLinks } from "@/components/ds";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl py-16 sm:py-24">
      <p className="font-display text-[8rem] font-semibold leading-none text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
        Bu sayfa <em className="text-gold">evrende yok.</em>
      </h1>
      <p className="mt-4 text-[17px] text-muted">Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Şunlardan biri işine yarayabilir:</p>
      <ButtonLink href="/#hesapla" className="mt-7">
        Ücretsiz sayımı bul
      </ButtonLink>
      <div className="mt-10">
        <RelatedLinks
          links={[
            { href: "/sayilarin-anlami", label: "Sayıların anlamı" },
            { href: "/kisisel-yil", label: "2027 kişisel yıl" },
            { href: "/melek-sayilari", label: "Melek sayıları" },
          ]}
        />
      </div>
    </div>
  );
}
