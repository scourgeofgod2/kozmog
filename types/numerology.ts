// Numeroloji TypeScript tip tanımları

export interface NumerologyInput {
  birthDate: string; // "YYYY-MM-DD"
  fullName?: string;
}

export interface NumerologyCalculations {
  lifePath: number;
  birthDay: number;
  personalYear: number;
  destinyNumber?: number;
  soulUrge?: number;
  personalityNumber?: number;
}

export type ReadingFocus =
  | "general"
  | "life_path"
  | "personality"
  | "career"
  | "strengths"
  | "challenges"
  | "relationships";

export interface ReadingResult {
  calculations: NumerologyCalculations;
  interpretation: string;
  readingType: string;
  model: string;
}

export interface CompatibilityLevel {
  label: "excellent" | "high" | "good" | "medium" | "low" | "challenging";
  score: number;
}

export interface CompatibilityResult {
  score: number;
  level: CompatibilityLevel["label"];
  person1LifePath: number;
  person2LifePath: number;
  interpretation: string;
}

export interface NumberData {
  id: number;
  name: string;
  symbol: string;
  element: string;
  planet: string;
  color: string;
  keywords: string[];
  compatibleNumbers: number[];
  meaningShort: string;
  meaningFull: string;
  personality: string;
  career: string;
  love: string;
  strengths: string[];
  challenges: string[];
  isMaster: boolean;
}

export interface MirrorHourData {
  hour: string; // "07:07"
  displayHour: string; // "07.07"
  title: string;
  meaning: string;
  angel: string;
  message: string;
}

export interface CalculationSession {
  birthDate: string;
  fullName?: string;
  timestamp: number;
  readingFocus?: ReadingFocus;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
}