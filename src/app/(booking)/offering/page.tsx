import { Metadata } from 'next';
import OfferingClient from './OfferingClient';
import { getServiceItems } from "@/services/offerings";

export const metadata: Metadata = {
  title: 'Sản phẩm cúng viếng | Nghĩa trang liệt sĩ Vị Xuyên',
  description: 'Chọn lựa các sản phẩm cúng viếng chất lượng cao, phù hợp với truyền thống văn hóa Việt Nam tại nghĩa trang liệt sĩ Vị Xuyên.',
  keywords: [
    'sản phẩm cúng viếng',
    'đồ cúng',
    'nghĩa trang liệt sĩ',
    'Vị Xuyên',
    'cúng viếng',
    'truyền thống Việt Nam',
    'đồ thờ cúng',
    'vật phẩm tâm linh'
  ],
  openGraph: {
    title: 'Sản phẩm cúng viếng | Nghĩa trang liệt sĩ Vị Xuyên',
    description: 'Chọn lựa các sản phẩm cúng viếng chất lượng cao, phù hợp với truyền thống văn hóa Việt Nam.',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://ntlsvx.com/offering',
    siteName: 'Nghĩa trang liệt sĩ Vị Xuyên',
    images: [
      {
        url: '/logo-la-co-03.jpg',
        width: 1200,
        height: 630,
        alt: 'Sản phẩm cúng viếng nghĩa trang liệt sĩ Vị Xuyên',
      }
    ],
  },
  alternates: {
    canonical: 'https://ntlsvx.com/offering',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const dynamic = 'force-dynamic';

export default async function OfferingPage() {
  const response = await getServiceItems({ page: 1, per_page: 50 });
  const items = response?.data || [];
  return <OfferingClient items={items} />;
}
