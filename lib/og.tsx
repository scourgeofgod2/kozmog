// Paylaşım görseli (Open Graph) çizimi: /api/og ve app/opengraph-image ortak kullanır.
import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content/profiles";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOg({
  lp,
  name,
  eyebrow,
  title,
  big,
}: {
  lp?: number | null;
  name?: string;
  eyebrow?: string;
  title?: string;
  big?: string;
}) {
  const profile = lp ? getProfile(lp) : undefined;
  return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#07070d",
          color: "#ece8f5",
          padding: 64,
          gap: 48,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 30, color: "#e9c46a", letterSpacing: 2 }}>
            <svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill="#e9c46a" /></svg>
            KOZMOGRAF
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, color: "#a6a2bc" }}>
              {eyebrow ?? (lp ? (name ? `${name} · Yaşam yolu sayısı` : "Yaşam yolu sayım") : "Ücretsiz numeroloji")}
            </div>
            <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 8 }}>
              {title ?? (profile ? profile.title : "Doğum tarihin ne söylüyor?")}
            </div>
            {profile && <div style={{ fontSize: 32, color: "#a6a2bc", marginTop: 12 }}>{profile.keyword}</div>}
          </div>
          <div style={{ fontSize: 30, color: "#e9c46a" }}>Seninki ne? → kozmograf.com</div>
        </div>
        <div
          style={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e9c46a",
            color: "#1a1405",
            borderRadius: 48,
            fontSize: big ? (big.length > 3 ? 130 : 200) : lp && lp > 9 ? 230 : 300,
            fontWeight: 700,
          }}
        >
          {big ?? lp ?? <svg width="200" height="200" viewBox="0 0 24 24"><path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill="#1a1405" /></svg>}
        </div>
      </div>,
    { ...OG_SIZE, headers: { "Cache-Control": "public, max-age=86400, immutable" } }
  );
}
