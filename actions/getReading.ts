"use server";

// AI Yorum Server Action
// PHP result.php + numerology_api.php getNumerologyReading() fonksiyonunun karşılığı

import { getNumerologyReading } from "@/lib/gemini";
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

  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "API yapılandırması eksik." };
  }

  try {
    const result = await getNumerologyReading({
      birthDate,
      fullName,
      calculations,
      focus,
    });

    return { success: true, data: result };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.";
    return { success: false, error: message };
  }
}