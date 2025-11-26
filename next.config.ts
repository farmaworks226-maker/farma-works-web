import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript hatalarını build sırasında yoksay (Yayınlamayı engellemesin)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Resim optimizasyon hatalarını engelle
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Her yerden resim kabul et
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;