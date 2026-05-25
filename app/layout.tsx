import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SunThemeProvider } from "@/components/providers/SunThemeProvider";
import SunTimeDebugger from "@/components/dev/SunTimeDebugger";
import SunArc from "@/components/ui/SunArc";
import { tr } from "@/content/tr";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kozmograf.com"),
  title: {
    default: tr.seoTitle,
    template: `%s | Kozmograf Numeroloji`,
  },
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  authors: [{ name: "Kozmograf" }],
  creator: "Kozmograf",
  publisher: "Kozmograf",
  alternates: {
    canonical: "https://kozmograf.com",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://kozmograf.com",
    siteName: "Kozmograf Numeroloji",
    title: tr.ogTitle,
    description: tr.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: tr.ogTitle,
    description: tr.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${dmSans.variable} ${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen antialiased">
        <SunThemeProvider>
          <div className="relative min-h-screen">
            <Header />
            <SunArc />
            <div className="flex justify-center pb-6 -mt-2">
              <img
                src="/logo1.png"
                alt="Kozmograf"
                style={{ height: 110, width: "auto", opacity: 0.92 }}
                draggable={false}
              />
            </div>
            <main className="container mx-auto px-4 max-w-7xl py-10">
              {children}
            </main>
            <Footer />
          </div>
          <SunTimeDebugger />
        </SunThemeProvider>
      </body>
    </html>
  );
}