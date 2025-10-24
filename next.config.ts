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
  // Redirects configuration
  async rewrites() {
    return [
      { source: '/tin-tuc', destination: '/news' },
      { source: '/tin-tuc/:slug', destination: '/news/:slug' },
      { source: '/tin-tuc/danh-muc/:category', destination: '/news/category/:category' },
      { source: '/gioi-thieu', destination: '/about' },
      { source: '/dat-lich-vieng', destination: '/book-visit' },
      { source: '/dat-do-le', destination: '/offering' },
      { source: '/tra-cuu', destination: '/grave-search' },
      { source: '/so-vang-tri-an', destination: '/golden-book' },
      { source: '/nhan-tim-dong-doi', destination: '/find-relatives' },
      { source: '/nhan-tim-dong-doi/:slug', destination: '/find-relatives/:slug' },
      { source: '/nhan-tim-dong-doi/tao-moi', destination: '/find-relatives/create' },

      { source: '/lien-he', destination: '/contact' },

      { source: '/huong-dan-mua-hang', destination: '/purchase-instructions' },

      { source: '/phuong-thuc-thanh-toan', destination: '/payment-methods' },
      { source: '/bao-hanh-doi-tra', destination: '/warranty-return' },

      { source: '/chinh-sach-giao-hang', destination: '/delivery-policy' },

      { source: '/chinh-sach-bao-mat', destination: '/privacy-policy' },

      { source: '/gio-hang', destination: '/cart' },
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
