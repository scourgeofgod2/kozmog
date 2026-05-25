"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  getThemeForHour,
  SUN_THEMES,
  type SunThemeConfig,
  type TimeSlot,
} from "@/lib/sunTheme";

interface SunThemeContextValue {
  theme: SunThemeConfig;
  currentHour: number;
  isManual: boolean;
  setManualHour: (hour: number | null) => void;
}

const SunThemeContext = createContext<SunThemeContextValue | null>(null);

function applyTheme(theme: SunThemeConfig) {
  const root = document.documentElement;
  root.style.setProperty("--koz-gold", theme.gold);
  root.style.setProperty("--koz-gold-dim", theme.goldDim);
  root.style.setProperty("--koz-violet", theme.violet);
  root.style.setProperty("--koz-violet-bright", theme.violetBright);
  root.style.setProperty("--koz-violet-dim", theme.violetDim);
  root.style.setProperty("--koz-star", theme.star);
  root.style.setProperty("--sun-glow-1", theme.bodyGlow1);
  root.style.setProperty("--sun-glow-2", theme.bodyGlow2);
  root.style.setProperty("--sun-glow-3", theme.bodyGlow3);
  root.style.setProperty("--sun-rule-gradient", theme.ruleGradient);
  root.style.setProperty("--sun-btn-hover", theme.btnHover);
  root.style.setProperty("--sun-color", theme.sunColor);
  root.style.setProperty("--sun-glow-color", theme.sunGlow);
  root.style.setProperty("--sun-horizon", theme.horizonColor);
  root.style.setProperty("--sun-horizon-glow", theme.horizonGlow);
  root.style.setProperty("--sun-sky-top", theme.skyTop);
  root.style.setProperty("--sun-sky-mid", theme.skyMid);
  root.style.setProperty("--sun-position", theme.sunPosition + "%");
  root.setAttribute("data-time-slot", theme.slot);
}

export function SunThemeProvider({ children }: { children: ReactNode }) {
  const [currentHour, setCurrentHour] = useState<number>(14);
  const [manualHour, setManualHourState] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const activeHour = manualHour !== null ? manualHour : currentHour;
  const theme = getThemeForHour(activeHour);

  const setManualHour = useCallback((hour: number | null) => {
    setManualHourState(hour);
  }, []);

  useEffect(() => {
    const realHour = new Date().getHours();
    setCurrentHour(realHour);
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mounted) applyTheme(theme);
  }, [theme, mounted]);

  return (
    <SunThemeContext.Provider
      value={{ theme, currentHour: activeHour, isManual: manualHour !== null, setManualHour }}
    >
      {children}
    </SunThemeContext.Provider>
  );
}

export function useSunTheme() {
  const ctx = useContext(SunThemeContext);
  if (!ctx) throw new Error("useSunTheme must be used inside SunThemeProvider");
  return ctx;
}

export { SUN_THEMES, type TimeSlot, type SunThemeConfig };