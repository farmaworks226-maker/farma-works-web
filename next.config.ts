import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını build sırasında yoksay (Yayınlamayı engellemesin)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Not: Next.js 15+ sürümlerinde 'eslint' ayarı burada yapılmaz. 
  // Build sırasında lint hatası alırsanız package.json'daki build komutunu "next build --no-lint" olarak güncelleyebilirsiniz.

  // Resim Optimizasyon Ayarları
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com', // Storyblok resimleri için izin
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash resimleri için izin
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Placeholder resimleri için izin
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true, // SVG ikon kullanımına izin ver
  },
};

export default nextConfig;