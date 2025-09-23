import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CreditCard, Shield, ArrowRight, HelpCircle, CheckCircle2, Banknote, Info, ExternalLink } from "lucide-react";

// SERVER COMPONENT (App Router). Do NOT add "use client" here.
// Place this file at: app/(marketing)/phuong-thuc-thanh-toan/page.tsx
// TailwindCSS is assumed to be configured. No client-side code is required.

export const metadata: Metadata = {
  title: "Phương thức thanh toán | Nghĩa trang liệt sĩ",
  description:
    "Website chỉ hỗ trợ thanh toán qua VNPAY (chuyển khoản/QR) với giao diện thanh toán do VNPAY cung cấp (Hosted UI). Hướng dẫn các bước, phí, bảo mật và câu hỏi thường gặp.",
  alternates: { canonical: "/phuong-thuc-thanh-toan" },
  openGraph: {
    title: "Phương thức thanh toán | Nghĩa trang liệt sĩ",
    description:
      "Hỗ trợ duy nhất VNPAY: chuyển hướng sang VNPAY để thanh toán an toàn. Xem hướng dẫn chi tiết và câu hỏi thường gặp.",
    url: "/phuong-thuc-thanh-toan",
    siteName: "Nghĩa trang liệt sĩ",
    type: "article",
  },
  robots: { index: true, follow: true },
  keywords: [
    "phương thức thanh toán",
    "VNPAY",
    "thanh toán QR",
    "chuyển khoản",
    "nghĩa trang liệt sĩ",
    "đặt lễ",
  ],
};

const steps = [
  {
    title: "Chọn \"Thanh toán\"",
    desc: "Nhập thông tin cần thiết",
  },
  {
    title: "Chọn \"Xác nhận thanh toán\"",
    desc: "Hệ thống chuyển hướng đến trang thanh toán do VNPAY cung cấp (Hosted UI).",
  },
  {
    title: "Quét QR hoặc chọn ngân hàng",
    desc: "Quét mã QR VNPAY hoặc đăng nhập ngân hàng để xác nhận thanh toán.",
  },
  {
    title: "Hoàn tất & nhận xác nhận",
    desc: "Sau khi VNPAY báo thành công, đơn của bạn sẽ được ghi nhận và gửi biên nhận.",
  },
];

const faqs = [
  {
    q: "Website có hỗ trợ thẻ quốc tế/tiền mặt/COD không?",
    a: "Hiện tại chúng tôi chỉ hỗ trợ duy nhất cổng VNPAY (chuyển khoản/QR).",
  },
  {
    q: "Thanh toán thất bại nhưng bị trừ tiền?",
    a: "Một số ngân hàng có thể ghi nhận giữ chỗ tạm thời. Số tiền sẽ tự hoàn theo quy định ngân hàng nếu giao dịch không thành công. Nếu cần hỗ trợ tra soát, vui lòng liên hệ chúng tôi.",
  },
  {
    q: "Phí thanh toán là bao nhiêu?",
    a: "Phí (nếu có) do VNPAY/ngân hàng quy định và sẽ hiển thị rõ trong bước thanh toán của VNPAY.",
  },
  {
    q: "Bảo mật thông tin như thế nào?",
    a: "Quá trình trả tiền diễn ra trên hạ tầng VNPAY, dữ liệu thanh toán được mã hóa và tuân thủ tiêu chuẩn bảo mật của VNPAY/ngân hàng.",
  },
];

function StepItem({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <li className="group relative rounded-2xl border bg-card p-5 transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background font-semibold">{index}</div>
        <div>
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </li>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="mb-1 flex items-center gap-2 font-medium"><HelpCircle className="h-4 w-4" aria-hidden />{q}</div>
      <p className="text-sm text-muted-foreground">{a}</p>
    </div>
  );
}

export default function PaymentMethodPage() {
  const updatedAt = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* JSON-LD: Breadcrumbs */}
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Trang chủ", item: "/" },
            { "@type": "ListItem", position: 2, name: "Phương thức thanh toán", item: "/phuong-thuc-thanh-toan" },
          ],
        })}
      </Script>
      {/* JSON-LD: WebPage */}
      <Script id="webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Phương thức thanh toán",
          description:
            "Website chỉ hỗ trợ thanh toán qua VNPAY (chuyển khoản/QR). Hướng dẫn các bước, phí, bảo mật và câu hỏi thường gặp.",
          inLanguage: "vi-VN",
          dateModified: updatedAt,
        })}
      </Script>
      {/* JSON-LD: FAQ */}
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        })}
      </Script>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50/60 px-3 py-1 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-900/40">
            <CreditCard className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">Thanh toán duy nhất qua VNPAY</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Phương thức thanh toán</h1>
          <p className="text-muted-foreground max-w-2xl">
            Chúng tôi hỗ trợ <strong>một</strong> phương thức thanh toán: chuyển hướng sang <strong>VNPAY</strong> để
            quét QR hoặc xác thực ngân hàng. Nhanh chóng, an toàn và tiện lợi.
          </p>
          <div className="text-sm text-muted-foreground">Cập nhật gần nhất: <time dateTime={updatedAt}>{updatedAt}</time></div>
        </header>

        {/* Cards: Only one method (VNPAY) */}
        <section aria-labelledby="method">
          <h2 id="method" className="sr-only">Phương thức</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-xl border bg-background p-3"><CreditCard className="h-6 w-6" aria-hidden /></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">VNPAY (Hosted UI)</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bạn sẽ được chuyển sang trang thanh toán của VNPAY để quét QR hoặc chọn ngân hàng.
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" aria-hidden /> Nhanh chóng và phổ biến</li>
                    <li className="flex items-center gap-2"><Shield className="h-4 w-4" aria-hidden /> Bảo mật trên hạ tầng VNPAY</li>
                    <li className="flex items-center gap-2"><Banknote className="h-4 w-4" aria-hidden /> Hỗ trợ chuyển khoản/QR đa ngân hàng</li>
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Bằng cách tiếp tục, bạn đồng ý với các điều khoản thanh toán và chính sách bảo mật.
                  </p>
                </div>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold"><Info className="h-4 w-4" aria-hidden />Lưu ý quan trọng</div>
              <ul className="list-disc ml-5 space-y-2 text-sm text-muted-foreground">
                <li>Sau khi thanh toán thành công, bạn sẽ được chuyển về trang kết quả tại website.</li>
                <li>Nếu thoát trình duyệt giữa chừng, đơn có thể ở trạng thái chờ; bạn có thể thanh toán lại từ lịch sử đơn.</li>
              </ul>
              <div className="mt-3 text-sm">
                <Link href="/privacy-policy" className="inline-flex items-center gap-1 underline hover:no-underline">
                  Xem Chính sách bảo mật <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section aria-labelledby="steps" className="mt-10">
          <h2 id="steps" className="text-base font-semibold">Quy trình thanh toán VNPAY</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StepItem key={s.title} index={i + 1} title={s.title} desc={s.desc} />
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="text-base font-semibold">Câu hỏi thường gặp</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact" className="mt-12">
          <h2 id="contact" className="text-base font-semibold">Liên hệ hỗ trợ thanh toán</h2>
          <div className="mt-3 rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
            Email: <a className="underline hover:no-underline" href="mailto:support@example.com">support@example.com</a> · Hotline: 0123 456 789
          </div>
        </section>
      </div>
    </main>
  );
}
