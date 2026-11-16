import "../assets/css/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientProvider from "@/providers/ClientProvider";
import StructuredData from "@/components/StructuredData";
import AgeGate, { ageGateScript } from "@/components/site/AgeGate";
import { getSite } from "@/lib/site";
import { SiteProvider } from "@/lib/site-context";
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, EB_Garamond } from 'next/font/google'

const display = EB_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const sans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

// Cài đặt website đổi trong admin thì trang được làm mới qua /api/revalidate; đây là hạn tối đa nếu lần gọi đó lỡ.
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    title: {
      default: `${site.name}, ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [...site.brand.keywords, `rượu vang ${site.city}`, `rượu vang ${site.province}`],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(site.url),
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      title: site.name,
      description: site.description,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#191919',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite()
  const gate = site.features.ageGate
  return (
    <html
      lang="vi"
      data-theme={site.theme.preset}
      // Tắt xác nhận tuổi: coi như đã xác nhận để CSS không khóa cuộn trang
      {...(gate ? {} : { 'data-age-ok': '1' })}
      className={`${display.variable} ${sans.variable} overflow-x-clip`}
      suppressHydrationWarning
    >
      <head>
        {gate && <script dangerouslySetInnerHTML={{ __html: ageGateScript }} />}
        <StructuredData type="organization" data={{}} />
      </head>
      <body className="pb-mobile-bar overflow-x-clip">
        <SiteProvider site={site}>
          <ClientProvider>{children}</ClientProvider>
          {gate && <AgeGate />}
        </SiteProvider>
      </body>
    </html>
  );
}
