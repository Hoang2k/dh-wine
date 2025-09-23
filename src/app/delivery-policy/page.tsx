import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Truck, MapPin, Clock, ClipboardCheck, BadgeCheck, Phone, Shield, ListChecks } from "lucide-react";

// SERVER COMPONENT (App Router). Do NOT add "use client" here.
// Place this file at: app/(marketing)/chinh-sach-giao-hang/page.tsx

export const metadata: Metadata = {
  title: "Chính sách giao hàng | Nghĩa trang Liệt sĩ Vị Xuyên",
  description:
    "Chính sách giao nhận cho các đơn đặt trực tuyến đồ lễ, hoa tươi, vòng hoa, mâm lễ… tại Nghĩa trang Liệt sĩ Vị Xuyên và Đài tưởng niệm điểm cao 468: phạm vi, hình thức, thời gian, xác nhận, chi phí, phát sinh và liên hệ.",
  alternates: { canonical: "/chinh-sach-giao-hang" },
  openGraph: {
    title: "Chính sách giao hàng | Nghĩa trang Liệt sĩ Vị Xuyên",
    description:
      "Quy định giao nhận đơn lễ tại Nghĩa trang Liệt sĩ Vị Xuyên/Đài tưởng niệm 468: thời gian, chi phí, xác nhận, xử lý phát sinh và liên hệ.",
    url: "/chinh-sach-giao-hang",
    siteName: "Nghĩa trang Liệt sĩ Vị Xuyên",
    type: "article",
  },
  robots: { index: true, follow: true },
  keywords: [
    "chính sách giao hàng",
    "giao nhận đồ lễ",
    "vòng hoa",
    "mâm lễ",
    "Nghĩa trang Liệt sĩ Vị Xuyên",
    "điểm cao 468",
  ],
};

const sections = [
  {
    id: "pham-vi-ap-dung",
    icon: <Shield className="h-5 w-5" aria-hidden />,
    title: "1. Phạm vi áp dụng",
    content: (
      <p>
        Chính sách này áp dụng cho các đơn hàng đặt trực tuyến dịch vụ đồ lễ, hoa tươi, vòng hoa, mâm lễ… trên hệ thống
        <strong> Nghĩa trang Liệt sĩ Vị Xuyên</strong>.
      </p>
    ),
  },
  {
    id: "hinh-thuc-giao-nhan",
    icon: <Truck className="h-5 w-5" aria-hidden />,
    title: "2. Hình thức giao nhận",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Sau khi khách hàng lựa chọn đồ lễ, <strong>tiến hành thanh toán online</strong>, đơn hàng sẽ được chuẩn bị và
          <strong> giao trực tiếp</strong> tại địa điểm khách đã chọn:
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>Nghĩa trang Liệt sĩ Vị Xuyên</li>
            <li>Đài tưởng niệm điểm cao 468</li>
          </ul>
        </li>
        <li>Khách hàng nhận hàng trực tiếp tại khu vực đã đăng ký trong đơn đặt hàng.</li>
      </ul>
    ),
  },
  {
    id: "thoi-gian-giao-hang",
    icon: <Clock className="h-5 w-5" aria-hidden />,
    title: "3. Thời gian giao hàng",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>Thời gian giao nhận được thực hiện theo <strong>ngày, giờ đã đăng ký</strong> khi đặt hàng.</li>
        <li>Ban Quản lý và bộ phận sắp lễ sẽ chuẩn bị và bàn giao <strong>đúng theo lịch đã xác nhận</strong>.</li>
        <li>
          Trường hợp cần thay đổi thời gian, vui lòng liên hệ trực tiếp số hỗ trợ: <strong>0988.678..938</strong> (bộ
          phận sắp lễ) để được điều chỉnh.
        </li>
      </ul>
    ),
  },
  {
    id: "xac-nhan-theo-doi",
    icon: <ClipboardCheck className="h-5 w-5" aria-hidden />,
    title: "4. Xác nhận và theo dõi đơn hàng",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Sau khi hoàn tất đặt lễ, hệ thống sẽ gửi <strong>tin nhắn Zalo</strong> qua số điện thoại đăng ký để xác nhận.
        </li>
        <li>Thông tin đơn hàng (danh mục lễ, số lượng, giá trị thanh toán) được lưu trữ để Ban Quản lý chuẩn bị.</li>
        <li>Khách hàng có thể liên hệ bộ phận hỗ trợ để kiểm tra tình trạng đơn hàng.</li>
      </ul>
    ),
  },
  {
    id: "chi-phi-giao-hang",
    icon: <BadgeCheck className="h-5 w-5" aria-hidden />,
    title: "5. Chi phí giao hàng",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Do đặc thù dịch vụ, <strong>tất cả đơn hàng được giao miễn phí</strong> tại địa điểm đã chọn (Nghĩa trang hoặc
          Điểm cao 468).
        </li>
        <li>Khách hàng chỉ thanh toán <strong>giá trị đồ lễ</strong> theo bảng giá niêm yết.</li>
      </ul>
    ),
  },
  {
    id: "phat-sinh",
    icon: <ListChecks className="h-5 w-5" aria-hidden />,
    title: "6. Trường hợp phát sinh",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>
          Nếu có sai sót trong quá trình chuẩn bị hoặc có yêu cầu đặc biệt, vui lòng thông báo ngay cho bộ phận sắp lễ
          để được xử lý kịp thời.
        </li>
        <li>
          Trường hợp khách hàng <strong>không có mặt</strong> tại thời điểm nhận lễ đã đăng ký, Ban Quản lý sẽ lưu giữ và
          hỗ trợ sắp xếp lại trong vòng <strong>tối đa 24 giờ</strong>. Quá thời hạn trên, đơn hàng sẽ bị hủy và
          <strong> không hoàn lại tiền</strong> trong bất kỳ trường hợp nào.
        </li>
      </ul>
    ),
  },
  {
    id: "lien-he",
    icon: <Phone className="h-5 w-5" aria-hidden />,
    title: "7. Liên hệ hỗ trợ",
    content: (
      <ul className="mt-1 space-y-1">
        <li>Bộ phận sắp lễ (Nhung): <strong>0988.058.390</strong></li>
        <li>Ban Quản lý nghĩa trang (Tuấn): <strong>0988.678.938</strong></li>
      </ul>
    ),
  },
];

function Section({ id, icon, title, content }: any) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-muted">{icon}</span>
        {title}
      </h2>
      <div className="prose prose-zinc dark:prose-invert max-w-none mt-3">{content}</div>
      <div className="my-6 h-px w-full bg-border" />
    </section>
  );
}

export default function DeliveryPolicyPage() {
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
            { "@type": "ListItem", position: 2, name: "Chính sách giao hàng", item: "/chinh-sach-giao-hang" },
          ],
        })}
      </Script>
      {/* JSON-LD: WebPage */}
      <Script id="webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Chính sách giao hàng",
          description:
            "Chính sách giao nhận cho các đơn đặt trực tuyến đồ lễ, hoa tươi, vòng hoa, mâm lễ… tại Nghĩa trang Liệt sĩ Vị Xuyên và Đài tưởng niệm điểm cao 468.",
          inLanguage: "vi-VN",
          dateModified: updatedAt,
        })}
      </Script>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50/60 px-3 py-1 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-900/40">
            <Truck className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">Giao trực tiếp tại khu vực đã đăng ký</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Chính sách giao hàng</h1>
          <p className="text-muted-foreground max-w-2xl">
            Quy định về phạm vi áp dụng, hình thức giao nhận, thời gian, xác nhận & theo dõi, chi phí, xử lý phát sinh
            và thông tin liên hệ hỗ trợ.
          </p>
        </header>

        {/* TOC */}
        <nav aria-label="Mục lục" className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition"
                >
                  {s.icon}
                  <span>{s.title.replace(/^\d+\.\s*/, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div>
          {sections.map((s) => (
            <Section key={s.id} {...s} />
          ))}
        </div>
      </div>
    </main>
  );
}
