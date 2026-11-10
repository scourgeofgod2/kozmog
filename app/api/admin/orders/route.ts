import { NextRequest } from "next/server";
import { checkAdmin } from "@/lib/admin/auth";
import { clientIp } from "@/lib/rateLimit";
import { ORDER_STATUSES, deleteOrder, listOrders, setOrderNote, setOrderStatus, type OrderStatus } from "@/lib/db";

export const runtime = "nodejs";

function json(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

const CODE_RE = /^KZ-[A-Z0-9]{5}$/;

/** Sipariş yönetimi: { token, action: "list" | "status" | "note" | "delete", code?, status?, note? } */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek." });
  }
  const auth = checkAdmin(body.token, clientIp(req.headers));
  if (!auth.ok) return json(auth.status, { error: auth.error });

  const code = typeof body.code === "string" ? body.code : "";
  try {
    switch (body.action) {
      case "list":
        return json(200, { orders: listOrders() });
      case "status": {
        const status = body.status as OrderStatus;
        if (!CODE_RE.test(code) || !ORDER_STATUSES.includes(status)) return json(400, { error: "Geçersiz kod ya da durum." });
        setOrderStatus(code, status);
        return json(200, { ok: true });
      }
      case "note":
        if (!CODE_RE.test(code) || typeof body.note !== "string") return json(400, { error: "Geçersiz istek." });
        setOrderNote(code, body.note);
        return json(200, { ok: true });
      case "delete":
        if (!CODE_RE.test(code)) return json(400, { error: "Geçersiz kod." });
        deleteOrder(code);
        return json(200, { ok: true });
      default:
        return json(400, { error: "Bilinmeyen işlem." });
    }
  } catch (err) {
    console.error("[db] admin orders", err);
    return json(500, { error: "Veritabanı hatası. Sunucu loglarına bak (DATABASE_PATH / kalıcı birim)." });
  }
}
