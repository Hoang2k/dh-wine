import "../assets/css/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";
import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: {
    default: 'Nghĩa trang liệt sĩ Vị Xuyên',
    template: '%s | Nghĩa trang liệt sĩ Vị Xuyên'
  },
  description: 'Nghĩa trang liệt sĩ Vị Xuyên - Nơi tưởng niệm các anh hùng liệt sĩ. Cung cấp dịch vụ cúng viếng, đặt lịch thăm viếng và các sản phẩm tâm linh.',
  keywords: [
    'nghĩa trang liệt sĩ',
    'Vị Xuyên',
    'cúng viếng',
    'đặt lịch thăm viếng',
    'sản phẩm cúng viếng',
    'truyền thống Việt Nam',
    'tâm linh',
    'thờ cúng'
  ],
  authors: [{ name: 'Nghĩa trang liệt sĩ Vị Xuyên' }],
  creator: 'Nghĩa trang liệt sĩ Vị Xuyên',
  publisher: 'Nghĩa trang liệt sĩ Vị Xuyên',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ntlsvx.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-la-co-03.jpg',
    shortcut: '/logo-la-co-03.jpg',
    apple: '/logo-la-co-03.jpg',
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ntlsvx.com",
    siteName: "Nghĩa trang liệt sĩ Vị Xuyên",
    title: "Nghĩa trang liệt sĩ Vị Xuyên",
    description: "Nghĩa trang liệt sĩ Vị Xuyên - Nơi tưởng niệm các anh hùng liệt sĩ",
    images: [
      {
        url: "/logo-la-co-03.jpg",
        width: 1200,
        height: 630,
        alt: "Nghĩa trang liệt sĩ Vị Xuyên",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nghĩa trang liệt sĩ Vị Xuyên',
    description: 'Nghĩa trang liệt sĩ Vị Xuyên - Nơi tưởng niệm các anh hùng liệt sĩ',
    images: ['/logo-la-co-03.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { 
      index: true, 
      follow: true, 
      "max-snippet": -1, 
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <StructuredData 
          type="organization" 
          data={{}} 
        />
      </head>
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
