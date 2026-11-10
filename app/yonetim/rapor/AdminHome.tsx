"use client";

import { useCallback, useEffect, useState } from "react";
import { buttonStyles } from "@/components/ds";
import { getPackage } from "@/lib/content/packages";
import { orderToHash } from "@/lib/orderHash";
import ManualOrder from "./ManualOrder";
import Dashboard from "./Dashboard";
import type { OrderRow, OrderStatus } from "@/lib/db";

const TOKEN_KEY = "kz-admin-token";
const LABEL: Record<OrderStatus, string> = { bekliyor: "Bekliyor", odendi: "Ödendi", gonderildi: "Gönderildi", iptal: "İptal" };
const BADGE: Record<OrderStatus, string> = {
  bekliyor: "bg-surface-3 text-text",
  odendi: "bg-gold text-ink",
  gonderildi: "bg-[#2f7d5b] text-white",
  iptal: "bg-rose/20 text-rose",
};
const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "";
const dateTR = (iso: string) => iso.split("-").reverse().join(".");

export default function AdminHome() {
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "hepsi">("hepsi");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"genel" | "siparisler">("genel");

  const call = useCallback(
    async (payload: object, tk = token) => {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tk, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
      return data;
    },
    [token]
  );

  const load = useCallback(
    async (tk = token) => {
      setBusy(true);
      setError(null);
      try {
        const d = await call({ action: "list" }, tk);
        setOrders(d.orders);
        try {
          localStorage.setItem(TOKEN_KEY, tk);
        } catch {
          /* depolama yok */
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Hata");
      } finally {
        setBusy(false);
      }
    },
    [call, token]
  );

  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(TOKEN_KEY) ?? "";
    } catch {
      /* depolama yok */
    }
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- kayıtlı anahtarla tek seferlik yükleme
      setToken(saved);
      load(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeStatus(code: string, status: OrderStatus) {
    try {
      await call({ action: "status", code, status });
      setOrders((os) => os?.map((o) => (o.code === code ? { ...o, status } : o)) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    }
  }

  async function remove(code: string) {
    if (!window.confirm(`${code} siparişi kalıcı olarak silinsin mi?`)) return;
    try {
      await call({ action: "delete", code });
      setOrders((os) => os?.filter((o) => o.code !== code) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    }
  }

  function openStudio(o: OrderRow) {
    window.location.hash = orderToHash({
      pkg: o.pkg,
      name: o.name,
      birthDate: o.birth_date,
      ...(o.partner_name ? { partnerName: o.partner_name, partnerBirthDate: o.partner_birth_date } : {}),
      contact: o.email,
      code: o.code,
      createdAt: o.created_at,
    });
  }

  const shown = orders?.filter((o) => filter === "hepsi" || o.status === filter) ?? [];
  const count = (s: OrderStatus) => orders?.filter((o) => o.status === s).length ?? 0;
  const revenue = orders?.filter((o) => o.status === "odendi" || o.status === "gonderildi").reduce((t, o) => t + o.price, 0) ?? 0;

  return (
    <div className="mx-auto max-w-4xl pb-16 pt-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">Yönetim</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">Kozmograf paneli</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end"
      >
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="admin-token" className="text-[13px] font-medium text-muted">
            Yönetici anahtarı (ADMIN_TOKEN)
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
        <button type="submit" disabled={!token || busy} className={buttonStyles("primary", "disabled:opacity-50")}>
          {busy ? "Yükleniyor…" : orders ? "Yenile" : "Giriş"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
          {error}
        </p>
      )}

      {orders && (
        <div className="mt-6 flex gap-1 border-b border-line" role="tablist" aria-label="Panel bölümleri">
          {(
            [
              ["genel", "Genel bakış"],
              ["siparisler", `Siparişler (${orders.length})`],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={
                "-mb-px min-h-[44px] border-b-2 px-4 text-[14px] font-semibold " +
                (tab === k ? "border-gold text-text" : "border-transparent text-muted hover:text-text")
              }
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {orders && tab === "genel" && (
        <div className="mt-5">
          <Dashboard token={token} />
        </div>
      )}

      {orders && tab === "siparisler" && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["bekliyor", "odendi", "gonderildi"] as OrderStatus[]).map((s) => (
              <div key={s} className="rounded-[16px] border border-line bg-surface p-3">
                <p className="text-[12px] text-muted">{LABEL[s]}</p>
                <p className="font-display text-3xl font-semibold">{count(s)}</p>
              </div>
            ))}
            <div className="rounded-[16px] bg-gold p-3 text-gold-ink">
              <p className="text-[12px] font-semibold">Tahsil edilen</p>
              <p className="font-display text-3xl font-semibold">{revenue.toLocaleString("tr-TR")} TL</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Duruma göre filtrele">
            {(["hepsi", "bekliyor", "odendi", "gonderildi", "iptal"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={
                  "min-h-[40px] rounded-full border px-4 text-[13px] " +
                  (filter === f ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-text")
                }
              >
                {f === "hepsi" ? `Tümü (${orders.length})` : `${LABEL[f]} (${count(f)})`}
              </button>
            ))}
          </div>

          <ul className="mt-4 flex flex-col gap-3">
            {shown.length === 0 && <li className="rounded-[16px] border border-dashed border-line p-6 text-center text-muted">Sipariş yok.</li>}
            {shown.map((o) => (
              <li key={o.code} className="rounded-[var(--radius-card)] border border-line bg-surface p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-semibold">
                      {o.code} <span className="text-[15px] font-normal text-muted">· {getPackage(o.pkg)?.name ?? o.pkg} · {o.price} TL</span>
                    </p>
                    <p className="mt-1 text-[14px] text-text">
                      {o.name} · {dateTR(o.birth_date)}
                      {o.partner_name && ` & ${o.partner_name} · ${dateTR(o.partner_birth_date ?? "")}`}
                    </p>
                    <p className="text-[13px] text-muted">
                      {o.email} · {fmt(o.created_at)}
                      {o.delivered_at && ` · gönderim ${fmt(o.delivered_at)}`}
                    </p>
                  </div>
                  <span className={"rounded-full px-3 py-1 text-[12px] font-semibold " + BADGE[o.status]}>{LABEL[o.status]}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="sr-only" htmlFor={`d-${o.code}`}>
                    Durum
                  </label>
                  <select
                    id={`d-${o.code}`}
                    value={o.status}
                    onChange={(e) => changeStatus(o.code, e.target.value as OrderStatus)}
                    className="min-h-[44px] rounded-full border border-line bg-ink px-4 text-[14px] text-text"
                  >
                    {(Object.keys(LABEL) as OrderStatus[]).map((s) => (
                      <option key={s} value={s}>
                        {LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={() => openStudio(o)} className={buttonStyles("primary", "min-h-[44px] px-5 text-[14px]")}>
                    Stüdyoyu aç
                  </button>
                  <button type="button" onClick={() => remove(o.code)} className="ml-auto min-h-[44px] px-3 text-[13px] text-faint hover:text-rose">
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <details className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <summary className="cursor-pointer text-[15px] font-semibold text-text">Siparişi elle aç</summary>
        <div className="mt-4">
          <ManualOrder />
        </div>
      </details>
    </div>
  );
}
