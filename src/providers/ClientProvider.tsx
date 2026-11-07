'use client'
import { ReactNode } from "react";
import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import { QuoteProvider } from "@/contexts/QuoteContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ReduxProvider>
        <QuoteProvider>
          <GoogleAnalytics />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
          >
            Bỏ qua đến nội dung chính
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </QuoteProvider>
      </ReduxProvider>
    </QueryProvider>
  );
}
