'use client'

import Link from 'next/link'
import { Handshake, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ctaLinks } from '@/config/site'
import { useSite } from '@/lib/site-context'

type CtaBandProps = {
  /** Kept for call-site compatibility; the band opens on its head. */
  eyebrow?: string
  title?: React.ReactNode
  description?: string
}

/** Closing conversion panel shared by every page. */
export default function CtaBand({
  title = 'Xây dựng danh sách vang xứng tầm thương hiệu của bạn',
  description,
}: CtaBandProps) {
  const siteConfig = useSite()
  const text = description ?? `Nhận bảng giá sỉ, chính sách chiết khấu theo sản lượng và mẫu thử miễn phí cho nhà hàng, khách sạn tại ${siteConfig.province}.`
  return (
    <section className="bg-washi pb-24 md:pb-32">
      <div className="container-site">
      <div className="grid items-end gap-10 rounded-[var(--radius-panel)] bg-wine-deep px-6 py-16 text-on-dark sm:px-10 md:py-20 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="lg:col-span-7">
          <h2 className="heading-display text-display-md max-w-[20ch] text-on-dark">{title}</h2>
          <p className="mt-5 max-w-[52ch] text-lead text-on-dark-muted">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:col-start-9 lg:flex-col lg:items-stretch">
          <Button asChild size="lg" variant="gold">
            <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link href={ctaLinks.dealer}>
              <Handshake />
              Trở thành đại lý
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <a href={siteConfig.contact.phoneHref}>
              <Phone />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </div>
      </div>
    </section>
  )
}
