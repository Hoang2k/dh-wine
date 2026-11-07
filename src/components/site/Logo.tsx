import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import logoImg from '@/assets/image/logo.jpg'

type LogoProps = { tone?: 'dark' | 'light'; className?: string }

export default function Logo({ tone = 'dark', className }: LogoProps) {
  const light = tone === 'light'
  return (
    <Link
      href="/"
      aria-label="Đức Minh Wine — Trang chủ"
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <Image
        src={logoImg}
        alt=""
        aria-hidden
        priority
        sizes="(min-width: 1024px) 56px, 48px"
        className={cn(
          'size-12 rounded-full border bg-white object-cover transition-colors duration-500 lg:size-14',
          light ? 'border-gold/70' : 'border-ink/10 group-hover:border-wine',
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'heading-display text-[1.375rem] font-semibold tracking-[0.02em] lg:text-[1.5rem]',
            light ? 'text-ivory' : 'text-ink',
          )}
        >
          Đức Minh
        </span>
        <span className={cn('mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.32em]', light ? 'text-gold' : 'text-wine')}>
          Wine · Khánh Hòa
        </span>
      </span>
    </Link>
  )
}
