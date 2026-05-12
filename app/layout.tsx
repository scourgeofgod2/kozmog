import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { tr } from "@/content/tr";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
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
      <body className="font-sans bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen antialiased">
        <div className="relative min-h-screen">
          {/* Subtle background gradient */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,80,220,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,80,220,0.15),transparent)]" />
          <Header />
          <main className="container mx-auto px-4 max-w-7xl py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}