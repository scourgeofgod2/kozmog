import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { tr } from "@/content/tr";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: tr.seoTitle,
    template: `%s | Kozmograf Numeroloji`,
  },
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  authors: [{ name: "Kozmograf" }],
  creator: "Kozmograf",
  publisher: "Kozmograf",
  metadataBase: new URL("https://kozmograf.com"),
  alternates: {
    canonical: "/",
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
    <html lang="tr" className={inter.variable}>
      <body className="font-sans bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 max-w-7xl py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
