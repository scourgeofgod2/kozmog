import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content/profiles";
import { sanitizeName } from "@/lib/validation";

export const runtime = "nodejs";

const VALID = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]);

// Paylaşım görseli: /api/og?lp=7&n=Elif  (lp yoksa genel site görseli)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lpRaw = Number(searchParams.get("lp"));
  const lp = VALID.has(lpRaw) ? lpRaw : null;
  const name = sanitizeName(searchParams.get("n"))?.split(" ")[0]?.slice(0, 20);
  const profile = lp ? getProfile(lp) : undefined;

  return new ImageResponse(
    (
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
              {lp ? (name ? `${name} · Yaşam yolu sayısı` : "Yaşam yolu sayım") : "Ücretsiz numeroloji"}
            </div>
            <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 8 }}>
              {profile ? profile.title : "Doğum tarihin ne söylüyor?"}
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
            fontSize: lp && lp > 9 ? 230 : 300,
            fontWeight: 700,
          }}
        >
          {lp ?? <svg width="200" height="200" viewBox="0 0 24 24"><path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" fill="#1a1405" /></svg>}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    }
  );
}
