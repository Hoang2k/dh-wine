import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'export',
  distDir: 'build',
  images: {
    unoptimized: true,
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
