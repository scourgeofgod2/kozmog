import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // PDF kütüphanesi paketlenmeden Node modülü olarak yüklenir
  serverExternalPackages: ["@react-pdf/renderer"],
  async redirects() {
    return [
      // Eski footer linkleri → yeni sayfalar
      { source: "/melek-numeroloji", destination: "/melek-sayilari", permanent: true },
      { source: "/karmik-numeroloji", destination: "/karmik-borc", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;