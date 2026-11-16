'use client'
import * as React from 'react'
import Link from 'next/link'
import ProductCard from '@/components/site/ProductCard'
import { IWine } from '@/types/wine'
import { cn } from '@/lib/utils'

export type ProductTab = { key: string; label: string; href: string; wines: IWine[] }

type ProductTabsProps = {
  id: string
  title: string
  subtitle?: string
  tabs: ProductTab[]
  limit?: number
  className?: string
}

/** Centred serif heading + underline tabs + airy product grid — the catalogue block on the homepage. */
export default function ProductTabs({ id, title, subtitle, tabs, limit = 8, className }: ProductTabsProps) {
  const visibleTabs = tabs.filter((t) => t.wines.length > 0)
  const [active, setActive] = React.useState(visibleTabs[0]?.key)
  const current = visibleTabs.find((t) => t.key === active) ?? visibleTabs[0]
  if (!current) return null

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('section-y bg-washi', className)}>
      <div className="container-site">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id={`${id}-title`} className="heading-display text-display-md max-w-[16ch] text-ink">
            {title}
          </h2>
          {subtitle && <p className="max-w-[44ch] text-lead text-stone md:text-right">{subtitle}</p>}
        </div>

        <div
          role="tablist"
          aria-label={title}
          className="scrollbar-hide -mx-4 mt-12 flex justify-start gap-8 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0"
        >
          {visibleTabs.map((t) => {
            const selected = t.key === current.key
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`${id}-tab-${t.key}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                onClick={() => setActive(t.key)}
                className={cn(
                  'relative shrink-0 pb-4 text-base font-medium transition-colors',
                  'after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:bg-gold-deep after:transition-transform after:duration-[var(--dur-short)]',
                  selected ? 'text-ink after:scale-x-100' : 'text-stone after:scale-x-0 hover:text-ink',
                )}
              >
                {t.label}
                <span className="num ml-1.5 text-sm text-stone">{t.wines.length}</span>
              </button>
            )
          })}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${current.key}`}
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16 [&>*]:min-w-0"
        >
          {current.wines.slice(0, limit).map((wine) => (
            <ProductCard key={wine.slug} wine={wine} />
          ))}
        </div>

        <div className="mt-16">
          <Link href={current.href} className="link-underline text-[0.9375rem] font-semibold text-gold-deep">
            Xem tất cả{current.key === 'all' ? ' sản phẩm' : `: ${current.label}`}
          </Link>
        </div>
      </div>
    </section>
  )
}
