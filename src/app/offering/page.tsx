import { Metadata } from 'next';
import OfferingClient from './OfferingClient';

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

// Enable ISR - revalidate every 600 seconds (10 minutes)
export const revalidate = 600;

export default function OfferingPage() {
  return <OfferingClient />;
}
