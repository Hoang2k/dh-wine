import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  // Redirects configuration
  async rewrites() {
    return [
      { source: '/tin-tuc', destination: '/news' },
      { source: '/tin-tuc/:slug', destination: '/news/:slug' },
      { source: '/gioi-thieu', destination: '/about' },
      { source: '/dat-lich-vieng', destination: '/book-visit' },
      { source: '/dat-do-le', destination: '/offering' },
      { source: '/tra-cuu', destination: '/grave-search' },
      { source: '/so-vang-tri-an', destination: '/golden-book' },
      { source: '/nhan-tim-dong-doi', destination: '/post' },
      { source: '/lien-he', destination: '/contact' },
    ];
  },
  // Headers for better SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    PREVIEW_SECRET: process.env.PREVIEW_SECRET,
  }
}

export default nextConfig;
