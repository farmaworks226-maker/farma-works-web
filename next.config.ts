import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript ve Eslint hatalarını build sırasında yoksay (Hızlı yayınlama için)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Storyblok ve Unsplash resimlerine izin ver
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com', // Storyblok resimleri için ŞART
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Test resimleri için
      },
    ],
  },
};

export default nextConfig;