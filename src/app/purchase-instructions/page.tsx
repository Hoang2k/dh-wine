import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ShoppingCart, Info, Image as ImageIcon, CheckCircle2, ArrowRight, ListOrdered } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import step1Image from "@/assets/image/purchase-instructions/step-1.png";
import step2Image from "@/assets/image/purchase-instructions/step-2.png";
import step3Image from "@/assets/image/purchase-instructions/step-3.png";
import step4Image from "@/assets/image/purchase-instructions/step-4.png";

// SERVER COMPONENT (App Router). Do NOT add "use client".
// Place at: app/(marketing)/huong-dan-mua-hang/page.tsx

export const metadata: Metadata = {
  title: "Hướng dẫn mua hàng | Nghĩa trang Liệt sĩ Vị Xuyên",
  description:
    "Hướng dẫn 4 bước mua hàng: chọn sản phẩm, thêm giỏ/đặt ngay, điền thông tin, xác nhận thanh toán. Có chỗ chèn ảnh minh họa từng bước.",
  alternates: { canonical: "/huong-dan-mua-hang" },
  openGraph: {
    title: "Hướng dẫn mua hàng | Nghĩa trang Liệt sĩ Vị Xuyên",
    description:
      "Chi tiết quy trình mua hàng: chọn sản phẩm, giỏ hàng, điền thông tin và xác nhận thanh toán. Kèm vị trí chèn ảnh thực tế.",
    url: "/huong-dan-mua-hang",
    siteName: "Nghĩa trang Liệt sĩ Vị Xuyên",
    type: "article",
  },
  robots: { index: true, follow: true },
  keywords: [
    "hướng dẫn mua hàng",
    "đặt lễ",
    "giỏ hàng",
    "thanh toán",
    "Nghĩa trang Liệt sĩ Vị Xuyên",
  ],
};

const steps = [
  {
    id: "buoc-1",
    title: "Bước 1: Chọn sản phẩm",
    bullets: [
      "Truy cập trang đặt đồ lễ: https://nghiatranglietsivixuyen.vn/dat-do-le",
      "Xem danh sách sản phẩm cúng viếng",
      "Chọn 1 sản phẩm để xem chi tiết",
    ],
    image: step1Image,
  },
  {
    id: "buoc-2",
    title: "Bước 2: Thêm vào giỏ hàng hoặc \"Đặt ngay\"",
    bullets: [
      "Nhấn \"Thêm vào giỏ hàng\" sau đó bấm vào icon giỏ hàng bên trên cùng bên phải để đến trang giỏ hàng",
      "Hoặc nhấn \"Đặt ngay\" để đi đến trang giỏ hàng",
      "Kiểm tra số lượng và tổng tiền",
      "Có thể thay đổi số lượng hoặc xóa sản phẩm",
      "Tiếp tục mua sắm hoặc tiến hành thanh toán",
    ],
    image: step2Image,
  },
  {
    id: "buoc-3",
    title: "Bước 3: Điền thông tin",
    bullets: [
      "Họ tên người nhận",
      "Số điện thoại liên hệ",
      "Địa chỉ nhận hàng chi tiết",
      "Ghi chú đặc biệt (nếu có)",
    ],
    image: step3Image,
  },
  {
    id: "buoc-4",
    title: "Bước 4: Chọn \"Xác nhận thanh toán\"",
    bullets: [
      "Nhấn \"Xác nhận thanh toán\"",
      "Hệ thống chuyển hướng đến trang thanh toán do VNPAY cung cấp (Hosted UI).",
      "Quét QR hoặc chọn ngân hàng",
    ],
    image: step4Image,
  },
];

function ImagePlaceholder({ step, image }: { step: number; image: StaticImageData }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted/40">
      <div className="absolute inset-0 grid place-items-center text-muted-foreground">
        <div className="flex flex-col items-center">
          <Image 
            fill
            src={image} 
            alt={`Bước ${step}`} 
            className="h-full w-full object-cover" 
            aria-hidden 
          />
        </div>
      </div>
    </div>
  );
}

function StepCard({ index, title, bullets, id, image }: { index: number; title: string; bullets: string[]; id: string; image: StaticImageData }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background font-semibold">{index}</div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>

      {/* Image slot */}
      <ImagePlaceholder step={index} image={image} />

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-6 text-sm">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function HowToBuyPage() {
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
            { "@type": "ListItem", position: 2, name: "Hướng dẫn mua hàng", item: "/huong-dan-mua-hang" },
          ],
        })}
      </Script>

      {/* JSON-LD: HowTo schema for rich results */}
      <Script id="howto-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Hướng dẫn mua hàng",
          description:
            "Quy trình 4 bước: chọn sản phẩm, thêm giỏ/đặt ngay, điền thông tin và xác nhận thanh toán.",
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            name: s.title,
            position: i + 1,
            itemListElement: s.bullets.map((b) => ({ "@type": "HowToDirection", text: b })),
          })),
        })}
      </Script>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/60 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-900/40">
            <ListOrdered className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">Hướng dẫn từng bước • Có chỗ chèn ảnh</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hướng dẫn mua hàng</h1>
          <p className="text-muted-foreground max-w-2xl">
            Thực hiện theo 4 bước đơn giản để đặt đồ lễ/hoa/vòng hoa trên hệ thống.
          </p>
        </header>

        {/* Steps */}
        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.id}>
              <StepCard id={s.id} index={i + 1} title={s.title} bullets={s.bullets} image={s.image} />
            </li>
          ))}
        </ol>

        {/* CTA row */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-2 font-semibold">Bắt đầu mua ngay</div>
            <p className="text-sm text-muted-foreground">Xem danh sách dịch vụ đồ lễ và chọn mẫu phù hợp.</p>
            <div className="mt-3">
              <Link href="/dat-do-le" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                Xem sản phẩm <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-2 font-semibold">Vào giỏ hàng</div>
            <p className="text-sm text-muted-foreground">Kiểm tra số lượng, tổng tiền và tiến hành thanh toán.</p>
            <div className="mt-3">
              <Link href="/gio-hang" className="inline-flex items-center gap-2 rounded-xl border bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Tới giỏ hàng <ShoppingCart className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
