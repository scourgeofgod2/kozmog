"use server";

// Hesaplama Server Action
// PHP index.php AJAX handler'ının karşılığı

import { calculateAll } from "@/lib/numerology";
import type { NumerologyInput, NumerologyCalculations } from "@/types/numerology";

export interface CalculateResult {
  success: boolean;
  calculations?: NumerologyCalculations;
  sessionData?: {
    birthDate: string;
    fullName?: string;
    timestamp: number;
  };
  error?: string;
}

export async function calculateNumerology(
  input: NumerologyInput
): Promise<CalculateResult> {
  const { birthDate, fullName } = input;

  // Doğrulama
  if (!birthDate) {
    return { success: false, error: "Lütfen doğum tarihinizi girin." };
  }

  // Gelecek tarih kontrolü
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const selected = new Date(birthDate);
  if (selected > today) {
    return { success: false, error: "Doğum tarihi gelecekte olamaz." };
  }

  // Min yıl kontrolü
  if (selected.getFullYear() < 1900) {
    return { success: false, error: "Geçerli bir doğum tarihi girin." };
  }

  try {
    const calculations = calculateAll(birthDate, fullName);

    return {
      success: true,
      calculations,
      sessionData: {
        birthDate,
        fullName: fullName?.trim() || undefined,
        timestamp: Date.now(),
      },
    };
  } catch {
    return { success: false, error: "Hesaplama hatası oluştu. Lütfen tekrar deneyin." };
  }
}