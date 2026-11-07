import Link from 'next/link'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from '@/components/site/Logo'
import { Button } from '@/components/ui/button'
import { ctaLinks, siteConfig } from '@/config/site'
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
  const { contact } = siteConfig
  const tags = [
    ...getWineCountries().map((c) => ({ label: `Rượu vang ${c}`, href: `/san-pham?quoc-gia=${encodeURIComponent(c)}` })),
    ...wineSegments.map((s) => ({ label: `Vang ${s.label.toLowerCase()}`, href: `/san-pham?nhu-cau=${s.value}` })),
  ]

  return (
    <footer className="bg-ink text-ivory">
      <div className="bg-gold text-ink">
        <div className="container-site flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-bold">Nhà hàng, khách sạn, đại lý hay doanh nghiệp?</p>
            <p className="mt-0.5 text-sm text-ink/75">Nhận bảng giá sỉ và tư vấn danh mục rượu vang phù hợp với mô hình của bạn.</p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Button asChild variant="dark">
              <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
            </Button>
            <Button asChild variant="wine">
              <Link href={ctaLinks.dealer}>Trở thành đại lý</Link>
            </Button>
            <Button asChild variant="outline" className="border-ink/40 bg-transparent">
              <Link href={ctaLinks.sales}>Liên hệ kinh doanh</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-10 pb-10 pt-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/60">{siteConfig.description}</p>
          <ul className="mt-6 space-y-2.5 text-sm text-ivory/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {contact.address}
            </li>
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Phone className="size-4 shrink-0 text-gold" /> Hotline: <strong>{contact.phone}</strong>
              </a>
            </li>
            <li>
              <a href={contact.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
                <MessageCircle className="size-4 shrink-0 text-gold" /> Zalo: {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" /> {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-gold" /> {contact.hours}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="border-b border-ivory/10 pb-3 text-sm font-bold uppercase tracking-[0.08em] text-gold">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ivory/70 transition-colors hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-site border-t border-ivory/10 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ivory/50">Danh mục rượu vang</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block rounded-xs border border-ivory/15 px-2.5 py-1 text-xs text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-ivory/10 bg-black/30">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Bảo lưu mọi quyền.</p>
          <p>Uống có trách nhiệm · Không bán rượu cho người dưới 18 tuổi · Đã uống rượu bia, không lái xe.</p>
        </div>
      </div>
    </footer>
  )
}
