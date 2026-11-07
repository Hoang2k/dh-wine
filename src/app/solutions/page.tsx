import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import QuoteSection from '@/components/site/QuoteSection'
import Reveal from '@/components/site/Reveal'
import SectionHeading, { Eyebrow } from '@/components/site/SectionHeading'
import { Button } from '@/components/ui/button'
import { partnershipSteps, solutions } from '@/data/solutions'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Giải pháp B2B',
  description:
    'Giải pháp rượu vang cho nhà hàng, khách sạn, nhà bán lẻ, đại lý và quà tặng doanh nghiệp tại Khánh Hòa: tư vấn wine list, giá sỉ, đào tạo và giao hàng 24h.',
  alternates: { canonical: '/giai-phap' },
}

const faqs = [
  {
    q: 'Đơn hàng tối thiểu là bao nhiêu?',
    a: 'Đa số nhãn vang có thể đặt từ 1–2 thùng (6 hoặc 12 chai) và được kết hợp nhiều nhãn trong cùng một đơn. Với đối tác ký hợp đồng, chúng tôi linh hoạt theo nhu cầu thực tế.',
  },
  {
    q: 'Thời gian giao hàng như thế nào?',
    a: 'Giao trong 24 giờ tại nội thành Nha Trang và 24–48 giờ tại Cam Ranh, Ninh Hòa, Diên Khánh, Vạn Ninh, Cam Lâm. Đơn gấp cho sự kiện được ưu tiên xử lý.',
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

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Giải pháp B2B"
        title={
          <>
            Đối tác rượu vang cho <em className="text-gold">doanh nghiệp</em> của bạn.
          </>
        }
        description="Từ nhà hàng ven biển đến resort năm sao, từ cửa hàng bán lẻ đến hộp quà Tết doanh nghiệp — mỗi mô hình có một giải pháp riêng."
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
              className="rounded-full border border-ivory/25 px-4 py-2 text-sm text-ivory/85 transition-colors hover:border-gold hover:text-gold"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {solutions.map((s, i) => {
        const flip = i % 2 === 1
        return (
          <section key={s.id} id={s.id} className={cn('section-y', flip ? 'bg-cream' : 'bg-ivory')}>
            <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
              <Reveal className={cn('lg:col-span-6', flip && 'lg:order-2')}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-card">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute left-6 top-6 heading-display text-6xl text-gold drop-shadow">{s.index}</span>
                </div>
              </Reveal>
              <div className="min-w-0 lg:col-span-6">
                <Reveal>
                  <Eyebrow>{s.audience}</Eyebrow>
                  <h2 className="heading-display text-display-md text-ink">{s.title}</h2>
                  <p className="prose-lead mt-5">{s.summary}</p>
                </Reveal>
                <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {s.benefits.map((b, j) => (
                    <Reveal as="li" key={b.title} delay={j * 80} className="flex gap-4">
                      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                        <Check className="size-3.5" strokeWidth={2.5} />
                      </span>
                      <div>
                        <h3 className="font-semibold text-ink">{b.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-stone">{b.text}</p>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <Button asChild className="mt-10 h-auto min-h-12 whitespace-normal py-3 text-left">
                  <Link href={`/bao-gia?loai-hinh=${encodeURIComponent(s.businessType)}`}>
                    Nhận đề xuất giải pháp
                    <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )
      })}

      <section className="section-y border-t border-line bg-ivory">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Quy trình" title="Hợp tác đơn giản, minh bạch." />
          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {partnershipSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 100} className="relative text-center">
                {i < partnershipSteps.length - 1 && (
                  <span aria-hidden className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem+1.5rem)] bg-line-strong md:block" />
                )}
                <span className="mx-auto grid size-16 place-items-center rounded-full border border-ink heading-display text-2xl text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-6 heading-display text-2xl text-ink">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-60 text-sm leading-relaxed text-stone">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y border-t border-line bg-cream">
        <div className="container-narrow">
          <SectionHeading align="center" eyebrow="Câu hỏi thường gặp" title="Giải đáp cho đối tác." />
          <div className="mt-12 divide-y divide-line-strong border-y border-line-strong">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 heading-display text-xl text-ink md:text-2xl">
                  {f.q}
                  <span aria-hidden className="relative size-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-stone">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </>
  )
}
