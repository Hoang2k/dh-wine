'use client'
import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import QuoteForm from '@/components/site/QuoteForm'
import WineBottle from '@/components/site/WineBottle'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/contexts/QuoteContext'
import { wines, wineTypeLabel } from '@/data/wines'
import { siteConfig } from '@/config/site'

export default function QuoteClient({ defaultBusinessType }: { defaultBusinessType: string }) {
  const { items, hydrated, updateItem, removeItem, clear } = useQuote()

  const lines = React.useMemo(
    () =>
      items.flatMap((item) => {
        const wine = wines.find((w) => w.slug === item.slug)
        return wine ? [{ wine, cases: item.cases }] : []
      }),
    [items],
  )
  const totalCases = lines.reduce((sum, l) => sum + l.cases, 0)

  return (
    <section className="bg-ivory pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <div className="flex items-baseline justify-between border-b border-ink pb-4">
              <h2 className="heading-display text-display-sm text-ink">Danh sách báo giá</h2>
              {lines.length > 0 && (
                <span className="text-sm text-stone">
                  {lines.length} nhãn · {totalCases} thùng
                </span>
              )}
            </div>

            {!hydrated ? (
              <div className="space-y-4 py-6" aria-hidden>
                {[0, 1].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-card bg-cream" />
                ))}
              </div>
            ) : lines.length === 0 ? (
              <div className="py-10">
                <p className="text-stone">
                  Danh sách đang trống. Quý khách có thể thêm sản phẩm từ danh mục, hoặc gửi yêu cầu chung — chúng tôi sẽ đề xuất danh mục phù hợp.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link href="/san-pham">
                    Chọn từ danh mục <ArrowRight />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-line">
                  {lines.map(({ wine, cases }) => (
                    <li key={wine.slug} className="flex gap-4 py-5">
                      <Link href={`/san-pham/${wine.slug}`} className="flex h-24 w-16 shrink-0 items-end justify-center rounded-xs bg-cream py-2">
                        <WineBottle id={`q-${wine.slug}`} type={wine.type} shape={wine.bottle} producer={wine.producer} vintage={wine.vintage} />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow text-[0.625rem] text-wine">{wineTypeLabel(wine.type)} · {wine.country}</p>
                        <Link href={`/san-pham/${wine.slug}`} className="mt-2 block heading-display text-xl leading-tight text-ink hover:text-wine">
                          {wine.producer}
                        </Link>
                        <p className="line-clamp-1 text-sm text-stone">
                          {wine.name} {wine.vintage !== 'NV' && wine.vintage}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex h-9 items-center rounded-xs border border-line-strong">
                            <button type="button" aria-label="Giảm" disabled={cases <= 1} onClick={() => updateItem(wine.slug, cases - 1)} className="grid h-full w-9 place-items-center hover:bg-cream disabled:opacity-30">
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-16 text-center text-sm">
                              <span className="font-semibold text-ink">{cases}</span> thùng
                            </span>
                            <button type="button" aria-label="Tăng" onClick={() => updateItem(wine.slug, cases + 1)} className="grid h-full w-9 place-items-center hover:bg-cream">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(wine.slug)}
                            className="inline-flex items-center gap-1.5 text-xs text-stone transition-colors hover:text-destructive"
                            aria-label={`Xóa ${wine.producer} khỏi danh sách`}
                          >
                            <Trash2 className="size-3.5" /> Xóa
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
                  <Link href="/san-pham" className="text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-wine">
                    + Thêm sản phẩm
                  </Link>
                  <button type="button" onClick={clear} className="text-stone hover:text-destructive">
                    Xóa tất cả
                  </button>
                </div>
              </>
            )}

            <div className="mt-10 rounded-card bg-ink p-6 text-sm text-ivory/75">
              <p className="eyebrow text-gold">Cần tư vấn ngay?</p>
              <p className="mt-3">
                Gọi <a href={siteConfig.contact.phoneHref} className="font-semibold text-ivory underline decoration-gold underline-offset-4">{siteConfig.contact.phone}</a> hoặc nhắn{' '}
                <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer" className="font-semibold text-ivory underline decoration-gold underline-offset-4">Zalo</a>{' '}
                — {siteConfig.contact.hours}.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card border border-line bg-paper p-6 sm:p-10">
            <p className="eyebrow text-wine">Thông tin doanh nghiệp</p>
            <h2 className="mt-4 heading-display text-display-sm text-ink">Gửi yêu cầu cho chúng tôi</h2>
            <p className="mt-3 text-stone">
              {lines.length > 0
                ? `Có ${lines.length} sản phầm trong danh sách báo giá của quý khách.`
                : 'Mô tả nhu cầu để chúng tôi đề xuất danh mục và bảng giá phù hợp.'}
            </p>
            <QuoteForm
              key={defaultBusinessType}
              className="mt-8"
              defaultBusinessType={defaultBusinessType}
              lines={lines.map(({ wine, cases }) => ({
                label: `${wine.producer} ${wine.name} ${wine.vintage}`,
                cases,
              }))}
              onSubmitted={clear}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
