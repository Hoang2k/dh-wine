import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Liên hệ - Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
  description: 'Liên hệ nghĩa trang liệt sĩ Vị Xuyên Hà Giang - Vi Xuyen Martyrs Cemetery Ha Giang. Địa chỉ: Thôn 18, xã Vị Xuyên, Hà Giang. Điện thoại và email liên hệ.',
  keywords: [
    'liên hệ nghĩa trang Vị Xuyên',
    'địa chỉ nghĩa trang liệt sĩ Vị Xuyên',
    'Vi Xuyen Martyrs Cemetery Ha Giang',
    'Cemetery Ha Giang contact',
    'Hà Giang',
    'Vị Xuyên',
    'Nghĩa trang liệt sĩ',
    'Liệt sĩ',
    'Nghĩa trang',
    'Liệt sĩ',
  ],
  openGraph: {
    title: 'Liên hệ - Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
    description: 'Liên hệ Vi Xuyen Martyrs Cemetery Ha Giang',
    type: 'website',
    locale: 'vi_VN',
    url: process.env.NEXT_PUBLIC_SITE_URL + '/lien-he',
    siteName: 'Nghĩa trang liệt sĩ Vị Xuyên Hà Giang',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL + '/lien-he',
  },
};
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="container mx-auto px-4 lg:px-30 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form (Client Component) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Contact info (Server Component tĩnh) */}
          <div className="lg:col-span-4">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
