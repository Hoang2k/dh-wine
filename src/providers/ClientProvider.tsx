'use client'
import { ReactNode } from "react";
import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import { CartProvider } from "@/contexts/CartContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ReduxProvider>
        <CartProvider>
          <GoogleAnalytics />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CartProvider>
      </ReduxProvider>
    </QueryProvider>
  );
}
