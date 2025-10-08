
import IntrodutionSection from "@/components/Abouts/IntrodutionSection";
import MemorySection from "@/components/Abouts/MemorySection";
import MainSection from "@/components/Abouts/MainSection";
import BannerAboutSection from "@/components/Abouts/BannerAboutSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
  description: 'Nghĩa trang liệt sĩ Vị Xuyên - Vi Xuyen Martyrs Cemetery Ha Giang. Tọa lạc tại Điểm cao 468, Vị Xuyên, Hà Giang. Diện tích 11.4ha, nơi an nghỉ của 1957 liệt sĩ. Xây dựng năm 1990-1991.',
  keywords: [
    'Nghĩa trang liệt sĩ Vị Xuyên',
    'Vị Xuyên',
    'Cemetery Ha Giang',
    'Hà Giang',
    'Nghĩa trang liệt sĩ',
    'Liệt sĩ',
    'Nghĩa trang',
    'Liệt sĩ',
    'Nghĩa trang',
    'Liệt sĩ',
    'giới thiệu nghĩa trang Vị Xuyên',
    'nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
    'Vi Xuyen Martyrs Cemetery Ha Giang',
    'Cemetery Ha Giang',
    'lịch sử nghĩa trang Vị Xuyên',
    'Hà Giang',
  ],
  openGraph: {
    title: 'Giới thiệu Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
    description: 'Nghĩa trang liệt sĩ Vị Xuyên - Vi Xuyen Martyrs Cemetery Ha Giang. Nơi an nghỉ của 1957 liệt sĩ tại Hà Giang.',
    type: 'website',
    locale: 'vi_VN',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/gioi-thieu',
    siteName: 'Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL + '/gioi-thieu',
  },
};

// Enable ISR - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default function About() {
  return (
    <div>
      <BannerAboutSection />
      <IntrodutionSection />
      <MainSection />
      <MemorySection />
    </div>
  );
}