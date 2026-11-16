import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'standalone',
  distDir: 'build',
  images: {
    unoptimized: true,
  },
  // Enable ISR
  experimental: {

  },
  // Vietnamese public URLs mapped onto the app routes
  async rewrites() {
    return [
      { source: '/san-pham', destination: '/products' },
      { source: '/san-pham/:slug', destination: '/products/:slug' },
      { source: '/giai-phap', destination: '/solutions' },
      { source: '/gioi-thieu', destination: '/about' },
      { source: '/bao-gia', destination: '/quote' },
      { source: '/lien-he', destination: '/contact' },
      { source: '/tin-tuc', destination: '/news' },
      { source: '/tin-tuc/danh-muc/:category', destination: '/news/category/:category' },
      { source: '/tin-tuc/:slug', destination: '/news/:slug' },
    ];
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}

export default nextConfig;
