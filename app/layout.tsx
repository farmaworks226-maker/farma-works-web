import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO AYARLARI BURADA BAŞLIYOR ---
export const metadata: Metadata = {
  // Buraya ileride gerçek site adresinizi yazacaksınız (örn: https://farmaworks.com.tr)
  metadataBase: new URL('http://localhost:3000'), 
  
  title: {
    default: "Farma Works - Doğal Takviye Edici Gıdalar",
    template: "%s | Farma Works", // Diğer sayfalarda otomatik son ek ekler
  },
  description: "Bilimsel formüllerle geliştirilmiş vitamin, mineral, probiyotik ve özel takviye edici gıdalar. Sağlıklı yaşam için güvenilir adres.",
  keywords: ["takviye edici gıda", "vitamin", "mineral", "probiyotik", "farma works", "eczane", "sağlık"],
  authors: [{ name: "Farma Works" }],
  creator: "Farma Works",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Farma Works - Sağlıklı Yaşamın Öncüsü",
    description: "Doğal ve bilimsel takviye edici gıdalarla sağlığınızı destekleyin.",
    siteName: "Farma Works",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/hero.png", // Paylaşılınca görünecek varsayılan resim
        width: 1200,
        height: 630,
        alt: "Farma Works Ürünleri",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};
// --- SEO AYARLARI BİTTİ ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        
        {children}

        <SiteFooter />
      </body>
    </html>
  );
}