import type { Metadata } from 'next'
import { fill, getSite } from '@/lib/site'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import QuoteSection from '@/components/site/QuoteSection'
import Reveal from '@/components/site/Reveal'
import SectionHeading from '@/components/site/SectionHeading'
import { Button } from '@/components/ui/button'
import { partnershipSteps, solutions } from '@/data/solutions'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  return {
    title: 'Giải pháp B2B',
    description:
      `Giải pháp rượu vang cho nhà hàng, khách sạn, nhà bán lẻ, đại lý và quà tặng doanh nghiệp tại ${site.province}: tư vấn wine list, giá sỉ, đào tạo và giao hàng 24h.`,
    alternates: { canonical: '/giai-phap' },
  }
}

const faqs = [
  {
    q: 'Đơn hàng tối thiểu là bao nhiêu?',
    a: 'Đa số nhãn vang có thể đặt từ 1–2 thùng (6 hoặc 12 chai) và được kết hợp nhiều nhãn trong cùng một đơn. Với đối tác ký hợp đồng, chúng tôi linh hoạt theo nhu cầu thực tế.',
  },
  {
    q: 'Thời gian giao hàng như thế nào?',
    a: 'Giao trong 24 giờ tại nội thành {thanhpho} và 24–48 giờ tại {khuvuc}. Đơn gấp cho sự kiện được ưu tiên xử lý.',
  },
  {
    q: 'Có hỗ trợ công nợ không?',
    a: 'Có. Đối tác nhà hàng, khách sạn ký hợp đồng được áp dụng chính sách công nợ theo tháng sau giai đoạn hợp tác ban đầu.',
  },
  {
    q: 'Sản phẩm có đầy đủ chứng từ, hóa đơn?',
    a: 'Toàn bộ sản phẩm nhập khẩu chính ngạch, có tem nhãn phụ tiếng Việt, chứng từ nhập khẩu và xuất hóa đơn VAT đầy đủ.',
  },
  {
    q: 'Tôi có thể thử vang trước khi đặt hàng?',
    a: 'Hoàn toàn được. Chuyên viên của chúng tôi sẽ mang mẫu thử đến tận nơi và tư vấn kết hợp với thực đơn của bạn, miễn phí.',
  },
]

export default async function SolutionsPage() {
  const site = await getSite()
  const fx = (t: string) => fill(t, site).replace('{khuvuc}', site.serviceAreas.filter((a) => a !== site.city).join(', '))
  return (
    <>
      <PageHero
        title={
          <>
            Đối tác rượu vang cho doanh nghiệp của bạn.
          </>
        }
        description="Từ nhà hàng ven biển đến resort năm sao, từ cửa hàng bán lẻ đến hộp quà Tết doanh nghiệp, mỗi mô hình có một giải pháp riêng."
        image={images.bar}
        imageAlt="Quầy bar với rượu vang"
        breadcrumbs={[
          // { label: 'Giải pháp B2B' },
        ]}
      >
        <nav aria-label="Giải pháp" className="flex flex-wrap gap-2">
          {solutions.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-on-dark-muted px-4 py-2 text-sm text-on-dark transition-colors hover:border-gold hover:text-gold"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {solutions.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.id} id={s.id} className={cn('section-y', flip ? 'bg-ivory' : 'bg-washi')}>
            <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className={cn(flip ? 'lg:order-2 lg:col-span-5 lg:col-start-8' : 'lg:col-span-7')}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-card">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                                  </div>
              </Reveal>
              <div className={cn('min-w-0', flip ? 'lg:col-span-6' : 'lg:col-span-4 lg:col-start-9')}>
                <Reveal>
                  <h2 className="heading-display text-display-md text-ink">{s.title}</h2>
                  <p className="mt-3 text-stone">{s.audience}</p>
                  <p className="prose-lead mt-5">{fx(s.summary)}</p>
                </Reveal>
                <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {s.benefits.map((b, j) => (
                    <Reveal as="li" key={b.title} delay={j * 80} className="flex gap-4">
                      <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold-deep" strokeWidth={2.25} />
                      <div>
                        <h3 className="font-semibold text-ink">{b.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-stone">{fx(b.text)}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Button asChild className="mt-10 h-auto min-h-12 whitespace-normal py-3 text-left">
                  <Link href={`/bao-gia?loai-hinh=${encodeURIComponent(s.businessType)}`}>
                    Nhận đề xuất giải pháp
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )
      })}

      <section className="section-y border-t border-line bg-washi">
        <div className="container-site">
          <SectionHeading title="Hợp tác đơn giản, minh bạch" />
          <ol className="mt-14 grid gap-x-8 gap-y-12 [counter-reset:step] sm:grid-cols-2 lg:grid-cols-4">
            {partnershipSteps.map((step) => (
              <li
                key={step.title}
                className="border-t border-ink pt-6 [counter-increment:step] before:block before:font-display before:text-[3.5rem] before:leading-none before:text-wine before:content-[counter(step)]"
              >
                <h3 className="mt-5 heading-display text-display-sm text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[36ch] text-ink-soft">{fx(step.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-t border-line bg-ivory">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <SectionHeading title="Câu hỏi thường gặp" className="lg:col-span-4" />
          <div className="divide-y divide-line-strong border-y border-ink lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 heading-display text-xl text-ink md:text-2xl">
                  {f.q}
                  <span aria-hidden className="relative size-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-ink transition-[transform,opacity] duration-[var(--dur-short)] group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[62ch] text-ink-soft">{fx(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  )
}
