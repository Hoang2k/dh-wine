import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { RefreshCw, ShieldCheck, Phone, AlertCircle, ClipboardCheck } from "lucide-react";

// SERVER COMPONENT (App Router). Do NOT add "use client" here.
// Place at: app/(marketing)/chinh-sach-bao-hanh-doi-tra/page.tsx

export const metadata: Metadata = {
  title: "Chính sách bảo hành, đổi trả | Nghĩa trang Liệt sĩ Vị Xuyên",
  description:
    "Chính sách đổi trả và bảo hành chất lượng cho đồ lễ/hoa/vòng hoa/mâm lễ tại Nghĩa trang Liệt sĩ Vị Xuyên: điều kiện đổi, không hoàn tiền khi không nhận hàng, cam kết chất lượng và liên hệ khiếu nại.",
  alternates: { canonical: "/chinh-sach-bao-hanh-doi-tra" },
  openGraph: {
    title: "Chính sách bảo hành, đổi trả | Nghĩa trang Liệt sĩ Vị Xuyên",
    description:
      "Quy định đổi trả, không hoàn tiền khi không đến nhận, cam kết chất lượng đồ lễ và thông tin liên hệ khiếu nại.",
    url: "/chinh-sach-bao-hanh-doi-tra",
    siteName: "Nghĩa trang Liệt sĩ Vị Xuyên",
    type: "article",
  },
  robots: { index: true, follow: true },
  keywords: [
    "chính sách đổi trả",
    "bảo hành chất lượng",
    "đồ lễ",
    "vòng hoa",
    "mâm lễ",
    "Nghĩa trang Liệt sĩ Vị Xuyên",
  ],
};

const sections = [
  {
    id: "chinh-sach-doi-tra",
    icon: <RefreshCw className="h-5 w-5" aria-hidden />,
    title: "1. Chính sách đổi trả",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Được đổi sản phẩm</strong>: nếu sản phẩm bàn giao bị lỗi, hỏng, hoặc không đúng loại đã đặt (ví dụ:
          hoa bị héo, nhầm loại vòng/đồ lễ,…).
        </li>
        <li>
          <strong>Không áp dụng hoàn tiền</strong>: trong trường hợp khách hàng không đến nhận hàng tại thời điểm đã
          đăng ký.
        </li>
        <li>
          <strong>Trường hợp phát sinh khác</strong> (ví dụ khách hàng muốn thay đổi loại đồ lễ sau khi đã xác nhận),
          vui lòng liên hệ trực tiếp bộ phận sắp lễ để được hỗ trợ tùy theo khả năng thực tế.
        </li>
      </ul>
    ),
  },
  {
    id: "bao-hanh-chat-luong",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
    title: "2. Chính sách bảo hành chất lượng",
    content: (
      <ul className="list-disc ml-6 space-y-2">
        <li>
          Với tất cả các sản phẩm đồ lễ, Ban Quản lý cam kết <strong>bàn giao đúng mẫu, tươi mới</strong> tại thời điểm
          nhận hàng.
        </li>
        <li>
          Với đồ lễ, mâm lễ, bộ phận sắp lễ <strong>chuẩn bị theo đúng thông tin đăng ký</strong> và <strong>bảng giá
          niêm yết</strong>.
        </li>
        <li>
          <strong>Sau khi bàn giao</strong>, trách nhiệm bảo quản thuộc về khách hàng.
        </li>
      </ul>
    ),
  },
  {
    id: "lien-he-ho-tro",
    icon: <Phone className="h-5 w-5" aria-hidden />,
    title: "3. Liên hệ hỗ trợ",
    content: (
      <>
        <p className="mb-2">Mọi thắc mắc hoặc khiếu nại về sản phẩm, vui lòng liên hệ:</p>
        <ul className="ml-6 list-disc space-y-1">
          <li>Bộ phận sắp lễ (Nhung): <strong>0988.058.390</strong></li>
          <li>Ban Quản lý Nghĩa trang Liệt sĩ Vị Xuyên (Tuấn): <strong>0988.678.938</strong></li>
        </ul>
      </>
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

export default function WarrantyReturnPolicyPage() {
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
            { "@type": "ListItem", position: 2, name: "Chính sách bảo hành, đổi trả", item: "/chinh-sach-bao-hanh-doi-tra" },
          ],
        })}
      </Script>
      {/* JSON-LD: WebPage */}
      <Script id="webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Chính sách bảo hành, đổi trả",
          description:
            "Chính sách đổi trả và bảo hành chất lượng cho đồ lễ/hoa/vòng hoa/mâm lễ tại Nghĩa trang Liệt sĩ Vị Xuyên.",
          inLanguage: "vi-VN",
          dateModified: updatedAt,
        })}
      </Script>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/60 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-900/40">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">Cam kết chất lượng & hỗ trợ đổi sản phẩm lỗi</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Chính sách bảo hành, đổi trả</h1>
          <p className="text-muted-foreground">
            Quy định đổi trả cho sản phẩm lỗi/không đúng loại, điều khoản không hoàn tiền khi không đến nhận hàng, cam kết
            chất lượng đồ lễ và thông tin liên hệ khiếu nại.
          </p>
        </header>

        {/* Content */}
        <div>
          {sections.map((s) => (
            <Section key={s.id} {...s} />
          ))}
        </div>

        {/* Note */}
        <aside className="mt-2 flex items-start gap-3 rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4" aria-hidden />
          <p>
            Lưu ý: Tùy từng trường hợp thực tế (điều kiện thời tiết, nguồn cung hoa tươi, thời gian tổ chức), quy trình xử
            lý có thể được điều chỉnh để đảm bảo trang trọng và đầy đủ nghi lễ.
          </p>
        </aside>
      </div>
    </main>
  );
}
