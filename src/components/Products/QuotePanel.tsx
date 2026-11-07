'use client'
import * as React from 'react'
import Link from 'next/link'
import { FileText, MessageCircle, Minus, Phone, Plus } from 'lucide-react'
import AddToQuoteButton from '@/components/site/AddToQuoteButton'
import { Button } from '@/components/ui/button'
import { ctaLinks, siteConfig } from '@/config/site'
import { IWine } from '@/types/wine'

export default function QuotePanel({ wine }: { wine: IWine }) {
  const [cases, setCases] = React.useState(wine.moqCases)
  const bottles = cases * wine.caseSize

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className="text-stone">
          Đặt tối thiểu: <strong className="text-ink">{wine.moqCases} thùng</strong>
        </span>
        <span className="text-stone">
          Quy cách: <strong className="text-ink">{wine.caseSize} chai/thùng</strong>
        </span>
      </div>

      <div className="flex gap-3">
        <div className="flex h-12 shrink-0 items-center rounded-xs border border-line-strong">
          <button
            type="button"
            aria-label="Giảm số thùng"
            disabled={cases <= 1}
            onClick={() => setCases((c) => Math.max(1, c - 1))}
            className="grid h-full w-10 place-items-center text-ink transition-colors hover:bg-cream disabled:opacity-30"
          >
            <Minus className="size-4" />
          </button>
          <label className="flex flex-col items-center leading-none">
            <span className="sr-only">Số thùng</span>
            <input
              type="number"
              min={1}
              max={999}
              inputMode="numeric"
              value={cases}
              onChange={(e) => setCases(Math.min(999, Math.max(1, Number(e.target.value) || 1)))}
              className="w-12 bg-transparent text-center text-base font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[0.625rem] text-stone">thùng</span>
          </label>
          <button
            type="button"
            aria-label="Tăng số thùng"
            onClick={() => setCases((c) => Math.min(999, c + 1))}
            className="grid h-full w-10 place-items-center text-ink transition-colors hover:bg-cream"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <AddToQuoteButton slug={wine.slug} cases={cases} className="h-12 min-w-0 flex-1 px-4" />
      </div>
      <p className="text-xs text-stone">
        Tương đương {bottles} chai.{cases < wine.moqCases && ` Đơn tối thiểu ${wine.moqCases} thùng — chúng tôi sẽ tư vấn thêm.`}
      </p>

      <Button asChild variant="wine" size="lg" className="w-full">
        <Link href={ctaLinks.quote}>
          <FileText /> Yêu cầu báo giá ngay
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button asChild variant="outline" size="sm" className="h-11">
          <a href={siteConfig.contact.phoneHref}>
            <Phone /> {siteConfig.contact.phone}
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="h-11">
          <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer">
            <MessageCircle /> Chat Zalo
          </a>
        </Button>
      </div>
    </div>
  )
}
