import { NextRequest } from "next/server";
import { checkAdmin } from "@/lib/admin/auth";
import { clientIp } from "@/lib/rateLimit";
import { ordersSince, statsSince, todayTR } from "@/lib/db";
import { packages } from "@/lib/content/packages";

export const runtime = "nodejs";

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

const top = (m: Map<string, number>, n = 8) =>
  [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([key, count]) => ({ key, count }));

/** Panel istatistikleri: { token, days: 7 | 30 | 90 } */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek." });
  }
  const auth = checkAdmin(body.token, clientIp(req.headers));
  if (!auth.ok) return json(auth.status, { error: auth.error });

  const days = [7, 30, 90].includes(Number(body.days)) ? Number(body.days) : 30;
  const dayList: string[] = [];
  for (let i = days - 1; i >= 0; i--) dayList.push(todayTR(new Date(Date.now() - i * 86_400_000)));
  const from = dayList[0];

  try {
    const rows = statsSince(from);
    const orders = ordersSince(new Date(Date.now() - days * 86_400_000).toISOString());

    const daily = new Map(dayList.map((d) => [d, { day: d, ziyaretci: 0, goruntuleme: 0, hesaplama: 0, siparis: 0, odenen: 0 }]));
    const sources = new Map<string, number>();
    const pages = new Map<string, number>();
    const devices = new Map<string, number>();
    const events = new Map<string, number>();

    for (const r of rows) {
      const d = daily.get(r.day);
      if (r.kind === "uv" && d) d.ziyaretci += r.count;
      else if (r.kind === "pv") {
        if (d) d.goruntuleme += r.count;
        pages.set(r.key, (pages.get(r.key) ?? 0) + r.count);
      } else if (r.kind === "src") sources.set(r.key, (sources.get(r.key) ?? 0) + r.count);
      else if (r.kind === "cihaz") devices.set(r.key, (devices.get(r.key) ?? 0) + r.count);
      else if (r.kind === "evt") {
        events.set(r.key, (events.get(r.key) ?? 0) + r.count);
        if (r.key === "hesaplama" && d) d.hesaplama += r.count;
      }
    }

    const paid = orders.filter((o) => o.status === "odendi" || o.status === "gonderildi");
    for (const o of orders) {
      const d = daily.get(todayTR(new Date(o.created_at)));
      if (d) {
        d.siparis += 1;
        if (o.status === "odendi" || o.status === "gonderildi") d.odenen += 1;
      }
    }

    const byPkg = packages.map((p) => {
      const mine = orders.filter((o) => o.pkg === p.slug);
      const mp = mine.filter((o) => o.status === "odendi" || o.status === "gonderildi");
      return { key: p.name, siparis: mine.length, odenen: mp.length, gelir: mp.reduce((t, o) => t + o.price, 0) };
    });

    const totals = {
      ziyaretci: [...daily.values()].reduce((t, d) => t + d.ziyaretci, 0),
      goruntuleme: [...daily.values()].reduce((t, d) => t + d.goruntuleme, 0),
      hesaplama: events.get("hesaplama") ?? 0,
      siparis: orders.length,
      odenen: paid.length,
      gelir: paid.reduce((t, o) => t + o.price, 0),
      bekleyen: orders.filter((o) => o.status === "bekliyor").length,
    };

    const funnel = [
      { key: "Ziyaretçi", count: totals.ziyaretci },
      { key: "Hesaplama yaptı", count: totals.hesaplama },
      { key: "Paketlere baktı", count: pages.get("/paketler") ?? 0 },
      { key: "Sipariş verdi", count: totals.siparis },
      { key: "Ödedi", count: totals.odenen },
    ];

    return json(200, {
      days,
      daily: [...daily.values()],
      totals,
      sources: top(sources),
      pages: top(pages, 10),
      devices: top(devices),
      byPkg,
      funnel,
    });
  } catch (err) {
    console.error("[db] stats", err);
    return json(500, { error: "Veritabanı hatası. Sunucu loglarına bak." });
  }
}
