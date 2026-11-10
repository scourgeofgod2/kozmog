import { NextRequest } from "next/server";
import { getPackage, DELIVERY_PROMISE } from "@/lib/content/packages";
import { encodeOrder, formatDateTR, formatPhoneTR, formatTL, newOrderCode, validateOrderInput, type Order } from "@/lib/order";
import { clientIp, hit } from "@/lib/rateLimit";
import { SITE_URL } from "@/lib/site";
import { button, emailLayout, escapeHtml, kv, sendMail } from "@/lib/mail";
import { insertOrder, safely } from "@/lib/db";

export const runtime = "nodejs";

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

/**
 * Sipariş oluşturur:
 *  1. Yöneticiye sipariş + rapor stüdyosu linki e-postası (gönderilemezse sipariş alınmaz)
 *  2. Müşteriye sipariş onayı + ödeme talimatı e-postası
 *  3. Ödeme bilgisini döner (telefon yalnızca PAYMENT_PHONE ortam değişkeninden)
 */
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
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (phone.length < 10 || !adminEmail) {
    console.error("PAYMENT_PHONE or ADMIN_EMAIL is not configured");
    return json(503, { error: "Sipariş şu anda alınamıyor. Lütfen daha sonra tekrar dene." });
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
  const studioLink = `${SITE_URL}/yonetim/rapor#o=${encodeOrder(order)}`;
  const paymentPhone = formatPhoneTR(phone);
  const first = order.name.split(" ")[0];

  const people: [string, string][] = [
    ["Ad soyad", `${order.name} · ${formatDateTR(order.birthDate)}`],
    ...(order.partnerName && order.partnerBirthDate
      ? ([["Partner", `${order.partnerName} · ${formatDateTR(order.partnerBirthDate)}`]] as [string, string][])
      : []),
  ];

  // 1) Yönetici bildirimi — kritik
  const admin = await sendMail({
    to: adminEmail,
    replyTo: order.contact,
    subject: `Yeni sipariş ${order.code} · ${pkg.name} · ${formatTL(pkg.price)}`,
    text: `Yeni sipariş: ${order.code}\nPaket: ${pkg.name} (${formatTL(pkg.price)})\n${people.map(([k, v]) => `${k}: ${v}`).join("\n")}\nE-posta: ${order.contact}\n\nBankada "${order.code}" açıklamalı ${formatTL(pkg.price)} ödemeyi kontrol et, sonra raporu üret:\n${studioLink}`,
    html: emailLayout({
      preheader: `${pkg.name} · ${formatTL(pkg.price)} · ${order.contact}`,
      title: `Yeni sipariş ${order.code}`,
      bodyHtml: `${kv([["Paket", pkg.name], ["Tutar", formatTL(pkg.price)], ...people, ["Teslim e-postası", order.contact]])}
<p style="margin:0 0 8px;color:#a6a2bc;">Bankada <strong style="color:#ece8f5;">${order.code}</strong> açıklamalı ${escapeHtml(formatTL(pkg.price))} ödemeyi kontrol et, ardından raporu üretip gönder.</p>
${button(studioLink, "Rapor stüdyosunu aç")}`,
    }),
  });
  if (!admin.ok) {
    console.error(`[siparis] ${order.code} yönetici e-postası gönderilemedi: ${admin.error}`);
    return json(502, { error: "Siparişin şu anda alınamadı. Lütfen birkaç dakika sonra tekrar dene." });
  }

  // Veritabanı kaydı (hata siparişi düşürmez; e-posta asıl kayıttır)
  safely(() => insertOrder(order, pkg.price), `insert ${order.code}`);

  // 2) Müşteri onayı — gönderilemezse sipariş yine geçerli, ekranda bilgiler var
  const customer = await sendMail({
    to: order.contact,
    replyTo: adminEmail,
    subject: `Siparişin alındı: ${order.code} · ${pkg.name}`,
    text: `Merhaba ${first},\n\n${pkg.name} siparişin alındı (${order.code}).\n\nÖdeme: Banka uygulamanda Para Gönder > Kolay Adres (telefon numarası)\nTelefon: ${paymentPhone}\nTutar: ${formatTL(pkg.price)}\nAçıklama: ${order.code}\n\nÖdemen onaylanınca raporun ${DELIVERY_PROMISE} bu adrese PDF olarak gelecek.\n\nKozmograf`,
    html: emailLayout({
      preheader: `Ödeme bilgilerin ve sipariş kodun: ${order.code}`,
      title: `Siparişin alındı, ${first}`,
      bodyHtml: `<p style="margin:0 0 12px;"><strong style="color:#e9c46a;">${escapeHtml(pkg.name)}</strong> siparişini aldık. Ödemeyi banka uygulamanda <strong>Para Gönder → Kolay Adres (telefon numarası)</strong> ile yapabilirsin:</p>
${kv([["Kolay Adres (telefon)", paymentPhone], ["Tutar", formatTL(pkg.price)], ["Açıklama", order.code]])}
<p style="margin:0 0 12px;">Açıklamaya sipariş kodunu yazmayı unutma. Ödemen onaylanınca raporun <strong>${DELIVERY_PROMISE}</strong> bu adrese PDF olarak gelecek.</p>
<p style="margin:0;color:#a6a2bc;">Dekontu ya da bir sorunu iletmek için bu e-postayı yanıtlayabilirsin.</p>`,
    }),
  });

  console.log(`[siparis] ${order.code} ${pkg.slug} ${pkg.price}TL musteri-eposta:${customer.ok ? "ok" : "hata"}`);

  return json(200, {
    code: order.code,
    amountText: formatTL(pkg.price),
    packageName: pkg.name,
    paymentPhone,
    email: order.contact,
    emailSent: customer.ok,
    delivery: DELIVERY_PROMISE,
  });
}
