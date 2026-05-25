"use client";

import { useState, useEffect } from "react";
import { useSunTheme, SUN_THEMES, type TimeSlot } from "@/components/providers/SunThemeProvider";

const SLOT_ICONS: Record<TimeSlot, string> = {
  dawn: "🌅",
  morning: "☀️",
  afternoon: "🌤️",
  evening: "🌇",
  night: "🌙",
};

const SLOT_HOURS: Record<TimeSlot, number> = {
  dawn: 6,
  morning: 10,
  afternoon: 15,
  evening: 19,
  night: 23,
};

export default function SunTimeDebugger() {
  const { theme, currentHour, isManual, setManualHour } = useSunTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            background: "#080810",
            border: `1px solid ${theme.gold}40`,
            boxShadow: `0 0 32px ${theme.gold}20, 0 8px 40px rgba(0,0,0,0.6)`,
            borderRadius: "0px",
            padding: "16px",
            marginBottom: "10px",
            minWidth: "240px",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <p
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: theme.gold,
                marginBottom: "4px",
              }}
            >
              ✦ Güneş Tema Testi
            </p>
            <p style={{ fontSize: "11px", color: "#5E5E7A" }}>
              Aktif: {SLOT_ICONS[theme.slot]} {theme.label}
              {isManual && " (Manuel)"}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {(Object.keys(SUN_THEMES) as TimeSlot[]).map((slot) => {
              const t = SUN_THEMES[slot];
              const isActive = theme.slot === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setManualHour(SLOT_HOURS[slot])}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    background: isActive ? t.gold + "12" : "transparent",
                    border: `1px solid ${isActive ? t.gold + "50" : "#1E1E3A"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "16px", lineHeight: 1 }}>
                    {SLOT_ICONS[slot]}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: isActive ? t.gold : "#7B7A9E",
                        letterSpacing: "0.06em",
                        marginBottom: "1px",
                      }}
                    >
                      {t.label}
                    </p>
                    <p style={{ fontSize: "10px", color: "#3E3D5C" }}>
                      {slot === "night" ? "22:00 – 05:00" : `${t.hourRange[0]}:00 – ${t.hourRange[1]}:00`}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: t.gold,
                      opacity: isActive ? 1 : 0.25,
                      boxShadow: isActive ? `0 0 8px ${t.gold}` : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {isManual && (
            <button
              onClick={() => setManualHour(null)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "7px",
                background: "transparent",
                border: "1px solid #1E1E3A",
                color: "#5E5E7A",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              ↩ Gerçek Saate Dön
            </button>
          )}

          <p
            style={{
              marginTop: "10px",
              fontSize: "10px",
              color: "#3E3D5C",
              textAlign: "center",
            }}
          >
            Saat: {String(currentHour).padStart(2, "0")}:00
          </p>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          background: "#080810",
          border: `1px solid ${theme.gold}50`,
          boxShadow: `0 0 20px ${theme.gold}20`,
          cursor: "pointer",
          fontSize: "20px",
          transition: "all 0.2s",
          marginLeft: "auto",
        }}
        title="Güneş Tema Testi"
      >
        {open ? "✕" : SLOT_ICONS[theme.slot]}
      </button>
    </div>
  );
}