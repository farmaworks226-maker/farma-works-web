import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderLoader } from "@/components/site-header-loader"; // Yeni oluşturduğumuz bileşeni import ediyoruz

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farma Works",
  description: "Sağlıklı yaşam için güvenilir gıda takviyeleri.",
};

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
        {/* Artık SiteHeaderLoader'ı kullanıyoruz */}
        <SiteHeaderLoader />
        
        {children}

        <SiteFooter />
      </body>
    </html>
  );
}