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
  metadataBase: new URL('https://fw.com.tr'),
  title: {
    default: 'FW İlaç | Sağlıklı Yaşam İçin Takviyeler',
    template: '%s | FW İlaç',
  },
  description: 'Yüksek kaliteli gıda takviyeleri ile sağlıklı yaşam yolculuğunuzda yanınızdayız. Vitaminler, mineraller, probiyotikler ve daha fazlası.',
  keywords: ['gıda takviyesi', 'vitamin', 'mineral', 'probiyotik', 'omega 3', 'sağlık', 'takviye', 'FW İlaç', 'Farma Works'],
  authors: [{ name: 'FW İlaç' }],
  creator: 'FW İlaç',
  publisher: 'FW İlaç',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://fw.com.tr',
    siteName: 'FW İlaç',
    title: 'FW İlaç | Sağlıklı Yaşam İçin Takviyeler',
    description: 'Yüksek kaliteli gıda takviyeleri ile sağlıklı yaşam yolculuğunuzda yanınızdayız.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FW İlaç - Gıda Takviyeleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FW İlaç | Sağlıklı Yaşam İçin Takviyeler',
    description: 'Yüksek kaliteli gıda takviyeleri ile sağlıklı yaşam yolculuğunuzda yanınızdayız.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://fw.com.tr',
  },
  verification: {
    google: 'vwXksXl8cwbSsBdSgeQd-EL4ZKG5tqKfD1XbBJF2fT4',
  },
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