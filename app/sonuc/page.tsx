import type { Metadata } from "next";
import Link from "next/link";
import { calculateAll } from "@/lib/numerology";
import { parseBirthDate, sanitizeName } from "@/lib/validation";
import { getProfile } from "@/lib/content/profiles";
import ResultCard from "@/components/results/ResultCard";
import AIStreamingReading from "@/components/results/AIStreamingReading";
import ShareButton from "@/components/ui/ShareButton";
import { ButtonLink, Card, Eyebrow, RelatedLinks, ReportPromo, buttonStyles } from "@/components/ds";

interface PageProps {
  searchParams: Promise<{ d?: string; n?: string }>;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const birthDate = parseBirthDate(params.d);
  const name = sanitizeName(params.n);
  if (!birthDate) return { title: "Numeroloji Sonucu", robots: { index: false } };

  const lp = calculateAll(birthDate).lifePath;
  const profile = getProfile(lp);
  const title = `${name ? name + " — " : ""}Yaşam Yolu ${lp}: ${profile?.title ?? ""}`;
  const og = `/api/og?lp=${lp}${name ? `&n=${encodeURIComponent(name.split(" ")[0])}` : ""}`;

  return {
    title,
    description: `Yaşam yolu sayım ${lp} (${profile?.title}). Senin sayın hangisi? Kozmograf'ta ücretsiz hesapla.`,
    robots: { index: false, follow: true },
    openGraph: { title, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, images: [og] },
  };
}

export default async function SonucPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const birthDate = parseBirthDate(params.d);
  const fullName = sanitizeName(params.n);

  if (!birthDate) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <Card>
          <Eyebrow className="mb-2">Bir sorun var</Eyebrow>
          <h1 className="font-display text-3xl font-semibold">Doğum tarihi bulunamadı</h1>
          <p className="mt-3 text-muted">Link eksik ya da hatalı olabilir. Tarihini yeniden girerek hesaplayabilirsin.</p>
          <ButtonLink href="/#hesapla" className="mt-6 w-full">
            Hesaplayıcıya dön
          </ButtonLink>
        </Card>
      </div>
    );
  }

  const calculations = calculateAll(birthDate, fullName);
  const firstName = fullName?.split(" ")[0];

  return (
    <div className="mx-auto max-w-4xl pb-6 pt-6 sm:pt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/#hesapla" className="inline-flex min-h-[44px] items-center gap-2 text-[14px] text-muted hover:text-gold">
          ← Yeni hesaplama
        </Link>
        <p className="text-[14px] text-faint">
          {fullName && <span className="text-muted">{fullName} · </span>}
          {formatDate(birthDate)}
        </p>
      </div>

      <header className="mb-7">
        <Eyebrow className="mb-3">Numeroloji haritan</Eyebrow>
        <h1 className="font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
          {firstName ? (
            <>
              {firstName}, sayıların <em className="text-gold">hazır.</em>
            </>
          ) : (
            <>
              Sayıların <em className="text-gold">hazır.</em>
            </>
          )}
        </h1>
      </header>

      <div className="flex flex-col gap-4">
        <ResultCard calculations={calculations} />

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton
            className="sm:flex-1"
            text={`Yaşam yolu sayım ${calculations.lifePath}: ${getProfile(calculations.lifePath)?.title}. Seninki ne?`}
          />
          <Link href="/uyumluluk" className={buttonStyles("secondary", "sm:flex-1")}>
            ♥ Sevgilinle uyumun
          </Link>
        </div>

        <AIStreamingReading birthDate={birthDate} fullName={fullName} />

        <ReportPromo />

        <section className="pt-6">
          <h2 className="mb-4 font-display text-2xl font-semibold">Devam et</h2>
          <RelatedLinks
            links={[
              { href: "/kisisel-yil", label: "2027 kişisel yılın", desc: "Yeni yılın teması" },
              { href: "/karmik-borc", label: "Karmik borç sayın var mı?", desc: "13, 14, 16, 19" },
              { href: "/melek-sayilari", label: "Melek sayıları", desc: "111, 222, 444…" },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
