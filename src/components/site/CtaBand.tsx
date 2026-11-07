import Link from 'next/link'
import { ArrowRight, Handshake, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ctaLinks, siteConfig } from '@/config/site'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeading'

type CtaBandProps = {
  eyebrow?: string
  title?: React.ReactNode
  description?: string
}

/** Closing conversion panel shared by every page. */
export default function CtaBand({
  eyebrow = 'Hợp tác cùng Đức Minh Wine',
  title = (
    <>
      Xây dựng danh sách vang <em className="text-gold">xứng tầm</em> thương hiệu của bạn.
    </>
  ),
  description = 'Nhận bảng giá sỉ, chính sách chiết khấu theo sản lượng và mẫu thử miễn phí cho nhà hàng, khách sạn tại Khánh Hòa.',
}: CtaBandProps) {
  return (
    <section className="bg-paper py-10 md:py-14">
      <div className="container-site">
        <Reveal className="grain relative isolate overflow-hidden rounded-card bg-wine px-6 py-10 text-ivory sm:px-10 md:py-12 lg:px-14">
          <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full border border-gold/20" />
          <div aria-hidden className="absolute -right-8 -top-8 -z-10 size-48 rounded-full border border-gold/30" />
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
              <h2 className="heading-display text-display-md text-ivory">{title}</h2>
              <p className="mt-4 max-w-xl text-ivory/75">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
              <Button asChild size="lg">
                <Link href={ctaLinks.quote}>
                  Yêu cầu báo giá
                  <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
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
        </Reveal>
      </div>
    </section>
  )
}
