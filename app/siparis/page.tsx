import type { Metadata } from "next";
import Link from "next/link";
import { getPackage, packages, DELIVERY_PROMISE } from "@/lib/content/packages";
import OrderForm from "@/components/forms/OrderForm";
import { Breadcrumbs, Eyebrow } from "@/components/ds";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sipariş",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

type Props = { searchParams: Promise<{ paket?: string }> };

export default async function SiparisPage({ searchParams }: Props) {
  const pkg = getPackage((await searchParams).paket) ?? packages.find((p) => p.featured)!;

  return (
    <div className="mx-auto max-w-2xl pb-10">
      <Breadcrumbs items={[{ href: "/", label: "Ana sayfa" }, { href: "/paketler", label: "Raporlar" }, { label: "Sipariş" }]} />
      <header className="pb-6 pt-8">
        <Eyebrow className="mb-3">Sipariş</Eyebrow>
        <h1 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
          {pkg.name} <em className="text-gold">{pkg.price} TL</em>
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          {pkg.tagline} PDF raporun ödeme onayından sonra {DELIVERY_PROMISE} gelir.
        </p>
        <a
          href={pkg.sample ? pkg.sample.pdf : "/paketler#ornekler"}
          {...(pkg.sample ? { target: "_blank", rel: "noopener" } : {})}
          className="mt-2 inline-flex min-h-[44px] items-center text-[14px] font-semibold text-gold underline underline-offset-4"
        >
          {pkg.sample ? "Örnek raporu gör" : "Örnek raporları gör"}
        </a>
      </header>

      <nav aria-label="Paket seç" className="mb-6 flex flex-wrap gap-2">
        {packages.map((p) => (
          <Link
            key={p.slug}
            href={`/siparis?paket=${p.slug}`}
            aria-current={p.slug === pkg.slug ? "page" : undefined}
            className={cn(
              "inline-flex min-h-[40px] items-center rounded-full border px-4 text-[13px] transition-colors",
              p.slug === pkg.slug ? "border-gold bg-gold text-ink" : "border-line text-muted hover:border-gold hover:text-text"
            )}
          >
            {p.name} · {p.price} TL
          </Link>
        ))}
      </nav>

      <OrderForm key={pkg.slug} pkg={pkg} />
    </div>
  );
}
