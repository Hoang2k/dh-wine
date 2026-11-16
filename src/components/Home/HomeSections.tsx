import Image from 'next/image'
import Link from 'next/link'
import { Check, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/site/ProductCard'
import { wineTypes } from '@/data/wines'
import { partnershipSteps, solutions } from '@/data/solutions'
import { ctaLinks } from '@/config/site'
import { fill, getSite } from '@/lib/site'
import { IWine } from '@/types/wine'

/** Head block shared by the home sections below: head on the left columns, one line, an action at the far edge. */
function BlockTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="heading-display text-display-md max-w-[22ch] text-ink">{title}</h2>
        {subtitle && <p className="mt-4 max-w-[52ch] text-lead text-stone">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Wine types as rows with their counts (no longer on the home page; kept for other routes). */
export function HomeCategories({ wines }: { wines: IWine[] }) {
  const items = wineTypes.map((t) => ({
    href: `/san-pham?loai=${t.value}`,
    label: t.label,
    count: wines.filter((w) => w.type === t.value).length,
  }))
  return (
    <section aria-labelledby="home-cat-title" className="section-y bg-washi">
      <div className="container-site">
        <h2 id="home-cat-title" className="heading-display text-display-md text-ink">
          Theo loại vang
        </h2>
        <ul className="mt-12 border-t border-ink">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link href={item.href} className="group flex items-baseline justify-between gap-6 py-6">
                <span className="font-display text-display-sm text-ink transition-colors group-hover:text-gold-deep">{item.label}</span>
                <span className="num text-sm text-stone">{item.count} sản phẩm</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Solutions by business type (not on the home page; kept for reuse). */
export async function HomeAudiences() {
  const siteConfig = await getSite()
  const fx = (t: string) => fill(t, siteConfig)
  return (
    <section className="section-y bg-ivory">
      <div className="container-site">
        <BlockTitle
          title="Giải pháp cho doanh nghiệp"
          subtitle="Chính sách giá, danh mục và dịch vụ riêng cho từng mô hình kinh doanh."
          action={
            <Link href="/giai-phap" className="link-underline text-[0.9375rem] font-semibold text-gold-deep">
              Tất cả giải pháp
            </Link>
          }
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <Link key={s.id} href={`/giai-phap#${s.id}`} className="group flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-5 font-display text-display-sm text-ink transition-colors group-hover:text-gold-deep">{s.title}</h3>
              <p className="mt-1 text-sm text-stone">{s.audience}</p>
              <p className="mt-3 line-clamp-3 text-ink-soft">{fx(s.summary)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Corporate gifts with matching wines (not on the home page; kept for reuse). */
export async function HomeCorporateGifts({ wines }: { wines: IWine[] }) {
  const siteConfig = await getSite()
  const fx = (t: string) => fill(t, siteConfig)
  const gift = solutions.find((s) => s.id === 'qua-tang')
  const giftWines = wines.filter((w) => w.segments.includes('gift')).slice(0, 4)
  if (!gift) return null

  return (
    <section id="qua-tang-doanh-nghiep" className="section-y">
      <div className="container-site">
        <BlockTitle
          title="Quà tặng doanh nghiệp"
          subtitle={fx(gift.audience)}
          action={
            <Link href="/san-pham?nhu-cau=gift" className="link-underline text-[0.9375rem] font-semibold text-gold-deep">
              Vang phù hợp làm quà
            </Link>
          }
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="relative isolate overflow-hidden rounded-card bg-wine-deep p-8 text-on-dark sm:p-10 lg:col-span-5">
            <p className="text-sm text-on-dark-muted">Tết, hội nghị, tri ân đối tác</p>
            <h3 className="heading-display mt-4 text-display-md text-on-dark">Hộp quà rượu vang mang dấu ấn thương hiệu của bạn</h3>
            <p className="mt-4 text-on-dark-muted">{fx(gift.summary)}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {gift.benefits.map((b) => (
                <li key={b.title} className="flex gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-gold" />
                  <span>
                    <span className="block font-semibold">{b.title}</span>
                    <span className="block text-sm text-on-dark-muted">{fx(b.text)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold">
                <Link href={ctaLinks.gift}>Nhận báo giá quà tặng</Link>
              </Button>
              <Button asChild variant="outlineLight">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone /> {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 content-start gap-x-6 gap-y-12 lg:col-span-7">
            {giftWines.map((w, i) => (
              <ProductCard key={w.slug} wine={w} className={i >= 2 ? 'lg:hidden' : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Dealer programme: a change of paper to ink, the offer on the left, the two actions on the right. */
export async function HomeDealer() {
  const siteConfig = await getSite()
  const fx = (t: string) => fill(t, siteConfig)
  const dealer = solutions.find((s) => s.id === 'phan-phoi')
  if (!dealer) return null

  return (
    <section aria-labelledby="home-dealer-title" className="bg-washi pb-24 md:pb-32">
      <div className="container-site">
      <div className="grid gap-14 rounded-[var(--radius-panel)] bg-ink px-6 py-16 text-on-dark sm:px-10 md:py-20 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="lg:col-span-7">
          <h2 id="home-dealer-title" className="heading-display text-display-md max-w-[16ch] text-on-dark">
            Trở thành đại lý {siteConfig.shortName}
          </h2>
          <p className="mt-6 max-w-[56ch] text-lead text-on-dark-muted">{fx(dealer.summary)}</p>
          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {dealer.benefits.map((b) => (
              <li key={b.title} className="border-t border-ink-rule pt-5">
                <span className="block font-display text-display-sm text-on-dark">{b.title}</span>
                <span className="mt-2 block text-on-dark-muted">{fx(b.text)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-end gap-4 lg:col-span-4 lg:col-start-9">
          <p className="text-on-dark-muted">
            Để lại thông tin, bộ phận kinh doanh sẽ liên hệ trao đổi chính sách đại lý và khu vực phân phối.
          </p>
          <div className="mt-2 flex flex-col gap-3">
            <Button asChild size="lg" variant="gold">
              <Link href={ctaLinks.dealer}>Đăng ký làm đại lý</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link href={ctaLinks.sales}>Liên hệ kinh doanh</Link>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

/** The partnership process as a real ordered list, numbered by CSS counter. */
export async function HomeProcess() {
  const siteConfig = await getSite()
  const fx = (t: string) => fill(t, siteConfig)
  return (
    <section aria-labelledby="home-process-title" className="section-y bg-washi">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2 id="home-process-title" className="heading-display text-display-md max-w-[12ch] text-ink lg:col-span-4">
          Từ buổi tư vấn đến bàn tiệc
        </h2>
        <ol className="grid gap-x-8 gap-y-12 [counter-reset:step] sm:grid-cols-2 lg:col-span-8">
          {partnershipSteps.map((step) => (
            <li
              key={step.title}
              className="border-t border-ink pt-6 [counter-increment:step] before:block before:font-display before:text-[3.5rem] before:leading-none before:text-wine before:content-[counter(step)]"
            >
              <h3 className="mt-5 font-display text-display-sm text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[40ch] text-ink-soft">{fx(step.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
