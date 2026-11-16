'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import logoImg from '@/assets/image/logo.jpg'
import { useSite } from '@/lib/site-context'

type LogoProps = { tone?: 'dark' | 'light'; className?: string }

export default function Logo({ tone = 'dark', className }: LogoProps) {
  const light = tone === 'light'
  const site = useSite()
  const imgCls = cn(
    'size-11 rounded-full border bg-paper object-cover transition-colors duration-[var(--dur-short)] lg:size-12',
    light ? 'border-gold' : 'border-line group-hover:border-wine',
  )
  return (
    <Link
      href="/"
      aria-label={`${site.name}, trang chủ`}
      className={cn('group inline-flex shrink-0 items-center gap-3 whitespace-nowrap', className)}
    >
      {site.logo ? (
        // Logo tải lên trong admin: kích thước tùy ý nên dùng img thường
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.logo} alt="" aria-hidden className={imgCls} />
      ) : (
        <Image src={logoImg} alt="" aria-hidden priority sizes="(min-width: 1024px) 56px, 48px" className={imgCls} />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'heading-display text-[1.375rem] tracking-[-0.01em] lg:text-[1.5rem]',
            light ? 'text-on-dark' : 'text-ink',
          )}
        >
          {site.shortName}
        </span>
        <span className={cn('mt-1 text-[0.8125rem] lg:hidden xl:block', light ? 'text-on-dark-muted' : 'text-stone')}>Rượu vang {site.province}</span>
      </span>
    </Link>
  )
}
