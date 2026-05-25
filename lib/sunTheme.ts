export type TimeSlot = "dawn" | "morning" | "afternoon" | "evening" | "night";

export interface SunThemeConfig {
  slot: TimeSlot;
  label: string;
  hourRange: [number, number];
  gold: string;
  goldDim: string;
  violet: string;
  violetBright: string;
  violetDim: string;
  star: string;
  bodyGlow1: string;
  bodyGlow2: string;
  bodyGlow3: string;
  ruleGradient: string;
  btnHover: string;
  sunPosition: number;
  sunColor: string;
  sunGlow: string;
  horizonColor: string;
  horizonGlow: string;
  skyTop: string;
  skyMid: string;
}

export const SUN_THEMES: Record<TimeSlot, SunThemeConfig> = {
  dawn: {
    slot: "dawn",
    label: "Şafak",
    hourRange: [5, 8],
    gold: "#FF7A3D",
    goldDim: "#C04A10",
    violet: "#C2185B",
    violetBright: "#F06292",
    violetDim: "#7B003A",
    star: "#FFD0B0",
    bodyGlow1: "rgba(255,100,40,0.28)",
    bodyGlow2: "rgba(194,24,91,0.16)",
    bodyGlow3: "rgba(255,140,60,0.14)",
    ruleGradient: "linear-gradient(90deg, transparent, #FF7A3D 30%, #F06292 70%, transparent)",
    btnHover: "#FF9A6A",
    sunPosition: 8,
    sunColor: "#FF6B1A",
    sunGlow: "rgba(255,107,26,0.7)",
    horizonColor: "rgba(255,100,40,0.50)",
    horizonGlow: "rgba(255,160,80,0.35)",
    skyTop: "rgba(10,5,20,0.95)",
    skyMid: "rgba(60,15,30,0.60)",
  },
  morning: {
    slot: "morning",
    label: "Sabah",
    hourRange: [8, 13],
    gold: "#FFE033",
    goldDim: "#C4A800",
    violet: "#1565C0",
    violetBright: "#42A5F5",
    violetDim: "#0D2B5E",
    star: "#B3E5FF",
    bodyGlow1: "rgba(255,220,0,0.22)",
    bodyGlow2: "rgba(21,101,192,0.18)",
    bodyGlow3: "rgba(66,165,245,0.12)",
    ruleGradient: "linear-gradient(90deg, transparent, #FFE033 30%, #42A5F5 70%, transparent)",
    btnHover: "#FFE866",
    sunPosition: 42,
    sunColor: "#FFD700",
    sunGlow: "rgba(255,215,0,0.80)",
    horizonColor: "rgba(255,200,0,0.40)",
    horizonGlow: "rgba(100,180,255,0.30)",
    skyTop: "rgba(5,10,30,0.90)",
    skyMid: "rgba(10,30,70,0.55)",
  },
  afternoon: {
    slot: "afternoon",
    label: "Öğleden Sonra",
    hourRange: [13, 18],
    gold: "#FF4500",
    goldDim: "#B02000",
    violet: "#AD1457",
    violetBright: "#E91E8C",
    violetDim: "#6A0030",
    star: "#FFAB8F",
    bodyGlow1: "rgba(255,69,0,0.30)",
    bodyGlow2: "rgba(173,20,87,0.20)",
    bodyGlow3: "rgba(255,120,50,0.15)",
    ruleGradient: "linear-gradient(90deg, transparent, #FF4500 30%, #E91E8C 70%, transparent)",
    btnHover: "#FF6633",
    sunPosition: 74,
    sunColor: "#FF2200",
    sunGlow: "rgba(255,60,0,0.85)",
    horizonColor: "rgba(255,69,0,0.55)",
    horizonGlow: "rgba(255,140,50,0.40)",
    skyTop: "rgba(5,5,15,0.97)",
    skyMid: "rgba(40,5,15,0.65)",
  },
  evening: {
    slot: "evening",
    label: "Akşam",
    hourRange: [18, 22],
    gold: "#F5C842",
    goldDim: "#A8882B",
    violet: "#7C3AED",
    violetBright: "#9B59F5",
    violetDim: "#3B1F7A",
    star: "#C4B5FD",
    bodyGlow1: "rgba(124,58,237,0.20)",
    bodyGlow2: "rgba(245,200,66,0.10)",
    bodyGlow3: "rgba(124,58,237,0.10)",
    ruleGradient: "linear-gradient(90deg, transparent, #F5C842 30%, #7C3AED 70%, transparent)",
    btnHover: "#FFD966",
    sunPosition: 94,
    sunColor: "#F5C842",
    sunGlow: "rgba(245,200,66,0.75)",
    horizonColor: "rgba(124,58,237,0.25)",
    horizonGlow: "rgba(155,89,245,0.20)",
    skyTop: "rgba(8,8,16,0.95)",
    skyMid: "rgba(20,10,50,0.60)",
  },
  night: {
    slot: "night",
    label: "Gece",
    hourRange: [22, 5],
    gold: "#A78BFA",
    goldDim: "#5B3FC4",
    violet: "#1A0050",
    violetBright: "#6D28D9",
    violetDim: "#0D0030",
    star: "#E9E0FF",
    bodyGlow1: "rgba(109,40,217,0.18)",
    bodyGlow2: "rgba(167,139,250,0.08)",
    bodyGlow3: "rgba(26,0,80,0.25)",
    ruleGradient: "linear-gradient(90deg, transparent, #A78BFA 30%, #6D28D9 70%, transparent)",
    btnHover: "#BBA8FF",
    sunPosition: 0,
    sunColor: "#C4B5FD",
    sunGlow: "rgba(196,181,253,0.50)",
    horizonColor: "rgba(109,40,217,0.25)",
    horizonGlow: "rgba(167,139,250,0.15)",
    skyTop: "rgba(2,2,10,0.99)",
    skyMid: "rgba(8,0,25,0.80)",
  },
};

export function getTimeSlot(hour: number): TimeSlot {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 13) return "morning";
  if (hour >= 13 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

export function getThemeForHour(hour: number): SunThemeConfig {
  return SUN_THEMES[getTimeSlot(hour)];
}