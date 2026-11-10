// Google Tag Manager + Consent Mode v2 yardımcıları (yalnızca tarayıcı).

export const GTM_ID = "GTM-5GVN63CH";
/** GA4 doğrudan gtag ile yüklenir; GTM içine ayrıca GA4 etiketi EKLENMEMELİ (çift sayım). */
export const GA4_ID = "G-1S33KE05BF";
export const CONSENT_KEY = "kz-cerez-onayi"; // "granted" | "denied"
export const CONSENT_EVENT = "kz:cerez-tercihleri"; // banner'ı yeniden açar

/**
 * GTM hiç yüklenmeyen yollar: URL'de kişisel veri taşıyanlar.
 *  /sonuc   → ?d=doğum tarihi&n=isim
 *  /yonetim → #o=sipariş verisi
 */
export const ANALYTICS_EXCLUDED = ["/sonuc", "/yonetim"];

export function isExcludedPath(pathname: string) {
  return ANALYTICS_EXCLUDED.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

type DataLayerWindow = Window & { dataLayer?: unknown[] };

/** gtag() ile aynı biçim: dataLayer.push(arguments) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- imza gtag ile aynı; değerler arguments ile okunur
export function gtag(..._args: unknown[]) {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params -- Consent Mode arguments nesnesi bekler
  w.dataLayer.push(arguments);
}

/** Kendi anonim sayacımıza (/api/t) sinyal; çerez yok, yalnızca sayfa yolu/olay adı */
export function beacon(data: Record<string, string>) {
  try {
    const body = JSON.stringify(data);
    if (!navigator.sendBeacon?.("/api/t", body)) {
      fetch("/api/t", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* sessiz */
  }
}

/** Kişisel veri İÇERMEYEN özel olay gönderir (GTM'de "Custom Event" tetikleyicisiyle yakalanır). */
export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  // GA4 (gtag) olayı
  gtag("event", event, params);
  beacon({ e: event });
  // GTM "Custom Event" tetikleyicileri için
  w.dataLayer.push({ event, ...params });
}

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* depolama yok */
  }
  gtag("consent", "update", {
    analytics_storage: v,
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
}
