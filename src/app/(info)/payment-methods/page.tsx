import Image1 from "@/assets/image/vnpay/1.png";
import Image2 from "@/assets/image/vnpay/2.png";
import Image3 from "@/assets/image/vnpay/3.png";
import Image4 from "@/assets/image/vnpay/4.png";
import Image5 from "@/assets/image/vnpay/5.png";
import Image6 from "@/assets/image/vnpay/6.jpg";
import Image7 from "@/assets/image/vnpay/7.png";
import Image8 from "@/assets/image/vnpay/8.png";
import Image9 from "@/assets/image/vnpay/9.png";
import {
  CreditCard,
  Smartphone,
  Shield,
  Banknote,
  Globe,
  Apple,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import React from "react";

export const metadata: Metadata = {
  title: "Hướng dẫn thanh toán VNPAY trên App | Nghĩa trang liệt sĩ",
  description:
    "Cổng VNPAY hỗ trợ thanh toán qua Mobile Banking, ví điện tử, thẻ nội địa, thẻ quốc tế và Apple Pay. Hướng dẫn chi tiết từng phương thức và các bước thanh toán.",
  alternates: { canonical: "/phuong-thuc-thanh-toan" },
  openGraph: {
    title: "Hướng dẫn thanh toán VNPAY trên App",
    description:
      "Chi tiết cách thanh toán qua VNPAY-QR, thẻ ngân hàng, thẻ quốc tế, ví điện tử và Apple Pay.",
    url: "/phuong-thuc-thanh-toan",
    siteName: "Nghĩa trang liệt sĩ",
    type: "article",
  },
  robots: { index: true, follow: true },
  keywords: [
    "VNPAY",
    "thanh toán QR",
    "Apple Pay",
    "thẻ quốc tế",
    "mobile banking",
    "hướng dẫn thanh toán",
  ],
};


export default function PaymentMethodPage() {
  const updatedAt = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* JSON-LD WebPage */}
      <Script id="webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Hướng dẫn thanh toán VNPAY trên App",
          description:
            "Hướng dẫn các bước thanh toán qua VNPAY trên Mobile Banking, ví điện tử, thẻ nội địa, thẻ quốc tế và Apple Pay.",
          inLanguage: "vi-VN",
          dateModified: updatedAt,
        })}
      </Script>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50/60 px-3 py-1 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-900/40">
            <CreditCard className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">Cổng thanh toán VNPAY</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hướng dẫn thanh toán VNPAY
          </h1>
        </header>

        {/* Thông tin chung */}
        <section className="mb-12 space-y-6 text-md">
          <p>
            Cổng thanh toán VNPAY là giải pháp do{" "}
            <strong>Công ty Cổ phần Giải pháp Thanh toán Việt Nam</strong> phát
            triển. Khách hàng sử dụng thẻ, tài khoản ngân hàng, tính năng QR
            Pay/VNPAY-QR tích hợp trên ứng dụng Mobile Banking hoặc ví điện tử
            liên kết để thanh toán và nhập mã giảm giá (nếu có).
          </p>
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <p>
                Quét mã VNPAY-QR trên{" "}
                <strong>40+ ứng dụng Mobile Banking</strong> và{" "}
                <strong>15+ ví điện tử</strong>
              </p>
              <div className="flex justify-center mt-2">
                <Image src={Image1} alt="Ứng dụng Mobile Banking" width={600} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>
                <strong>40+ thẻ ATM và tài khoản ngân hàng nội địa</strong>
              </p>
              <div className="flex justify-center mt-2">
                <Image src={Image3} alt="Thẻ ATM nội địa" width={600} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>
                <strong>5 thẻ quốc tế (Visa, MasterCard, JCB, UnionPay)</strong>
              </p>
              <div className="flex justify-center mt-2">
                <Image src={Image4} alt="Thẻ quốc tế" width={500} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>
                <strong>Apple Pay</strong>
              </p>
              <div className="flex justify-center gap-4 mt-2 flex-wrap">
                <Image src={Image5} alt="Apple Pay Logo" width={300} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p>
                <strong>Các phương thức thanh toán qua VNPAY</strong>
              </p>
              <div className="flex justify-center gap-4 mt-2 flex-wrap">
                <Image src={Image6} alt="VNPAY method" width={400} />
              </div>
            </div>
          </div>
        </section>

        {/* Các phương thức */}
        <section className="space-y-10 text-md leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              1. Phương thức thanh toán qua “Ứng dụng thanh toán hỗ trợ
              VNPAY-QR”
            </h2>
            <p>
              Bước 1: Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
              ngay hoặc Đặt hàng
              <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền
              đầy đủ thông tin người nhận hàng, chọn phương thức thanh toán
              VNPAY và nhấn nút “Đặt hàng ngay”.
            </p>
            <p className="mt-2">
              Bước 2: Màn hình thanh toán chuyển sang giao diện cổng thanh toán
              VNPAY. Chọn phương thức “Ứng dụng thanh toán hỗ trợ VNPAY-QR”.
            </p>
            <p className="mt-2">
              Bước 3: Chọn Ứng dụng ngân hàng hoặc ví điện tử có liên kết thanh
              toán trong danh sách.
              <br />
              *Lưu ý: Mã QR có hiệu lực trong 15 phút.
            </p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>
                Trường hợp 1: Ứng dụng tự động chuyển sang ứng dụng ngân hàng
                hoặc ví điện tử thanh toán.
                <ul className="list-[✤] ml-6 mt-1 space-y-1">
                  <li>
                    Đăng nhập ứng dụng ngân hàng hoặc ví điện tử, màn hình
                    chuyển sang thông tin thanh toán.
                  </li>
                  <li>
                    Kiểm tra thông tin, chọn nguồn tiền thanh toán từ “Nguồn tài
                    khoản và Ví điện tử” hoặc “Nguồn thẻ tín dụng”, nhập mã giảm
                    giá (nếu có) và hoàn tất thanh toán.
                  </li>
                </ul>
              </li>
              <li>
                Trường hợp 2: Ứng dụng hiện thông báo “Quý khách vui lòng sử
                dụng trình duyệt mặc định của thiết bị”.
                <ul className="list-[✤] ml-6 mt-1 space-y-1">
                  <li>
                    Tại màn hình hiển thị mã QR, chọn “Tải mã thanh toán” hoặc
                    chụp màn hình mã QR thanh toán.
                  </li>
                  <li>
                    Đăng nhập Ứng dụng ngân hàng hoặc Ví điện tử, chọn tính năng
                    quét mã QR.
                  </li>
                  <li>
                    Tải ảnh mã QR từ thư viện ảnh trong điện thoại, màn hình
                    chuyển ngay sang thông tin thanh toán.
                  </li>
                  <li>
                    Kiểm tra thông tin, nhập mã giảm giá (nếu có) và hoàn tất
                    thanh toán.
                  </li>
                </ul>
              </li>
            </ul>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
                <Image src={Image7} alt="" width={800} />
              </div>
            <p className="mt-2">
              Bước 4: Khi thực hiện thanh toán hoàn tất, màn hình quay về ứng
              dụng ban đầu & thông báo xác nhận đặt hàng thành công tại app.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              2. Phương thức thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”
            </h2>
            <p>
              Bước 1: Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
              ngay hoặc Đặt hàng
              <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền
              đầy đủ thông tin người nhận hàng, chọn phương thức thanh toán
              VNPAY và nhấn nút “Đặt hàng ngay”.
            </p>
            <p className="mt-2">
              Bước 2: Màn hình thanh toán chuyển sang giao diện cổng thanh toán
              VNPAY. Chọn phương thức “Thẻ nội địa và tài khoản ngân hàng” và
              chọn ngân hàng muốn thanh toán thẻ trong danh sách.
            </p>
            <p className="mt-2">
              Bước 3: Quý khách vui lòng thực hiện nhập các thông tin thẻ/tài
              khoản theo yêu cầu và chọn “Xác thực”. Mã OTP sẽ được gửi về điện
              thoại đăng ký, nhập mã OTP để hoàn tất giao dịch.
              <br />
              *Lưu ý: Giao dịch sẽ hết hạn sau 15 phút
            </p>
              <div className="flex justify-center gap-4 mt-2 flex-wrap">
                  <Image src={Image8} alt="" width={500} />
                </div>
            <p className="mt-2">
              Bước 4: Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được
              thông báo xác nhận đơn hàng đặt hàng thành công tại app.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              3. Phương thức thanh toán qua “Thẻ quốc tế (Visa, MasterCard, JCB,
              UnionPay)”
            </h2>
            <p>
              Tương tự như phương thức thanh toán “Thẻ nội địa và tài khoản ngân
              hàng”
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              4. Phương thức thanh toán qua “Ứng dụng VNPAY”
            </h2>
            <p>
              Tương tự như phương thức thanh toán “Ứng dụng thanh toán hỗ trợ
              VNPAY-QR”
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-semibold text-lg mb-3">
              5. Phương thức thanh toán qua “Apple Pay”
            </h2>
            <p>
              Bước 1: Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
              ngay hoặc Đặt hàng
              <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, điền
              đầy đủ thông tin người nhận hàng, chọn phương thức thanh toán
              VNPAY và nhấn nút “Đặt hàng ngay”.
            </p>
            <p className="mt-2">
              Bước 2: Màn hình thanh toán chuyển sang giao diện cổng thanh toán
              VNPAY. Chọn phương thức “Apple Pay”
              <br />
              *Lưu ý: Giao dịch sẽ hết hạn sau 15 phút
            </p>
            <p className="mt-2">
              Bước 3: Click nút sườn (Side button) để xác nhận giao dịch. Sử
              dụng Face ID hoặc Touch ID để thanh toán
            </p>
            <p className="mt-2">
              Bước 4: Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được
              thông báo xác nhận đơn hàng đặt hàng thành công tại app.
            </p>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
                <Image src={Image9} alt="" width={500} />
              </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-12">
          <h2 className="text-base font-semibold">Liên hệ hỗ trợ</h2>
          <div className="mt-3 rounded-2xl border bg-card p-5 text-sm">
            Email:{" "}
            <a
              href="mailto:tttuanttvl@gmail.com"
              className="underline hover:no-underline text-blue-500"
            >
              tttuanttvl@gmail.com
            </a>{" "}
            · Hotline: 0988.678.938
          </div>
        </section>
      </div>
    </main>
  );
}
