'use client'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BannerSlide = {
  href: string
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  text?: string
  cta: string
}

const INTERVAL = 5000
const SWIPE_THRESHOLD = 50

export default function BannerSlider({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const touchX = React.useRef<number | null>(null)
  const go = React.useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length])

  React.useEffect(() => {
    if (paused || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL)
    return () => window.clearTimeout(t)
  }, [index, paused, go, slides.length])

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
    <div
      className="group/slider relative overflow-hidden bg-ink"
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
        className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
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
              className="relative block aspect-[4/3] w-full shrink-0 sm:aspect-[2/1] lg:aspect-[1680/580]"
            >
              <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} sizes="100vw" className="object-cover" />
              {/* <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
              <span className="container-site relative flex h-full flex-col justify-center text-ivory">
                <span className="max-w-lg">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">{s.eyebrow}</span>
                  <span className="heading-display mt-2 block text-display-md text-ivory lg:text-display-lg">{s.title}</span>
                  {s.text && (
                    <span className="mt-3 hidden text-[0.9375rem] leading-relaxed text-ivory/80 sm:block">{s.text}</span>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink">
                    {s.cta} <ArrowRight className="size-4" />
                  </span>
                </span>
              </span> */}
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
            className="absolute left-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-ivory/80 text-ink opacity-0 shadow transition-opacity hover:bg-gold focus-visible:opacity-100 group-hover/slider:opacity-100 sm:grid lg:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Banner tiếp theo"
            className="absolute right-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-ivory/80 text-ink opacity-0 shadow transition-opacity hover:bg-gold focus-visible:opacity-100 group-hover/slider:opacity-100 sm:grid lg:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 sm:bottom-4">
            {slides.map((s, i) => (
              <button
                key={s.href + s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Chuyển đến banner ${i + 1}`}
                aria-current={i === index}
                className={cn('h-2 rounded-full transition-all duration-300', i === index ? 'w-6 bg-gold' : 'w-2 bg-ivory/60 hover:bg-ivory')}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
