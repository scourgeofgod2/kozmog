// Kozmograf ortak arayüz parçaları. Hepsi sunucu bileşeni.

import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Yerleşim ─────────────────────────────────────────────────────────────

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.22em] text-gold", className)}>
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Başlığın italik altın kısmı */
  accent?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative pb-10 pt-10 sm:pb-14 sm:pt-16">
      <Constellation className="pointer-events-none absolute right-0 top-4 hidden w-[420px] opacity-60 md:block" />
      <div className="relative max-w-3xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.01em] text-text sm:text-6xl">
          {title} {accent && <em className="text-gold">{accent}</em>}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-10 sm:py-14", className)}>
      {(eyebrow || title) && (
        <header className="mb-7 max-w-2xl">
          {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="font-display text-3xl font-medium leading-[1.08] text-text sm:text-[2.6rem]">{title}</h2>
          )}
          {lead && <p className="mt-3 text-base leading-relaxed text-muted">{lead}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

// ─── Kartlar ──────────────────────────────────────────────────────────────

type Tone = "default" | "raised" | "gold" | "violet" | "outline";

const toneClass: Record<Tone, string> = {
  default: "bg-surface border border-line",
  raised: "bg-surface-2 border border-line",
  gold: "bg-gold text-gold-ink",
  violet: "bg-violet text-violet-ink",
  outline: "border border-gold/60 bg-surface",
};

export function Card({
  tone = "default",
  className,
  children,
  as: Tag = "div",
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section" | "li";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("rounded-[var(--radius-card)] p-5 sm:p-6", toneClass[tone], className)}>
      {children}
    </Tag>
  );
}

/** Büyük sayı + etiket kutucuğu (bento) */
export function NumberTile({
  value,
  label,
  sub,
  href,
  tone = "default",
  className,
}: {
  value: React.ReactNode;
  label: string;
  sub?: string;
  href?: string;
  tone?: Tone;
  className?: string;
}) {
  const body = (
    <>
      <span className="text-[12px] font-medium opacity-80">{label}</span>
      <span className="font-display text-5xl font-semibold leading-none">{value}</span>
      {sub && <span className="text-[13px] opacity-80">{sub}</span>}
    </>
  );
  const cls = cn(
    "flex min-h-[132px] flex-col justify-between gap-2 rounded-[var(--radius-tile)] p-4",
    toneClass[tone],
    href && "transition-colors hover:border-gold/70",
    className
  );
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-text",
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Butonlar ─────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "light";

const buttonClass: Record<ButtonVariant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-strong",
  secondary: "border border-line-strong text-text hover:border-gold hover:text-gold",
  light: "bg-text text-ink hover:bg-white",
};

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors",
    buttonClass[variant],
    className
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonStyles(variant, className)}>
      {children}
    </Link>
  );
}

// ─── İçerik blokları ──────────────────────────────────────────────────────

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      {items.map((item) => (
        <details key={item.q} className="koz-faq group">
          <summary className="flex min-h-[60px] items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium text-text sm:px-6">
            {item.q}
            <span
              aria-hidden="true"
              className="koz-faq-icon grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-gold transition-transform"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Sayfa sonu çağrı bandı — her sayfanın sonunda hesaplayıcıya yönlendirir */
export function CTABand({
  title = "Senin sayın hangisi?",
  lead = "Doğum tarihini gir, yaşam yolu sayını ve kişisel yorumunu 10 saniyede al.",
  href = "/#hesapla",
  label = "Ücretsiz hesapla",
  secondary,
}: {
  title?: string;
  lead?: string;
  href?: string;
  label?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-[28px] bg-violet px-6 py-10 text-violet-ink sm:px-10 sm:py-14">
        <svg
          aria-hidden="true"
          viewBox="0 0 220 220"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-violet-soft"
        >
          <circle cx="110" cy="110" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="110" cy="110" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="110" cy="110" r="40" fill="currentColor" />
        </svg>
        <div className="relative max-w-xl">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-[#1d1645]">{lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-semibold text-gold transition-colors hover:bg-[#15131f]"
            >
              {label} →
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-violet-ink/40 px-6 text-[15px] font-semibold text-violet-ink transition-colors hover:bg-violet-ink/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({ links }: { links: { href: string; label: string; desc?: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="group flex min-h-[64px] items-center justify-between gap-4 rounded-[var(--radius-tile)] border border-line bg-surface px-5 py-4 transition-colors hover:border-gold/70"
        >
          <span className="flex flex-col">
            <span className="text-[15px] font-medium text-text">{l.label}</span>
            {l.desc && <span className="mt-0.5 text-[13px] text-faint">{l.desc}</span>}
          </span>
          <span aria-hidden="true" className="text-gold transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `https://kozmograf.com${it.href === "/" ? "" : it.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Konum" className="pt-6 text-[13px] text-faint">
      <JsonLd data={ld} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-gold">
                {it.label}
              </Link>
            ) : (
              <span className="text-muted">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Süsleme ──────────────────────────────────────────────────────────────

export function Constellation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 350 200" aria-hidden="true" className={className}>
      <g stroke="var(--color-gold)" strokeWidth="0.6" fill="none" opacity="0.8">
        <path d="M30 150 L90 90 L160 110 L230 40 L310 70" />
        <path d="M160 110 L200 170" />
      </g>
      <g fill="var(--color-text)">
        <circle cx="30" cy="150" r="1.6" />
        <circle cx="90" cy="90" r="2.2" />
        <circle cx="160" cy="110" r="1.6" />
        <circle cx="230" cy="40" r="2.6" />
        <circle cx="310" cy="70" r="1.6" />
        <circle cx="200" cy="170" r="1.4" />
        <circle cx="60" cy="30" r="0.9" />
        <circle cx="280" cy="150" r="0.9" />
        <circle cx="130" cy="20" r="0.9" />
      </g>
    </svg>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify "<" karakterini kaçırmaz; </script> enjeksiyonuna karşı koruma
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
