"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { decodeOrder, formatDateTR, formatTL, type Order } from "@/lib/order";
import { getPackage, type ReportSection } from "@/lib/content/packages";
import { markdownToHtml } from "@/lib/markdown";
import { buttonStyles } from "@/components/ds";

const SECTION_TITLES: Record<ReportSection, string> = {
  harita: "Kozmik Harita",
  yil: "2027 Yıl Rehberi",
  ask: "Aşk Uyum Raporu",
};

const TOKEN_KEY = "kz-admin-token";

type Status = "idle" | "loading" | "done" | "error";

function readHashOrder(): Order | null {
  const m = window.location.hash.match(/[#&]o=([^&]+)/);
  return m ? decodeOrder(m[1]) : null;
}

// Hash yalnızca tarayıcıda var; sunucuda null döner
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export default function ReportStudio() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  const order = hash ? readHashOrder() : null;

  const [token, setToken] = useState("");
  const [texts, setTexts] = useState<Partial<Record<ReportSection, string>>>({});
  const [status, setStatus] = useState<Partial<Record<ReportSection, Status>>>({});
  const [errors, setErrors] = useState<Partial<Record<ReportSection, string>>>({});

  useEffect(() => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      if (t) setToken(t);
    } catch {
      /* depolama yok */
    }
  }, []);

  if (!hash) return <p className="py-20 text-center text-muted">Yükleniyor…</p>;
  if (!order) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Sipariş linki geçersiz</h1>
        <p className="mt-2 text-muted">WhatsApp mesajındaki rapor linkini eksiksiz açtığından emin ol.</p>
      </div>
    );
  }

  const pkg = getPackage(order.pkg)!;

  async function generate(section: ReportSection) {
    setStatus((s) => ({ ...s, [section]: "loading" }));
    setErrors((e) => ({ ...e, [section]: undefined }));
    setTexts((t) => ({ ...t, [section]: "" }));
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* depolama yok */
    }
    try {
      const res = await fetch("/api/admin/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, order, section }),
      });
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error ?? `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          const p = JSON.parse(data);
          if (p.error) throw new Error(p.error);
          if (p.text) setTexts((t) => ({ ...t, [section]: (t[section] ?? "") + p.text }));
        }
      }
      setStatus((s) => ({ ...s, [section]: "done" }));
    } catch (err) {
      setErrors((e) => ({ ...e, [section]: err instanceof Error ? err.message : "Hata" }));
      setStatus((s) => ({ ...s, [section]: "error" }));
    }
  }

  const allDone = pkg.sections.every((s) => status[s] === "done");
  const first = order.name.split(" ")[0];
  const contactIsEmail = order.contact.includes("@");
  const msg = `Merhaba ${first}, Kozmograf ${pkg.name} raporun hazır ✨ PDF'i ekte gönderiyorum. Sipariş: ${order.code}`;
  const sendHref = contactIsEmail
    ? `mailto:${order.contact}?subject=${encodeURIComponent(`Kozmograf raporun hazır (${order.code})`)}&body=${encodeURIComponent(msg)}`
    : `https://wa.me/${order.contact.replace(/^0/, "90").replace(/^(?!90)/, "90")}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="mx-auto max-w-3xl pb-16 pt-8">
      {/* ── Yönetim paneli (yazdırmada gizli) ── */}
      <div className="no-print flex flex-col gap-4">
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">Rapor stüdyosu</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">
            {order.code} · {pkg.name}
          </h1>
          <dl className="mt-3 grid gap-1 text-[14px] text-muted sm:grid-cols-2">
            <div>
              <dt className="inline text-faint">Tutar: </dt>
              <dd className="inline text-text">{formatTL(pkg.price)}</dd>
            </div>
            <div>
              <dt className="inline text-faint">Teslimat: </dt>
              <dd className="inline text-text">{order.contact}</dd>
            </div>
            <div>
              <dt className="inline text-faint">Kişi: </dt>
              <dd className="inline text-text">
                {order.name} · {formatDateTR(order.birthDate)}
              </dd>
            </div>
            {order.partnerName && (
              <div>
                <dt className="inline text-faint">Partner: </dt>
                <dd className="inline text-text">
                  {order.partnerName} · {formatDateTR(order.partnerBirthDate!)}
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-3 text-[13px] text-faint">Önce banka uygulamandan {formatTL(pkg.price)} ödemenin ve &quot;{order.code}&quot; açıklamasının geldiğini kontrol et.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="admin-token" className="text-[13px] font-medium text-muted">
            Yönetici anahtarı (bu cihazda hatırlanır)
          </label>
          <input
            id="admin-token"
            type="password"
            autoComplete="current-password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="h-[52px] w-full rounded-[14px] border border-line bg-ink px-4 text-[16px] text-text outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {pkg.sections.map((s) => (
            <button
              key={s}
              type="button"
              disabled={!token || status[s] === "loading"}
              onClick={() => generate(s)}
              className={buttonStyles(status[s] === "done" ? "secondary" : "primary", "disabled:opacity-50")}
            >
              {status[s] === "loading" ? `${SECTION_TITLES[s]} yazılıyor…` : status[s] === "done" ? `${SECTION_TITLES[s]}: yeniden üret` : `${SECTION_TITLES[s]} üret`}
            </button>
          ))}
        </div>
        {pkg.sections.map((s) =>
          errors[s] ? (
            <p key={s} role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
              {SECTION_TITLES[s]}: {errors[s]}
            </p>
          ) : null
        )}

        {allDone && (
          <div className="flex flex-wrap gap-2 rounded-[var(--radius-card)] border border-gold/60 bg-surface p-4">
            <button type="button" onClick={() => window.print()} className={buttonStyles("primary")}>
              PDF olarak kaydet
            </button>
            <a href={sendHref} target="_blank" rel="noopener noreferrer" className={buttonStyles("secondary")}>
              Müşteriye {contactIsEmail ? "e-posta" : "WhatsApp"} aç
            </a>
            <p className="w-full text-[13px] text-faint">
              Yazdır penceresinde hedef olarak &quot;PDF olarak kaydet&quot;i seç, &quot;Arka plan grafikleri&quot; açık olsun.
            </p>
          </div>
        )}
      </div>

      {/* ── Rapor belgesi (PDF'e giden kısım) ── */}
      {Object.keys(texts).length > 0 && (
        <article className="koz-report mt-8 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-10">
          <header className="border-b border-line pb-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-gold">✦ Kozmograf</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-tight">{pkg.name}</h1>
            <p className="mt-2 text-[15px] text-muted">
              {order.name} · {formatDateTR(order.birthDate)}
              {order.partnerName && ` & ${order.partnerName} · ${formatDateTR(order.partnerBirthDate!)}`}
            </p>
            <p className="mt-1 text-[13px] text-faint">Sipariş {order.code}</p>
          </header>
          {pkg.sections.map((s) =>
            texts[s] ? (
              <section key={s} className="koz-report-section mt-8">
                {pkg.sections.length > 1 && <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">{SECTION_TITLES[s]}</p>}
                <div className="koz-prose mt-2" dangerouslySetInnerHTML={{ __html: markdownToHtml(texts[s]!) }} />
              </section>
            ) : null
          )}
          <footer className="mt-10 border-t border-line pt-4 text-[12px] text-faint">
            Bu rapor Pisagor numerolojisine dayanır ve kişisel keşif amaçlıdır; tıbbi, hukuki veya finansal tavsiye yerine geçmez. kozmograf.com
          </footer>
        </article>
      )}
    </div>
  );
}
