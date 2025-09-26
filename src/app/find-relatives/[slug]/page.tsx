// src/app/articles/[slug]/page.tsx

import TeammateDetailClient from "./TeammateDetailClient";
import { Metadata } from "next";
import React from "react";

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

type PageParams = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  return {
    title: "Chi tiết tìm đồng đội - Nghĩa trang liệt sĩ Vị Xuyên",
    description:
      "Chi tiết thông tin tìm kiếm đồng đội liệt sĩ đã hy sinh vì Tổ quốc.",
    keywords: [
      "tìm kiếm liệt sĩ",
      "đồng đội",
      "anh hùng liệt sĩ",
      "Vị Xuyên",
      "nghĩa trang liệt sĩ",
      "chi tiết liệt sĩ",
    ],
    openGraph: {
      title: "Chi tiết tìm đồng đội - Nghĩa trang liệt sĩ Vị Xuyên",
      description:
        "Chi tiết thông tin tìm kiếm đồng đội liệt sĩ đã hy sinh vì Tổ quốc.",
      type: "article",
    },
  };
}

// SEO-optimized page component
export default async function PostPage(props: { params: PageParams }) {
  return <TeammateDetailClient />;
}
