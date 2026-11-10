import { NextRequest } from "next/server";
import { checkAdmin } from "@/lib/admin/auth";
import { clientIp } from "@/lib/rateLimit";
import { validateOrderInput, formatDateTR } from "@/lib/order";
import { getPackage, type ReportSection } from "@/lib/content/packages";
import { renderReportPdf } from "@/lib/pdf/ReportPdf";
import { sendMail, emailLayout, escapeHtml } from "@/lib/mail";
import { CONTACT_EMAIL } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 60;

const SECTION_TITLES: Record<ReportSection, string> = {
  harita: "Kozmik Harita",
  yil: "2027 Yıl Rehberi",
  ask: "Aşk Uyum Raporu",
};

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

/**
 * Rapor PDF'ini üretir.
 *  mode "preview": PDF'i döner (yönetici kontrol eder)
 *  mode "send":    PDF'i müşterinin e-postasına Resend ile gönderir
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek." });
  }
  const auth = checkAdmin(body.token, clientIp(req.headers));
  if (!auth.ok) return json(auth.status, { error: auth.error });

  const raw = body.order && typeof body.order === "object" ? (body.order as Record<string, unknown>) : {};
  const v = validateOrderInput({ ...raw, consent: true });
  if (!v.ok) return json(400, { error: v.error });
  const order = v.order;
  const code = typeof raw.code === "string" && /^KZ-[A-Z0-9]{5}$/.test(raw.code) ? raw.code : null;
  if (!code) return json(400, { error: "Sipariş kodu geçersiz." });

  const pkg = getPackage(order.pkg)!;
  const texts = (body.texts && typeof body.texts === "object" ? body.texts : {}) as Record<string, unknown>;
  const sections = pkg.sections.map((s) => ({ s, md: typeof texts[s] === "string" ? (texts[s] as string).slice(0, 60_000) : "" }));
  if (sections.some((x) => x.md.trim().length < 200)) return json(400, { error: "Tüm bölümler üretilmeden PDF hazırlanamaz." });

  const subtitle = `${order.name} · ${formatDateTR(order.birthDate)}${
    order.partnerName && order.partnerBirthDate ? `  &  ${order.partnerName} · ${formatDateTR(order.partnerBirthDate)}` : ""
  }`;

  let pdf: Buffer;
  try {
    pdf = await renderReportPdf({
      title: pkg.name,
      subtitle,
      code,
      sections: sections.map((x) => ({ label: pkg.sections.length > 1 ? SECTION_TITLES[x.s] : undefined, markdown: x.md })),
    });
  } catch (err) {
    console.error("pdf render error", err);
    return json(500, { error: "PDF oluşturulamadı." });
  }

  const filename = `Kozmograf-${pkg.name.replace(/\s+/g, "-")}-${code}.pdf`;

  if (body.mode === "preview") {
    return new Response(new Uint8Array(pdf), {
      headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${filename}"`, "Cache-Control": "no-store" },
    });
  }

  const first = order.name.split(" ")[0];
  const sent = await sendMail({
    to: order.contact,
    replyTo: process.env.ADMIN_EMAIL || CONTACT_EMAIL,
    subject: `${first}, ${pkg.name} raporun hazır ✦`,
    text: `Merhaba ${first},\n\n${pkg.name} raporun ekte PDF olarak seni bekliyor. Sipariş kodun: ${code}.\n\nSoruların için bu e-postayı yanıtlayabilirsin.\n\nKozmograf\nkozmograf.com`,
    html: emailLayout({
      preheader: `${pkg.name} raporun ekte.`,
      title: `${first}, raporun hazır`,
      bodyHtml: `<p style="margin:0 0 12px;">Merhaba ${escapeHtml(first)},</p>
<p style="margin:0 0 12px;"><strong style="color:#e9c46a;">${escapeHtml(pkg.name)}</strong> raporun bu e-postanın ekinde PDF olarak seni bekliyor. Telefonuna kaydedip istediğin zaman tekrar okuyabilirsin.</p>
<p style="margin:0 0 12px;color:#a6a2bc;">Sipariş kodu: ${code}</p>
<p style="margin:0;">Soruların ya da yorumun olursa bu e-postayı yanıtlaman yeterli.</p>`,
    }),
    attachments: [{ filename, content: pdf.toString("base64") }],
  });
  if (!sent.ok) return json(502, { error: sent.error });

  console.log(`[teslim] ${code} ${pkg.slug}`);
  return json(200, { ok: true, to: order.contact, id: sent.id });
}
