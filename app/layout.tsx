import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderLoader } from "@/components/site-header-loader";

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-comfortaa'
})

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
    <html lang="tr" className={comfortaa.variable}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeaderLoader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}