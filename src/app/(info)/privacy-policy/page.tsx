import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import { Shield, Lock, Cookie, Mail, Phone, MapPin, RefreshCw } from "lucide-react";

// --- SEO (App Router): if you place this file at app/(marketing)/privacy-policy/page.tsx,
// export the metadata below from *that* file (remove the default export duplication).
export const metadata: Metadata = {
  title: "Chính sách bảo mật | Nghĩa trang liệt sĩ",
  description:
    "Chính sách bảo mật cho website nghĩa trang liệt sĩ: cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân; quyền của người dùng; cookies; liên hệ.",
  alternates: {
    canonical: "/chinh-sach-bao-mat",
  },
  openGraph: {
    title: "Chính sách bảo mật | Nghĩa trang liệt sĩ",
    description:
      "Chính sách bảo mật cho website nghĩa trang liệt sĩ: cách thức thu thập, sử dụng, lưu trữ dữ liệu; quyền và lựa chọn của bạn.",
    url: "/chinh-sach-bao-mat",
    siteName: "Nghĩa trang liệt sĩ",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "chính sách bảo mật",
    "bảo vệ dữ liệu",
    "nghĩa trang liệt sĩ",
    "đặt lễ",
    "thanh toán",
    "cookies",
  ],
};

const sections = [
  {
    id: "thong-tin-thu-thap",
    icon: <Shield className="h-5 w-5" aria-hidden />,
    title: "1. Thông tin thu thập",
    content: (
      <>
        <p>
          Khi bạn sử dụng dịch vụ, chúng tôi có thể thu thập các loại thông tin sau:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Thông tin cá nhân</strong>: họ tên, số điện thoại, email, địa chỉ liên hệ, thông tin thanh toán.
          </li>
          <li>
            <strong>Thông tin giao dịch</strong>: đơn đặt lễ, gói dịch vụ, lịch sử thanh toán.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "muc-dich-su-dung",
    icon: <RefreshCw className="h-5 w-5" aria-hidden />,
    title: "2. Mục đích sử dụng thông tin",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>Cung cấp và vận hành dịch vụ: đặt lễ, thanh toán, tra cứu.</li>
        <li>Liên hệ, xác nhận đơn hàng, hỗ trợ khách hàng.</li>
        <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng.</li>
        <li>Tuân thủ yêu cầu pháp lý từ cơ quan có thẩm quyền.</li>
      </ul>
    ),
  },
  {
    id: "chia-se-thong-tin",
    icon: <Lock className="h-5 w-5" aria-hidden />,
    title: "3. Chia sẻ thông tin",
    content: (
      <>
        <p>
          Chúng tôi <strong>không bán</strong> dữ liệu cá nhân. Thông tin chỉ được chia sẻ khi:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Có sự đồng ý của bạn.</li>
          <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
          <li>
            Với đối tác hỗ trợ vận hành (ví dụ: cổng thanh toán VNPAY, nhà cung cấp hạ tầng
            lưu trữ/hosting, email) nhằm phục vụ hoạt động của website, theo hợp đồng xử lý dữ liệu phù hợp.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "bao-mat",
    icon: <Shield className="h-5 w-5" aria-hidden />,
    title: "4. Bảo mật thông tin",
    content: (
      <>
        <p>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ liệu:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Mã hóa truyền tải bằng HTTPS/SSL.</li>
          <li>Hệ thống tường lửa, phân quyền và ghi nhật ký truy cập.</li>
          <li>Kiểm soát quyền truy cập nội bộ tối thiểu cần thiết.</li>
          <li>Rà soát, cập nhật bảo mật định kỳ.</li>
        </ul>
        <p className="mt-2 text-muted-foreground">
          Dù nỗ lực tối đa, không phương thức nào an toàn tuyệt đối. Chúng tôi sẽ thông báo phù hợp
          theo quy định nếu xảy ra sự cố ảnh hưởng đến dữ liệu của bạn.
        </p>
      </>
    ),
  },
  {
    id: "quyen-nguoi-dung",
    icon: <Shield className="h-5 w-5" aria-hidden />,
    title: "5. Quyền của người dùng",
    content: (
      <ul className="list-disc ml-6 space-y-1">
        <li>Yêu cầu truy cập, chỉnh sửa, cập nhật thông tin cá nhân.</li>
        <li>Yêu cầu xóa dữ liệu trong một số trường hợp theo luật định.</li>
        <li>Phản đối hoặc yêu cầu ngừng xử lý dữ liệu cho mục đích tiếp thị.</li>
      </ul>
    ),
  },
  {
    id: "luu-tru",
    icon: <Lock className="h-5 w-5" aria-hidden />,
    title: "6. Lưu trữ dữ liệu",
    content: (
      <p>
        Dữ liệu được lưu trữ trong thời hạn cần thiết cho mục đích đã nêu hoặc theo yêu cầu pháp luật hiện hành.
      </p>
    ),
  },
  {
    id: "cookies",
    icon: <Cookie className="h-5 w-5" aria-hidden />,
    title: "7. Cookies & công nghệ theo dõi",
    content: (
      <>
        <p>
          Chúng tôi sử dụng cookies để ghi nhớ tùy chọn và phân tích lưu lượng. Bạn có thể từ chối cookies trong
          cài đặt trình duyệt; một số tính năng có thể hoạt động hạn chế.
        </p>
      </>
    ),
  },
  {
    id: "lien-he",
    icon: <Mail className="h-5 w-5" aria-hidden />,
    title: "8. Liên hệ",
    content: (
      <ul className="mt-1 space-y-1">
        <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> <span>Email: <a className="underline hover:no-underline" href="mailto:tttuanttvl@gmail.com">tttuanttvl@gmail.com</a></span></li>
        <li className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden /> <span>Hotline: 0988.678.938</span></li>
        <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /> <span>Địa chỉ: Thôn 18, xã Vị Xuyên, tỉnh Tuyên Quang</span></li>
      </ul>
    ),
  },
  {
    id: "thay-doi",
    icon: <RefreshCw className="h-5 w-5" aria-hidden />,
    title: "9. Thay đổi chính sách",
    content: (
      <p>
        Chúng tôi có thể cập nhật nội dung này theo thời gian. Bản cập nhật sẽ được công bố trên website và có hiệu lực kể từ ngày đăng tải.
      </p>
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
      <div className="prose prose-zinc dark:prose-invert max-w-none mt-3">
        {content}
      </div>
      <div className="my-6 h-px w-full bg-border" />
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const updatedAt = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Breadcrumbs JSON-LD */}
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Trang chủ", item: "/" },
            { "@type": "ListItem", position: 2, name: "Chính sách bảo mật", item: "/chinh-sach-bao-mat" },
          ],
        })}
      </Script>

      {/* WebPage + FAQ JSON-LD */}
      <Script id="webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Chính sách bảo mật",
          description:
            "Chính sách bảo mật cho website nghĩa trang liệt sĩ Vị Xuyên: thu thập, sử dụng, lưu trữ dữ liệu; quyền và lựa chọn của người dùng.",
          inLanguage: "vi-VN",
          dateModified: updatedAt,
          breadcrumb: {
            "@id": "#breadcrumb-jsonld",
          },
        })}
      </Script>
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Chúng tôi thu thập dữ liệu gì?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Chúng tôi thu thập thông tin cá nhân, thông tin giao dịch và dữ liệu kỹ thuật (IP, thiết bị, cookies) để vận hành dịch vụ.",
              },
            },
            {
              "@type": "Question",
              name: "Dữ liệu của tôi được bảo vệ ra sao?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Dữ liệu được bảo vệ bằng HTTPS/SSL, tường lửa, phân quyền truy cập và rà soát bảo mật định kỳ.",
              },
            },
          ],
        })}
      </Script>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-8 sm:mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/60 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-900/40">
              <Shield className="h-4 w-4" aria-hidden />
              <span className="text-xs font-medium">Cam kết bảo vệ dữ liệu</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Chính sách bảo mật</h1>
            <p className="text-muted-foreground">
              Chính sách này giải thích cách chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá nhân khi bạn
              sử dụng các dịch vụ giới thiệu, đặt lễ, thanh toán và tra cứu tại Website Nghĩa trang Liệt sĩ Vị Xuyên.
            </p>
          </div>
        </header>

        {/* Content sections */}
        <div>
          {sections.map((s) => (
            <Section key={s.id} {...s} />
          ))}
        </div>

        {/* Callout */}
        <aside className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-1 text-base font-semibold">Yêu cầu dữ liệu cá nhân</h3>
          <p className="text-sm text-muted-foreground">
            Để thực hiện các quyền liên quan đến dữ liệu cá nhân (truy cập/xóa/chỉnh sửa), vui lòng gửi yêu cầu đến
            <a className="mx-1 underline hover:no-underline" href="mailto:tttuanttvl@gmail.com">tttuanttvl@gmail.com</a>
            kèm thông tin xác thực.
          </p>
        </aside>
      </div>
    </main>
  );
}
