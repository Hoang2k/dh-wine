import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import QuoteForm from '@/components/site/QuoteForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ Đức Minh Wine để được tư vấn danh mục rượu vang, đặt lịch thử vang và nhận báo giá sỉ tại Khánh Hòa.',
  alternates: { canonical: '/lien-he' },
}

export default function ContactPage() {
  const { contact } = siteConfig
  const cards = [
    { icon: Phone, label: 'Hotline kinh doanh', value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: 'Zalo', value: 'Nhắn tin tư vấn', href: contact.zalo },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Văn phòng & kho', value: contact.address },
    { icon: Clock, label: 'Giờ làm việc', value: contact.hours },
  ]

  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title={
          <>
            Hãy bắt đầu bằng một <em className="text-wine">cuộc trò chuyện</em>.
          </>
        }
        description="Tư vấn danh mục, đặt lịch thử vang tận nơi hoặc nhận báo giá sỉ — đội ngũ Đức Minh Wine luôn sẵn sàng hỗ trợ."
        breadcrumbs={[{ label: 'Liên hệ' }]}
      />

      <section className="bg-ivory pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="grid content-start gap-px overflow-hidden rounded-card border border-line bg-line lg:col-span-5">
            {cards.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-wine transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone">{label}</span>
                    <span className="mt-1 block text-[1.0625rem] font-medium text-ink">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label} className="bg-paper">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-5 p-6 transition-colors hover:bg-ivory"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-5 p-6">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="rounded-card border border-line bg-paper p-6 sm:p-10 lg:col-span-7">
            <p className="eyebrow text-wine">Gửi lời nhắn</p>
            <h2 className="mt-4 heading-display text-display-sm text-ink">Chúng tôi sẽ phản hồi trong 24 giờ.</h2>
            <QuoteForm className="mt-8" subjectPrefix="Liên hệ" submitLabel="Gửi lời nhắn" />
          </div>
        </div>
      </section>
    </>
  )
}
