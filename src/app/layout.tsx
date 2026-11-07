import "../assets/css/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Cormorant_Garamond } from 'next/font/google'

const display = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'rượu vang nhập khẩu',
    'phân phối rượu vang',
    'rượu vang Nha Trang',
    'rượu vang Khánh Hòa',
    'rượu vang cho nhà hàng',
    'rượu vang khách sạn',
    'quà tặng rượu vang doanh nghiệp',
    'giá sỉ rượu vang',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: '#191919',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${display.variable} ${sans.variable}`}>
      <head>
        <StructuredData type="organization" data={{}} />
      </head>
      <body className="pb-mobile-bar">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
