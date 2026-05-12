"use server";

// AI Yorum Server Action — claude.gg API (OpenAI-compatible) kullanır

import { callClaude } from "@/lib/claude";
import { getSystemPrompt, buildUserQuery } from "@/lib/prompts";
import type { NumerologyCalculations, ReadingFocus, ReadingResult } from "@/types/numerology";

export interface GetReadingResult {
  success: boolean;
  data?: ReadingResult;
  error?: string;
}

export async function getReading(params: {
  birthDate: string;
  fullName?: string;
  calculations: NumerologyCalculations;
  focus?: ReadingFocus;
}): Promise<GetReadingResult> {
  const { birthDate, fullName, calculations, focus } = params;

  if (!birthDate) {
    return { success: false, error: "Doğum tarihi eksik." };
  }

  if (!process.env.CORTEX_KEY) {
    return { success: false, error: "API yapılandırması eksik. CORTEX_KEY ortam değişkeni ayarlanmamış." };
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

    const rawText = await callClaude(systemPrompt, userQuery);

    // Convert markdown to basic HTML
    const interpretation = rawText
      .replace(/^## (.+)$/gm, "<h3>$1</h3>")
      .replace(/^### (.+)$/gm, "<h4>$1</h4>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<[hul])(.+)$/gm, "<p>$1</p>")
      .replace(/<p><\/p>/g, "");

    const result: ReadingResult = {
      calculations,
      interpretation,
      readingType: focus ?? "general",
      model: "claude-sonnet-4-6",
    };

    return { success: true, data: result };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.";
    return { success: false, error: message };
  }
}