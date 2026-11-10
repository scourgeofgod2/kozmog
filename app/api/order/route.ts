import { NextRequest } from "next/server";
import { getPackage } from "@/lib/content/packages";
import { DELIVERY_PROMISE } from "@/lib/content/packages";
import { encodeOrder, formatDateTR, formatPhoneTR, formatTL, newOrderCode, validateOrderInput, type Order } from "@/lib/order";
import { clientIp, hit } from "@/lib/rateLimit";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

// Sipariş oluşturur ve ödeme bilgisini döner. Ödeme telefonu yalnızca burada,
// sunucu ortam değişkeninden (PAYMENT_PHONE) okunur; sayfa HTML'inde yer almaz.
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    if (!origin || new URL(origin).host !== req.headers.get("host")) return json(403, { error: "İzin verilmeyen istek." });
  } catch {
    return json(403, { error: "İzin verilmeyen istek." });
  }

  if (!hit(`order:${clientIp(req.headers)}`, 10, 60 * 60_000)) {
    return json(429, { error: "Çok fazla sipariş denemesi. Biraz sonra tekrar dene." });
  }

  const phone = (process.env.PAYMENT_PHONE ?? "").replace(/\D/g, "");
  if (phone.length < 10) {
    console.error("PAYMENT_PHONE is not configured");
    return json(503, { error: "Ödeme şu anda alınamıyor. Lütfen daha sonra tekrar dene." });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek." });
  }

  const v = validateOrderInput(body);
  if (!v.ok) return json(400, { error: v.error });

  const pkg = getPackage(v.order.pkg)!;
  const order: Order = { ...v.order, code: newOrderCode(), createdAt: new Date().toISOString() };
  const adminLink = `${SITE_URL}/yonetim/rapor#o=${encodeOrder(order)}`;

  const lines = [
    `Merhaba, Kozmograf siparişim: *${order.code}*`,
    `Paket: ${pkg.name} (${formatTL(pkg.price)})`,
    `Ad soyad: ${order.name} · ${formatDateTR(order.birthDate)}`,
    ...(order.partnerName && order.partnerBirthDate
      ? [`Partner: ${order.partnerName} · ${formatDateTR(order.partnerBirthDate)}`]
      : []),
    `Teslimat: ${order.contact}`,
    "",
    "Ödemeyi yaptım, dekontu ekliyorum.",
    "",
    `(Kozmograf rapor linki: ${adminLink})`,
  ];
  const wa = `https://wa.me/90${phone.replace(/^90/, "").replace(/^0/, "")}?text=${encodeURIComponent(lines.join("\n"))}`;

  // Yedek kayıt: kişisel veri yok, sadece kod/paket/tutar
  console.log(`[siparis] ${order.code} ${pkg.slug} ${pkg.price}TL`);

  return json(200, {
    code: order.code,
    amount: pkg.price,
    amountText: formatTL(pkg.price),
    packageName: pkg.name,
    paymentPhone: formatPhoneTR(phone),
    whatsappUrl: wa,
    delivery: DELIVERY_PROMISE,
  });
}
