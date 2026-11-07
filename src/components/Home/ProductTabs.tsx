'use client'
import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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

/** Section heading + tab strip + product grid, the catalogue block used on the homepage. */
export default function ProductTabs({ id, title, subtitle, tabs, limit = 10, className }: ProductTabsProps) {
  const visibleTabs = tabs.filter((t) => t.wines.length > 0)
  const [active, setActive] = React.useState(visibleTabs[0]?.key)
  const current = visibleTabs.find((t) => t.key === active) ?? visibleTabs[0]
  if (!current) return null

  return (
    <section aria-labelledby={`${id}-title`} className={cn('py-10 md:py-14', className)}>
      <div className="container-site">
        <div className="flex flex-col gap-4 border-b-2 border-line lg:flex-row lg:items-end lg:justify-between">
          <div className="relative pb-3 after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-wine">
            <h2 id={`${id}-title`} className="heading-display text-display-sm uppercase tracking-tight text-ink">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-stone">{subtitle}</p>}
          </div>
          <div role="tablist" aria-label={title} className="scrollbar-hide -mx-4 flex gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
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
                    'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    selected ? 'bg-wine text-ivory' : 'bg-ivory text-ink-soft hover:bg-cream',
                  )}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${current.key}`}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
        >
          {current.wines.slice(0, limit).map((wine) => (
            <ProductCard key={wine.slug} wine={wine} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={current.href}
            className="inline-flex items-center gap-2 rounded-full border border-wine px-6 py-2.5 text-sm font-semibold text-wine transition-colors hover:bg-wine hover:text-ivory"
          >
            Xem tất cả{current.key === 'all' ? '' : `: ${current.label}`} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
