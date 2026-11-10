import { renderOg, OG_SIZE } from "@/lib/og";

// Tüm sayfalar için varsayılan paylaşım görseli
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Kozmograf — Ücretsiz numeroloji";

export default function Image() {
  return renderOg({});
}
