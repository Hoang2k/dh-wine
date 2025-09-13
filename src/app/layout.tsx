import "../assets/css/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from '@/providers/ReduxProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";
import { CartProvider } from "@/contexts/CartContext";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nghĩa trang liệt sĩ Vị Xuyên',
  description: 'Nghĩa trang liệt sĩ Vị Xuyên',
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
      <body>  
        <ClientProvider>
          <CartProvider>
            {children} 
          </CartProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
