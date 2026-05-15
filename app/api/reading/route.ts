import { NextRequest } from "next/server";
import { callInworldStream } from "@/lib/claude";
import { getSystemPrompt, buildUserQuery } from "@/lib/prompts";
import type { NumerologyCalculations, ReadingFocus } from "@/types/numerology";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!process.env.INWORLD_API_KEY) {
    return new Response(
      JSON.stringify({ error: "INWORLD_API_KEY ortam değişkeni ayarlanmamış." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: {
    birthDate: string;
    fullName?: string;
    calculations: NumerologyCalculations;
    focus?: ReadingFocus;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Geçersiz istek gövdesi." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { birthDate, fullName, calculations, focus } = body;

  if (!birthDate) {
    return new Response(
      JSON.stringify({ error: "Doğum tarihi eksik." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

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
          const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
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
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}