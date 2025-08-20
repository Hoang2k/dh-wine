import "../assets/css/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from '@/providers/ReduxProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <title>Website Bán Hàng & Bài Viết</title>
        <meta name="description" content="Website bán hàng và viết bài giới thiệu" />
      </head>
      <body>  
        <ClientProvider>
          {children} 
        </ClientProvider>
      </body>
    </html>
  );
}
