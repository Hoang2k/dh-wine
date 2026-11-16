import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  /** Kept for call-site compatibility; the head opens the page on its own. */
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  image?: string
  imageAlt?: string
  breadcrumbs?: Crumb[]
  children?: React.ReactNode
}

/** Interior page header (Banner posture): breadcrumb, a large head on the left columns, its line beside it. */
export default function PageHero({ title, description, image, imageAlt = '', breadcrumbs, children }: PageHeroProps) {
  const dark = Boolean(image)

  return (
    <section className={cn('relative isolate overflow-hidden', dark ? 'bg-ink text-on-dark' : 'border-b border-line bg-washi')}>
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover opacity-50" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      )}
      <div className="container-site pb-14 pt-8 md:pb-20 md:pt-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone={dark ? 'light' : 'dark'} />}
        <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1 className={cn('heading-display text-display-lg max-w-[18ch] lg:col-span-7', dark ? 'text-on-dark' : 'text-ink')}>{title}</h1>
          {(description || children) && (
            <div className="lg:col-span-5 lg:pb-2">
              {description && (
                <p className={cn('max-w-[48ch] text-lead', dark ? 'text-on-dark-muted' : 'text-stone')}>{description}</p>
              )}
              {children && <div className="mt-6">{children}</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Breadcrumbs({ items, tone }: { items: Crumb[]; tone: 'dark' | 'light' }) {
  const light = tone === 'light'
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', light ? 'text-on-dark-muted' : 'text-stone')}>
        <li>
          <Link href="/" className={cn('transition-colors', light ? 'hover:text-gold' : 'hover:text-ink')}>
            Trang chủ
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3.5 shrink-0" />
            {item.href ? (
              <Link href={item.href} className={cn('transition-colors', light ? 'hover:text-gold' : 'hover:text-ink')}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn('line-clamp-1', light ? 'text-on-dark' : 'text-ink')}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
