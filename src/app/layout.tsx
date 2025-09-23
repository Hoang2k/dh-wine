import "../assets/css/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";
import StructuredData from "@/components/StructuredData";
import type { Metadata } from 'next'

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
