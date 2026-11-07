import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Eyebrow } from './SectionHeading'
import QuoteForm from './QuoteForm'
import Reveal from './Reveal'

type QuoteSectionProps = {
  id?: string
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  defaultBusinessType?: string
}

/** Dark lead-capture block: pitch + direct contacts on the left, quote form on the right. */
export default function QuoteSection({
  id = 'bao-gia',
  eyebrow = 'Yêu cầu báo giá',
  title = (
    <>
      Nhận bảng giá sỉ trong <em className="text-gold">24 giờ</em>.
    </>
  ),
  description = 'Để lại thông tin, chuyên viên kinh doanh sẽ liên hệ tư vấn danh mục phù hợp, gửi bảng giá sỉ và sắp xếp lịch thử vang miễn phí.',
  defaultBusinessType,
}: QuoteSectionProps) {
  const { contact } = siteConfig
  const channels = [
    { icon: Phone, label: 'Hotline', value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: 'Zalo', value: contact.phone, href: contact.zalo },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: 'Giờ làm việc', value: contact.hours },
  ]

  return (
    <section id={id} className="grain section-y relative bg-ink text-ivory">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className="heading-display text-display-md text-ivory">{title}</h2>
          <p className="mt-6 text-ivory/70 md:text-lg">{description}</p>
          <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <Icon className="size-4 text-gold" />
                  <span className="w-28 text-xs uppercase tracking-[0.16em] text-ivory/50">{label}</span>
                  <span className="text-ivory">{value}</span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 py-4 transition-colors hover:text-gold"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-4">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <div className="rounded-card border border-ivory/10 bg-ivory/[0.03] p-6 sm:p-10">
            <QuoteForm tone="dark" defaultBusinessType={defaultBusinessType} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
