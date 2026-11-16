'use client'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BannerSlide = {
  href: string
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  text?: string
  cta: string
  /** CSS object-position, to keep baked-in banner text inside the crop */
  position?: string
}

const INTERVAL = 5000
const SWIPE_THRESHOLD = 50

export default function BannerSlider({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  // Explicit stop from the visible control; hover and focus only pause while they last.
  const [stopped, setStopped] = React.useState(false)
  const touchX = React.useRef<number | null>(null)
  const go = React.useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length])

  React.useEffect(() => {
    if (paused || stopped || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, paused, stopped, go, slides.length])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    setPaused(true)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(dx) > SWIPE_THRESHOLD) go(index + (dx < 0 ? 1 : -1))
    }
    touchX.current = null
    setPaused(false)
  }

  return (
    <div className="container-site">
    <div
      className="group/slider relative overflow-hidden rounded-card bg-ink"
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-[var(--dur-long)] ease-luxe motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s, i) => {
          const active = i === index
          return (
            <Link
              key={s.href + s.title}
              href={s.href}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}: ${s.title}`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              className="relative block aspect-[16/9] w-full shrink-0 sm:aspect-[2/1] lg:aspect-[1760/620]"
            >
              <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="100vw" className="object-cover" style={{ objectPosition: s.position ?? 'center' }} />
            </Link>
          )
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner trước"
            className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-opacity hover:bg-gold focus-visible:opacity-100 group-hover/slider:opacity-100 sm:grid lg:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Banner tiếp theo"
            className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-opacity hover:bg-gold focus-visible:opacity-100 group-hover/slider:opacity-100 sm:grid lg:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-paper px-2 py-1 sm:bottom-4 sm:right-4">
            {slides.map((s, i) => (
              <button
                key={s.href + s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Chuyển đến banner ${i + 1}`}
                aria-current={i === index}
                className="grid size-7 place-items-center"
              >
                <span aria-hidden className={cn('size-2 rounded-full transition-colors duration-[var(--dur-short)]', i === index ? 'bg-gold-deep' : 'bg-line-strong')} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStopped((v) => !v)}
              aria-label={stopped ? 'Tiếp tục chạy banner' : 'Dừng banner'}
              aria-pressed={stopped}
              className="grid size-7 place-items-center rounded-full text-ink hover:bg-cream"
            >
              {stopped ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  )
}
