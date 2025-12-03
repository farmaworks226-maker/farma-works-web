import type { NextConfig } from "next";

// BURASI DEĞİŞTİ: enabled: true yaptık.
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === true, 
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
};

export default withBundleAnalyzer(nextConfig);