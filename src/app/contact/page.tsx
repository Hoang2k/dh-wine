import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import QuoteForm from '@/components/site/QuoteForm'
import { getSite } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    title: 'Liên hệ',
    description: `Liên hệ ${site.name} để được tư vấn danh mục rượu vang, đặt lịch thử vang và nhận báo giá sỉ tại ${site.province}.`,
    alternates: { canonical: '/lien-he' },
  }
}

export default async function ContactPage() {
  const siteConfig = await getSite()
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
        title={
          <>
            Hãy bắt đầu bằng một cuộc trò chuyện.
          </>
        }
        description={`Tư vấn danh mục, đặt lịch thử vang tận nơi hoặc nhận báo giá sỉ, đội ngũ ${siteConfig.name} luôn sẵn sàng hỗ trợ.`}
        breadcrumbs={[{ label: 'Liên hệ' }]}
      />

      <section className="bg-washi pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="grid content-start border-t border-ink lg:col-span-5">
            {cards.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-gold-deep transition-colors group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-paper">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-sm text-stone">{label}</span>
                    <span className="mt-1 block text-[1.0625rem] font-medium text-ink">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label} className="border-b border-line">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-5 py-6"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-5 py-6">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="heading-display text-display-md max-w-[14ch] text-ink">Gửi lời nhắn, phản hồi trong 24 giờ</h2>
            <QuoteForm className="mt-8" subjectPrefix="Liên hệ" submitLabel="Gửi lời nhắn" />
          </div>
        </div>
      </section>
    </>
  )
}
