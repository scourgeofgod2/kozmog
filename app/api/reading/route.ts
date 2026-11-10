import { NextRequest } from "next/server";
import { callInworldStream } from "@/lib/claude";
import { getSystemPrompt, buildUserQuery } from "@/lib/prompts";
import { calculateAll } from "@/lib/numerology";
import { parseBirthDate, sanitizeName, parseFocus } from "@/lib/validation";
import { hit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

// IP başına: 5 dakikada 5, günde 20 yorum. Tüm site: günde READING_DAILY_CAP (varsayılan 3000).
const PER_IP_SHORT = { limit: 5, windowMs: 5 * 60_000 };
const PER_IP_DAY = { limit: 20, windowMs: 24 * 60 * 60_000 };
const GLOBAL_DAY_CAP = Number(process.env.READING_DAILY_CAP ?? 3000);

function json(status: number, body: object, extra?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!process.env.INWORLD_API_KEY) {
    console.error("INWORLD_API_KEY is not set");
    return json(500, { error: "Servis şu anda kullanılamıyor." });
  }

  // Başka sitelerin / scriptlerin API'yi doğrudan kullanmasını zorlaştır.
  if (!isSameOrigin(req)) {
    return json(403, { error: "İzin verilmeyen istek." });
  }

  const ip = clientIp(req.headers);
  if (
    !hit(`short:${ip}`, PER_IP_SHORT.limit, PER_IP_SHORT.windowMs) ||
    !hit(`day:${ip}`, PER_IP_DAY.limit, PER_IP_DAY.windowMs)
  ) {
    return json(
      429,
      { error: "Çok fazla istek gönderdin. Biraz sonra tekrar dene." },
      { "Retry-After": "300" }
    );
  }
  if (!hit("global", GLOBAL_DAY_CAP, PER_IP_DAY.windowMs)) {
    return json(503, { error: "Bugünlük yoğunluk sınırına ulaştık. Yarın tekrar dene." });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Geçersiz istek gövdesi." });
  }

  const birthDate = parseBirthDate(body.birthDate);
  if (!birthDate) {
    return json(400, { error: "Geçerli bir doğum tarihi gir." });
  }
  const fullName = sanitizeName(body.fullName);
  const focus = parseFocus(body.focus);

  // Sayılar istemciden alınmaz, sunucuda yeniden hesaplanır.
  const calculations = calculateAll(birthDate, fullName);

  try {
    const systemPrompt = getSystemPrompt(focus);
    const userQuery = buildUserQuery({
      birthDate,
      fullName,
      lifePath: calculations.lifePath,
      birthDay: calculations.birthDay,
      personalYear: calculations.personalYear,
      destinyNumber: calculations.destinyNumber,
      soulUrge: calculations.soulUrge,
      personalityNumber: calculations.personalityNumber,
    });

    const inworldStream = await callInworldStream(systemPrompt, userQuery);

    const encoder = new TextEncoder();

    const responseStream = new ReadableStream({
      async start(controller) {
        const reader = inworldStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              break;
            }
            const sseChunk = `data: ${JSON.stringify({ text: value })}\n\n`;
            controller.enqueue(encoder.encode(sseChunk));
          }
        } catch (err) {
          console.error("reading stream error", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Yorum oluşturulurken bir sorun oldu. Tekrar dene." })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("reading error", err);
    return json(502, { error: "Yorum servisine ulaşılamadı. Tekrar dene." });
  }
}