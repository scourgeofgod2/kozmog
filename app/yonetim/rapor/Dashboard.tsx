"use client";

import { useCallback, useEffect, useState } from "react";

// Grafik çubuğu rengi: koyu zeminde doğrulandı (dataviz validator: L 0.48–0.67, kontrast ≥ 3:1)
const BAR = "#b88c34";
const BAR_HOVER = "#e9c46a";

interface Day {
  day: string;
  ziyaretci: number;
  goruntuleme: number;
  hesaplama: number;
  siparis: number;
  odenen: number;
}
interface KV {
  key: string;
  count: number;
}
interface Stats {
  days: number;
  daily: Day[];
  totals: { ziyaretci: number; goruntuleme: number; hesaplama: number; siparis: number; odenen: number; gelir: number; bekleyen: number };
  sources: KV[];
  pages: KV[];
  devices: KV[];
  byPkg: { key: string; siparis: number; odenen: number; gelir: number }[];
  funnel: KV[];
}

const n = (x: number) => x.toLocaleString("tr-TR");
const shortDay = (d: string) => {
  const [, m, g] = d.split("-");
  return `${g}.${m}`;
};
const pct = (a: number, b: number) => (b > 0 ? `%${((a / b) * 100).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}` : "–");

/** Üst köşeleri 4px yuvarlak, tabana oturan çubuk */
function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  if (h <= 0) return "";
  return `M${x} ${y + h} V${y + r} Q${x} ${y} ${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h} Z`;
}

function DailyBars({ title, data, field, unit }: { title: string; data: Day[]; field: keyof Day; unit: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720;
  const H = 180;
  const PAD_B = 22;
  const vals = data.map((d) => Number(d[field]));
  const max = Math.max(1, ...vals);
  const step = W / data.length;
  const gap = data.length > 40 ? 1 : 2;
  const bw = Math.max(1, step - gap);
  const plotH = H - PAD_B - 8;
  const labelIdx = new Set([0, Math.floor((data.length - 1) / 2), data.length - 1]);
  const total = vals.reduce((t, v) => t + v, 0);

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[14px] font-semibold text-text">{title}</h3>
        <p className="text-[13px] text-muted">
          Toplam <strong className="text-text">{n(total)}</strong> {unit}
        </p>
      </div>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-[180px] w-full" role="img" aria-label={`${title}, günlük`} preserveAspectRatio="none">
          <line x1="0" x2={W} y1={H - PAD_B} y2={H - PAD_B} stroke="var(--color-line)" strokeWidth="1" />
          {vals.map((v, i) => {
            const h = (v / max) * plotH;
            return (
              <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <rect x={i * step} y="0" width={step} height={H - PAD_B} fill="transparent" />
                <path d={barPath(i * step + gap / 2, H - PAD_B - h, bw, h)} fill={hover === i ? BAR_HOVER : BAR} />
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none mt-1 flex justify-between text-[11px] text-faint">
          {data.map((d, i) => (labelIdx.has(i) ? <span key={d.day}>{shortDay(d.day)}</span> : null))}
        </div>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 rounded-[10px] border border-line bg-ink px-3 py-2 text-[12px] shadow-xl"
            style={{ left: `clamp(0px, calc(${((hover + 0.5) / data.length) * 100}% - 60px), calc(100% - 120px))`, width: 120 }}
          >
            <p className="text-muted">{shortDay(data[hover].day)}</p>
            <p className="text-[15px] font-semibold text-text">
              {n(vals[hover])} {unit}
            </p>
          </div>
        )}
      </div>
      <details className="mt-2">
        <summary className="cursor-pointer text-[12px] text-faint hover:text-text">Tablo olarak gör</summary>
        <table className="mt-2 w-full text-[13px]">
          <tbody>
            {data.map((d, i) => (
              <tr key={d.day} className="border-t border-line">
                <td className="py-1 text-muted">{d.day}</td>
                <td className="py-1 text-right text-text">{n(vals[i])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}

function BarList({ title, items, format = n, empty = "Henüz veri yok." }: { title: string; items: KV[]; format?: (x: number) => string; empty?: string }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-surface p-4">
      <h3 className="text-[14px] font-semibold text-text">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-[13px] text-faint">{empty}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5">
          {items.map((it) => (
            <li key={it.key} title={`${it.key}: ${format(it.count)}`}>
              <div className="flex items-baseline justify-between gap-3 text-[13px]">
                <span className="truncate text-muted">{it.key}</span>
                <span className="font-semibold text-text">{format(it.count)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-surface-3">
                <div className="h-2 rounded-full" style={{ width: `${Math.max(2, (it.count / max) * 100)}%`, background: BAR }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Dashboard({ token }: { token: string }) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, days }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.error ?? `HTTP ${res.status}`);
      setData(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    }
  }, [token, days]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dönem değişince veriyi yükle
    load();
  }, [load]);

  const t = data?.totals;
  const kpis = t
    ? [
        { label: "Ziyaretçi", value: n(t.ziyaretci) },
        { label: "Sayfa görüntüleme", value: n(t.goruntuleme) },
        { label: "Hesaplama", value: n(t.hesaplama), sub: pct(t.hesaplama, t.ziyaretci) + " ziyaretçi" },
        { label: "Sipariş", value: n(t.siparis), sub: `${t.bekleyen} bekliyor` },
        { label: "Dönüşüm", value: pct(t.odenen, t.ziyaretci), sub: "ödeyen / ziyaretçi" },
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="tablist" aria-label="Dönem">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={days === d}
              onClick={() => setDays(d)}
              className={"min-h-[40px] rounded-full border px-4 text-[13px] " + (days === d ? "border-gold bg-gold text-ink" : "border-line text-muted hover:text-text")}
            >
              Son {d} gün
            </button>
          ))}
        </div>
        <button type="button" onClick={load} className="min-h-[40px] px-3 text-[13px] text-muted hover:text-gold">
          Yenile
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
          {error}
        </p>
      )}

      {!data && !error && <div className="koz-skeleton h-40 rounded-[var(--radius-card)]" />}

      {data && t && (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            <div className="col-span-2 rounded-[16px] bg-gold p-4 text-gold-ink sm:col-span-1">
              <p className="text-[12px] font-semibold">Tahsilat</p>
              <p className="whitespace-nowrap font-display text-2xl font-semibold sm:text-[1.65rem]">{n(t.gelir)} TL</p>
              <p className="text-[12px]">{t.odenen} ödenen sipariş</p>
            </div>
            {kpis.map((k) => (
              <div key={k.label} className="rounded-[16px] border border-line bg-surface p-4">
                <p className="text-[12px] text-muted">{k.label}</p>
                <p className="font-display text-3xl font-semibold text-text">{k.value}</p>
                {k.sub && <p className="text-[12px] text-faint">{k.sub}</p>}
              </div>
            ))}
          </div>

          <DailyBars title="Günlük ziyaretçi" data={data.daily} field="ziyaretci" unit="ziyaretçi" />
          <div className="grid gap-4 md:grid-cols-2">
            <DailyBars title="Günlük hesaplama" data={data.daily} field="hesaplama" unit="hesaplama" />
            <DailyBars title="Günlük sipariş" data={data.daily} field="siparis" unit="sipariş" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <BarList title="Satış hunisi" items={data.funnel} />
            <BarList title="Trafik kaynakları (girişler)" items={data.sources} empty="Henüz kaynak verisi yok." />
            <BarList title="En çok görüntülenen sayfalar" items={data.pages} />
            <BarList
              title="Paketlere göre tahsilat"
              items={data.byPkg.map((p) => ({ key: `${p.key} · ${p.odenen}/${p.siparis} ödendi`, count: p.gelir }))}
              format={(x) => `${n(x)} TL`}
            />
            <BarList title="Cihaz" items={data.devices} />
          </div>
          <p className="text-[12px] text-faint">
            Sayılar çerezsiz ve anonimdir: kişi bazında kayıt yok, IP saklanmaz. Tekil ziyaretçi günlük sayılır. Bot trafiği
            filtrelenir. Ayrıntılı analiz için Google Analytics.
          </p>
        </>
      )}
    </div>
  );
}
