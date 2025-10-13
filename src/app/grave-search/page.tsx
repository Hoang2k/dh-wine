import SearchFormComponent from "@/components/search/SearchFormComponent";
import SearchShell from "@/components/search/SearchShell";
import TableComponent from "@/components/search/TableComponent";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tra cứu mộ liệt sĩ Vị Xuyên Hà Giang',
  description: 'Nghĩa trang liệt sĩ Vị Xuyên - Vi Xuyen Martyrs Cemetery Ha Giang. Tra cứu mộ liệt sĩ tại Hà Giang.',
  keywords: [
    'tra cứu mộ liệt sĩ Vị Xuyên',
    'Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
    'Vi Xuyen Martyrs Cemetery Ha Giang',
    'Cemetery Ha Giang',
    'Hà Giang',
    'Nghĩa trang liệt sĩ',
    'Liệt sĩ',
    'Nghĩa trang',
    'Liệt sĩ',
  ],
  openGraph: {
    title: 'Tra cứu mộ liệt sĩ Vị Xuyên Hà Giang',
    description: 'Nghĩa trang liệt sĩ Vị Xuyên - Vi Xuyen Martyrs Cemetery Ha Giang. Tra cứu mộ liệt sĩ tại Hà Giang.',
    type: 'website',
    locale: 'vi_VN',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/tra-cu-mo-lie-si',
    siteName: 'Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL + '/tra-cu-mo-lie-si',
  },
};

export default function GraveSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-memorial-cream to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(13,110,0,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(0,110,189,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
      <main className="container mx-auto md:px-8 md:py-8">
        <div className="mb-2 flex flex-col items-center">
          <h1 className="text-[32px] md:text-[64px] text-memorial-dark mb-2 font-utmalpine text-center text-[#8B0000]">
            "Sống bám đá đánh giặc"
          </h1>
          <p className="text-memorial-gray text-[32px] md:text-[64px] font-utmalpine text-center text-[#8B0000]">
            "Chết hóa đá bất tử"
          </p>
        </div>

        <SearchShell />

      </main>
    </div>
  )
}