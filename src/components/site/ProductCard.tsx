import Image from 'next/image'
import Link from 'next/link'
import { IWine } from '@/types/wine'
import { wineBadges, wineTypeLabel } from '@/data/wines'
import { cn } from '@/lib/utils'
import WineBottle from './WineBottle'
import AddToQuoteButton from './AddToQuoteButton'

const badgeTone: Record<NonNullable<IWine['badge']>, string> = {
  bestseller: 'bg-wine text-ivory',
  new: 'bg-gold text-ink',
  sommelier: 'bg-ink text-gold',
}

export default function ProductCard({ wine, className }: { wine: IWine; className?: string }) {
  const href = `/san-pham/${wine.slug}`

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-[border-color,box-shadow] duration-300 hover:border-gold hover:shadow-lift',
        className,
      )}
    >
      <Link href={href} tabIndex={-1} aria-hidden className="relative flex aspect-square items-end justify-center bg-ivory pt-6">
        {wine.badge && (
          <span className={cn('absolute left-3 top-3 z-10 rounded-xs px-2 py-1 text-[0.6875rem] font-semibold', badgeTone[wine.badge])}>
            {wineBadges[wine.badge]}
          </span>
        )}
        <span className="absolute right-3 top-3 z-10 rounded-xs bg-paper/90 px-2 py-1 text-[0.6875rem] font-medium text-stone">
          {wine.country}
        </span>
        {wine.image ? (
          <Image
            src={wine.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-[86%] pb-4 transition-transform duration-500 ease-luxe group-hover:-translate-y-1.5">
            <WineBottle id={wine.slug} type={wine.type} shape={wine.bottle} producer={wine.producer} vintage={wine.vintage} />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs font-medium text-wine">
          {wineTypeLabel(wine.type)} · {wine.region}
        </p>
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.75em] text-[0.9375rem] font-semibold leading-snug text-ink">
          <Link href={href} className="transition-colors hover:text-wine">
            {wine.name}
          </Link>
        </h3>
        <dl className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone">
          <div className="flex gap-1">
            <dt>Nồng độ:</dt>
            <dd className="text-ink-soft">{wine.abv}%</dd>
          </div>
          <div className="flex gap-1">
            <dt className="sr-only">Dung tích</dt>
            <dd className="text-ink-soft">{wine.volumeMl}ml</dd>
          </div>
          <div className="flex gap-1">
            <dt className="sr-only">Quy cách</dt>
            <dd className="text-ink-soft">{wine.caseSize} chai/thùng</dd>
          </div>
        </dl>

        <p className="mt-3 border-t border-dashed border-line pt-3 text-sm">
          <span className="text-stone">Giá sỉ: </span>
          <Link href={href} className="font-bold text-wine hover:underline">
            Liên hệ báo giá
          </Link>
        </p>

        <div className="mt-auto pt-3">
          <AddToQuoteButton slug={wine.slug} compact className="w-full" />
        </div>
      </div>
    </article>
  )
}
