// Resend ile e-posta gönderimi (https://resend.com/docs/api-reference/emails/send-email)
// Gerekli ortam değişkenleri: RESEND_API_KEY, MAIL_FROM, ADMIN_EMAIL

export interface MailAttachment {
  filename: string;
  /** base64 içerik */
  content: string;
}

export interface MailInput {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export function mailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && !!process.env.MAIL_FROM;
}

export async function sendMail(input: MailInput): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) return { ok: false, error: "E-posta servisi yapılandırılmamış (RESEND_API_KEY / MAIL_FROM)." };

  try {
    // RESEND_API_URL yalnızca test içindir (sahte sunucu); canlıda tanımlanmaz
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
        ...(input.attachments?.length ? { attachments: input.attachments } : {}),
      }),
      signal: AbortSignal.timeout(30_000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("resend error", res.status, data);
      return { ok: false, error: data?.message ?? `Resend HTTP ${res.status}` };
    }
    return { ok: true, id: String(data?.id ?? "") };
  } catch (err) {
    console.error("resend fetch error", err);
    return { ok: false, error: "E-posta servisine ulaşılamadı." };
  }
}

// ─── Basit, e-posta istemcileriyle uyumlu şablon ──────────────────────────

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function emailLayout({ preheader, title, bodyHtml }: { preheader: string; title: string; bodyHtml: string }) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#07070d;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07070d;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0e0d18;border:1px solid #2a2840;border-radius:20px;">
<tr><td style="padding:28px 28px 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#ece8f5;"><img src="https://kozmograf.com/brand/kozmograf-isaret-96.png" width="32" height="32" alt="" style="vertical-align:middle;border:0;border-radius:6px;margin-right:8px;">Kozmograf</td></tr>
<tr><td style="padding:8px 28px 28px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#ece8f5;">
<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-weight:600;font-size:26px;line-height:1.2;color:#ece8f5;">${esc(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #2a2840;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#8a86a3;">
kozmograf.com · Numeroloji yorumları eğlence ve kişisel keşif amaçlıdır.
</td></tr>
</table></td></tr></table></body></html>`;
}

export function kv(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;background:#16141f;border-radius:14px;">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 16px;color:#a6a2bc;font-size:13px;width:40%;">${esc(k)}</td><td style="padding:10px 16px;color:#ece8f5;font-size:15px;font-weight:600;">${esc(v)}</td></tr>`
    )
    .join("")}</table>`;
}

export function button(href: string, label: string) {
  return `<p style="margin:20px 0;"><a href="${esc(href)}" style="display:inline-block;background:#e9c46a;color:#07070d;text-decoration:none;font-weight:600;padding:14px 24px;border-radius:999px;">${esc(label)}</a></p>`;
}

export { esc as escapeHtml };
