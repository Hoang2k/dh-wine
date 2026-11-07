import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Gift, Handshake, LayoutGrid, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/site/ProductCard'
import Reveal from '@/components/site/Reveal'
import WineBottle from '@/components/site/WineBottle'
import { wineTypes } from '@/data/wines'
import { partnershipSteps, solutions } from '@/data/solutions'
import { ctaLinks, siteConfig } from '@/config/site'
import { IWine } from '@/types/wine'

/** Plain section title in the retail style: bold uppercase with a wine underline. */
function BlockTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b-2 border-line sm:flex-row sm:items-end sm:justify-between">
      <div className="relative pb-3 after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-wine">
        <h2 className="heading-display text-display-sm uppercase tracking-tight text-ink">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-stone">{subtitle}</p>}
      </div>
      {action && <div className="pb-3">{action}</div>}
    </div>
  )
}

export function HomeCategories({ wines }: { wines: IWine[] }) {
  return (
    <section aria-labelledby="home-cat-title" className="pt-10 md:pt-14">
      <div className="container-site">
        <h2 id="home-cat-title" className="sr-only">
          Danh mục rượu vang
        </h2>
        <ul className="scrollbar-hide -mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0 lg:grid-cols-7">
          {wineTypes.map((t) => {
            const sample = wines.find((w) => w.type === t.value)
            const count = wines.filter((w) => w.type === t.value).length
            return (
              <li key={t.value} className="w-28 shrink-0 snap-start sm:w-auto">
                <Link
                  href={`/san-pham?loai=${t.value}`}
                  className="group flex h-full flex-col items-center rounded-card border border-line bg-paper px-2 py-4 text-center transition-colors hover:border-gold hover:bg-gold-soft/40"
                >
                  <span className="flex h-24 items-end justify-center">
                    {sample && (
                      <span className="h-full transition-transform duration-500 group-hover:-translate-y-1">
                        <WineBottle id={`cat-${t.value}`} type={t.value} shape={sample.bottle} producer={sample.producer} vintage={sample.vintage} />
                      </span>
                    )}
                  </span>
                  <span className="mt-3 text-sm font-semibold text-ink group-hover:text-wine">{t.label}</span>
                  <span className="text-xs text-stone">{count} sản phẩm</span>
                </Link>
              </li>
            )
          })}
          <li className="w-28 shrink-0 snap-start sm:w-auto">
            <Link
              href={ctaLinks.gift}
              className="group flex h-full flex-col items-center justify-center rounded-card border border-line bg-paper px-2 py-4 text-center transition-colors hover:border-gold hover:bg-gold-soft/40"
            >
              <span className="grid size-16 place-items-center rounded-full bg-wine-soft text-wine">
                <Gift className="size-7" />
              </span>
              <span className="mt-3 text-sm font-semibold text-ink group-hover:text-wine">Quà tặng</span>
              <span className="text-xs text-stone">Doanh nghiệp</span>
            </Link>
          </li>
          <li className="w-28 shrink-0 snap-start sm:w-auto">
            <Link
              href="/san-pham"
              className="group flex h-full flex-col items-center justify-center rounded-card border border-line bg-paper px-2 py-4 text-center transition-colors hover:border-gold hover:bg-gold-soft/40"
            >
              <span className="grid size-16 place-items-center rounded-full bg-gold-soft text-ink">
                <LayoutGrid className="size-7" />
              </span>
              <span className="mt-3 text-sm font-semibold text-ink group-hover:text-wine">Tất cả</span>
              <span className="text-xs text-stone">{wines.length} sản phẩm</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

export function HomeAudiences() {
  return (
    <section className="bg-ivory py-10 md:py-14">
      <div className="container-site">
        <BlockTitle
          title="Giải pháp cho doanh nghiệp"
          subtitle="Chính sách giá, danh mục và dịch vụ riêng cho từng mô hình kinh doanh"
          action={
            <Link href="/giai-phap" className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine hover:underline">
              Tất cả giải pháp <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.id} delay={i * 80} className="h-full">
              <Link
                href={`/giai-phap#${s.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-[border-color,box-shadow] hover:border-gold hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-ink group-hover:text-wine">{s.title}</h3>
                  <p className="mt-1 text-xs text-stone">{s.audience}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-wine">
                    Xem giải pháp <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomeCorporateGifts({ wines }: { wines: IWine[] }) {
  const gift = solutions.find((s) => s.id === 'qua-tang')
  const giftWines = wines.filter((w) => w.segments.includes('gift')).slice(0, 4)
  if (!gift) return null

  return (
    <section id="qua-tang-doanh-nghiep" className="py-10 md:py-14">
      <div className="container-site">
        <BlockTitle
          title="Quà tặng doanh nghiệp"
          subtitle={gift.audience}
          action={
            <Link href="/san-pham?nhu-cau=gift" className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine hover:underline">
              Vang phù hợp làm quà <ArrowRight className="size-4" />
            </Link>
          }
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <Reveal className="relative isolate overflow-hidden rounded-card bg-wine p-6 text-ivory sm:p-8 lg:col-span-5">
            <Image src={gift.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover opacity-25" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-wine via-wine/90 to-wine-deep/80" />
            <p className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
              <Gift className="size-3.5" /> Tết · Hội nghị · Tri ân đối tác
            </p>
            <h3 className="heading-display mt-5 text-display-md text-ivory">
              Hộp quà rượu vang mang <em className="text-gold">dấu ấn</em> thương hiệu của bạn
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/80">{gift.summary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {gift.benefits.map((b) => (
                <li key={b.title} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <span className="block text-sm font-semibold">{b.title}</span>
                    <span className="block text-xs leading-relaxed text-ivory/70">{b.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={ctaLinks.gift}>Nhận báo giá quà tặng</Link>
              </Button>
              <Button asChild variant="outlineLight">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone /> {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 content-start gap-3 sm:gap-4 lg:col-span-7">
            {giftWines.map((w, i) => (
              <ProductCard key={w.slug} wine={w} className={i >= 2 ? 'lg:hidden' : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeDealer() {
  const dealer = solutions.find((s) => s.id === 'phan-phoi')
  if (!dealer) return null

  return (
    <section className="grain relative isolate overflow-hidden bg-gradient-to-br from-ink via-ink to-wine-deep text-ivory">
      <div className="container-site grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <Handshake className="size-4" /> Chương trình đại lý
          </p>
          <h2 className="heading-display mt-3 text-display-md text-ivory">
            Trở thành đại lý của {siteConfig.name}
          </h2>
          <p className="mt-4 max-w-2xl text-ivory/75">{dealer.summary}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {dealer.benefits.map((b) => (
              <li key={b.title} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  <strong className="font-semibold text-ivory">{b.title}:</strong> <span className="text-ivory/70">{b.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <div className="rounded-card border border-gold/30 bg-ink/70 p-6 backdrop-blur sm:p-8">
            <p className="text-lg font-bold">Đăng ký hợp tác ngay hôm nay</p>
            <p className="mt-2 text-sm text-ivory/70">
              Để lại thông tin, bộ phận kinh doanh sẽ liên hệ trao đổi chính sách đại lý và khu vực phân phối.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild size="lg">
                <Link href={ctaLinks.dealer}>
                  Trở thành đại lý <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link href={ctaLinks.sales}>Liên hệ kinh doanh</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function HomeProcess() {
  return (
    <section className="bg-ivory py-10 md:py-14">
      <div className="container-site">
        <BlockTitle title="Quy trình hợp tác" subtitle="Từ buổi tư vấn đầu tiên đến chai vang trên bàn khách" />
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 80} className="relative rounded-card border border-line bg-paper p-5">
              <span className="grid size-10 place-items-center rounded-full bg-gold text-base font-bold text-ink">{i + 1}</span>
              <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
