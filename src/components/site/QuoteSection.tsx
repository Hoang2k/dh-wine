import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import { getSite } from '@/lib/site'
import QuoteForm from './QuoteForm'
import Reveal from './Reveal'

type QuoteSectionProps = {
  id?: string
  /** Kept for call-site compatibility; the head opens the block on its own. */
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  defaultBusinessType?: string
  /** Short promises shown under the contacts, each a title and one line. */
  facts?: { title: string; text: string }[]
}

/** Dark lead-capture block: pitch + direct contacts on the left, quote form on the right. */
export default async function QuoteSection({
  id = 'bao-gia',
  title = 'Nhận bảng giá sỉ trong 24 giờ',
  description = 'Để lại thông tin, chuyên viên kinh doanh sẽ liên hệ tư vấn danh mục phù hợp, gửi bảng giá sỉ và sắp xếp lịch thử vang miễn phí.',
  defaultBusinessType,
  facts,
}: QuoteSectionProps) {
  const siteConfig = await getSite()
  const { contact } = siteConfig
  const channels = [
    { icon: Phone, label: 'Hotline', value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: 'Zalo', value: contact.phone, href: contact.zalo },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: 'Giờ làm việc', value: contact.hours },
  ]

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y relative bg-wine-deep text-on-dark">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="min-w-0 lg:col-span-5">
          <h2 id={`${id}-title`} className="heading-display text-display-md max-w-[14ch] text-on-dark">{title}</h2>
          <p className="mt-6 max-w-[48ch] text-lead text-on-dark-muted">{description}</p>
          <ul className="mt-12 divide-y divide-on-dark-rule border-y border-on-dark-rule">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <Icon className="size-4 shrink-0 text-gold" />
                  <span className="w-28 shrink-0 text-sm text-on-dark-muted">{label}</span>
                  <span className="min-w-0 break-words text-on-dark">{value}</span>
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
          {facts && facts.length > 0 && (
            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.title}>
                  <dt className="font-display text-xl text-on-dark">{f.title}</dt>
                  <dd className="mt-1 text-sm text-on-dark-muted">{f.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        <Reveal delay={120} className="min-w-0 lg:col-span-7">
          <QuoteForm tone="dark" defaultBusinessType={defaultBusinessType} />
        </Reveal>
      </div>
    </section>
  )
}
