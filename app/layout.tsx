import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { tr } from "@/content/tr";

// latin-ext: Türkçe ğ, ş, ı, İ harfleri için şart
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07070d",
  colorScheme: "dark",
};

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
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: tr.ogTitle,
    description: tr.ogDescription,
    images: ["/api/og"],
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
    <html lang="tr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="koz-sky min-h-screen font-sans antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
