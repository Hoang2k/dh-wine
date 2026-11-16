import Image from 'next/image'
import Link from 'next/link'
import { IWine } from '@/types/wine'
import { wineBadges, wineTypeLabel } from '@/data/wines'
import { cn } from '@/lib/utils'
import WineBottle from './WineBottle'
import AddToQuoteButton from './AddToQuoteButton'

const badgeTone: Record<NonNullable<IWine['badge']>, string> = {
  bestseller: 'bg-gold-deep text-paper',
  new: 'bg-ink text-paper',
  sommelier: 'bg-gold text-ink',
}

/** Product tile: the bottle in a tinted well, the name, origin, three facts in columns, one quote action. */
export default function ProductCard({ wine, className }: { wine: IWine; className?: string }) {
  const href = `/san-pham/${wine.slug}`

  return (
    <article className={cn('group relative flex h-full min-w-0 flex-col', className)}>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card bg-ivory transition-colors duration-[var(--dur-short)] group-hover:bg-cream"
      >
        {wine.badge && (
          <span className={cn('absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[0.8125rem] font-medium', badgeTone[wine.badge])}>
            {wineBadges[wine.badge]}
          </span>
        )}
        {wine.image ? (
          <Image
            src={wine.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            // multiply blends white product backgrounds into the tinted well
            className="object-contain p-6 mix-blend-multiply sm:p-8"
          />
        ) : (
          <div className="h-[78%]">
            <WineBottle id={wine.slug} type={wine.type} shape={wine.bottle} producer={wine.producer} vintage={wine.vintage} />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="line-clamp-2 min-h-[2.4em] font-display text-[1.375rem] leading-[1.2] text-ink">
          <Link href={href} className="transition-colors hover:text-gold-deep">
            {wine.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-stone">
          {wineTypeLabel(wine.type)}, {wine.country}
        </p>

        <dl className="mt-4 grid grid-cols-3 border-t border-line pt-3 text-sm">
          <div>
            <dt className="sr-only">Nồng độ</dt>
            <dd className="num text-ink">{wine.abv}%</dd>
          </div>
          <div>
            <dt className="sr-only">Dung tích</dt>
            <dd className="num text-ink">{wine.volumeMl}&nbsp;ml</dd>
          </div>
          <div>
            <dt className="sr-only">Quy cách</dt>
            <dd className="num text-ink">{wine.caseSize}&nbsp;chai/thùng</dd>
          </div>
        </dl>

        <div className="mt-auto pt-4">
          <AddToQuoteButton slug={wine.slug} compact className="w-full" />
        </div>
      </div>
    </article>
  )
}
