"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, GA4_ID, GTM_ID, gtag, isExcludedPath, readConsent, saveConsent } from "@/lib/analytics";

let gtmLoaded = false;

function loadGtm() {
  if (gtmLoaded) return;
  gtmLoaded = true;
  const stored = readConsent();
  // Consent Mode v2: onay verilmeden çerez yok
  gtag("consent", "default", {
    analytics_storage: stored ?? "denied",
    ad_storage: stored ?? "denied",
    ad_user_data: stored ?? "denied",
    ad_personalization: stored ?? "denied",
    wait_for_update: 500,
  });
  // GA4 (gtag.js)
  gtag("js", new Date());
  gtag("config", GA4_ID);
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(ga);

  // Google Tag Manager (diğer etiketler için)
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export default function Analytics() {
  const pathname = usePathname();
  const excluded = isExcludedPath(pathname);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (excluded) return;
    loadGtm();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tarayıcı depolamasını okumak için tek seferlik
    setShowBanner(readConsent() === null);
  }, [excluded]);

  useEffect(() => {
    const open = () => setShowBanner(true);
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  if (excluded || !showBanner) return null;

  const choose = (v: "granted" | "denied") => {
    saveConsent(v);
    setShowBanner(false);
  };

  return (
    <div
      role="region"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-3 bottom-3 z-[55] mx-auto flex max-w-xl flex-col gap-3 rounded-[20px] border border-line bg-surface-2/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-[13px] leading-relaxed text-muted">
        Siteyi geliştirmek için analitik çerezler kullanmak istiyoruz.{" "}
        <Link href="/gizlilik#cerezler" className="text-gold underline underline-offset-2">
          Ayrıntılar
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-[44px] flex-1 rounded-full border border-line-strong px-4 text-[14px] font-semibold text-text hover:border-gold sm:flex-none"
        >
          Reddet
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-[44px] flex-1 rounded-full bg-gold px-4 text-[14px] font-semibold text-ink hover:bg-gold-strong sm:flex-none"
        >
          Kabul et
        </button>
      </div>
    </div>
  );
}

/** Footer'daki "Çerez tercihleri" bağlantısı */
export function ConsentLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className="inline-flex min-h-[36px] items-center hover:text-gold"
    >
      Çerez tercihleri
    </button>
  );
}
