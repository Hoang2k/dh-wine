import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './SectionHeading'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  image?: string
  imageAlt?: string
  breadcrumbs?: Crumb[]
  children?: React.ReactNode
}

/** Interior page header. With an image it renders as a dark editorial banner. */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  breadcrumbs,
  children,
}: PageHeroProps) {
  const dark = Boolean(image)

  return (
    <section className={cn('relative isolate overflow-hidden', dark ? 'grain bg-ink text-ivory' : 'border-b border-line bg-ivory')}>
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover opacity-55" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        </>
      )}
      <div className={cn('container-site', dark ? 'py-10 md:py-14' : 'py-8 md:py-10')}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone={dark ? 'light' : 'dark'} />}
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <Eyebrow tone={dark ? 'light' : 'dark'}>{eyebrow}</Eyebrow>}
          <h1 className={cn('heading-display text-display-lg', dark ? 'text-ivory' : 'text-ink')}>{title}</h1>
          {description && (
            <p className={cn('mt-4 max-w-2xl text-[0.9375rem] leading-relaxed md:text-base', dark ? 'text-ivory/75' : 'text-stone')}>
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  )
}

function Breadcrumbs({ items, tone }: { items: Crumb[]; tone: 'dark' | 'light' }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 md:mb-6">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-xs tracking-wide', tone === 'light' ? 'text-ivory/60' : 'text-stone')}>
        <li>
          <Link href="/" className="transition-colors hover:text-gold">
            Trang chủ
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className="size-3 opacity-60" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn('line-clamp-1', tone === 'light' ? 'text-ivory' : 'text-ink')}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
