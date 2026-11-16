'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ctaLinks } from '@/config/site'
import { useSite } from '@/lib/site-context'
import { wineSegments, wineTypes } from '@/data/wines'
import { getWineCountries } from '@/services/wine'

const columns = [
  {
    title: 'Sản phẩm',
    links: [
      { label: 'Tất cả sản phẩm', href: '/san-pham' },
      ...wineTypes.map((t) => ({ label: t.label, href: `/san-pham?loai=${t.value}` })),
    ],
  },
  {
    title: 'Giải pháp B2B',
    links: [
      { label: 'Nhà hàng & Khách sạn', href: '/giai-phap#horeca' },
      { label: 'Nhà bán lẻ', href: '/giai-phap#ban-le' },
      { label: 'Nhà phân phối & Đại lý', href: '/giai-phap#phan-phoi' },
      { label: 'Quà tặng doanh nghiệp', href: '/giai-phap#qua-tang' },
    ],
  },
  {
    title: 'Hỗ trợ khách hàng',
    links: [
      { label: 'Yêu cầu báo giá', href: ctaLinks.quote },
      { label: 'Trở thành đại lý', href: ctaLinks.dealer },
      { label: 'Liên hệ kinh doanh', href: ctaLinks.sales },
      { label: 'Về chúng tôi', href: '/gioi-thieu' },
      { label: 'Tạp chí rượu vang', href: '/tin-tuc' },
    ],
  },
]

export default function Footer() {
  const siteConfig = useSite()
  const { contact } = siteConfig
  const [countries, setCountries] = useState<string[]>([])
  useEffect(() => {
    getWineCountries().then(setCountries).catch(() => setCountries([]))
  }, [])
  const tags = [
    ...countries.map((c) => ({ label: `Rượu vang ${c}`, href: `/san-pham?quoc-gia=${encodeURIComponent(c)}` })),
    ...wineSegments.map((s) => ({ label: `Vang ${s.label.toLowerCase()}`, href: `/san-pham?nhu-cau=${s.value}` })),
  ]

  return (
    <footer className="bg-ink text-on-dark">
      <div className="container-site pb-14 pt-20 md:pt-24">
        {/* Mast: the wordmark set large over the links */}
        <div className="flex flex-col gap-6 border-b border-ink-rule pb-10 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-none tracking-[-0.025em] text-on-dark">{siteConfig.name}</p>
          <p className="max-w-[40ch] text-on-dark-muted">{siteConfig.description}</p>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-8">
          <ul className="space-y-3 text-on-dark-muted lg:col-span-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" /> {contact.address}
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Phone className="size-4 shrink-0 text-gold" /> Hotline: <strong className="font-semibold text-on-dark">{contact.phone}</strong>
              </a>
            </li>
            <li>
              <a href={contact.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                <MessageCircle className="size-4 shrink-0 text-gold" /> Zalo: {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex min-w-0 items-center gap-3 break-all transition-colors hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" /> {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-gold" /> {contact.hours}
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="label text-on-dark">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-on-dark-muted transition-colors hover:text-gold">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="mt-14 border-t border-ink-rule pt-8">
            <p className="label text-on-dark">Danh mục rượu vang</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="block rounded-full border border-ink-rule px-3.5 py-1.5 text-sm text-on-dark-muted transition-colors hover:border-gold hover:text-gold"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-ink-rule">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-on-dark-muted md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Bảo lưu mọi quyền.</p>
          <ul className="flex flex-col gap-1 md:items-end">
            <li>Uống có trách nhiệm</li>
            <li>Không bán rượu cho người dưới 18 tuổi</li>
            <li>Đã uống rượu bia, không lái xe.</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
