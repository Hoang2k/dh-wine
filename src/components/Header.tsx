'use client'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Handshake,
  Headphones,
  LayoutGrid,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react'
import Logo from '@/components/site/Logo'
import { Button } from '@/components/ui/button'
import { useQuote } from '@/contexts/QuoteContext'
import { ctaLinks, mainNav, siteConfig } from '@/config/site'
import { Brand, brands } from '@/data/brands'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'

const brandHref = (slug: string) => `/san-pham?thuong-hieu=${encodeURIComponent(slug)}`
const perColumn = Math.ceil(brands.length / 3)
const brandColumns = [0, 1, 2].map((i) => brands.slice(i * perColumn, (i + 1) * perColumn)).filter((c) => c.length)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setIsMobileMenuOpen(false)
      setMegaOpen(false)
    }
    window.addEventListener('keydown', onKey)
    if (isMobileMenuOpen) setTimeout(() => firstLinkRef.current?.focus(), 80)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActive = (href: string) => {
    const path = href.split('#')[0]
    return path === '/' ? pathname === '/' : pathname.startsWith(path) && !href.includes('#')
  }
  const productsActive = pathname.startsWith('/san-pham') || pathname.startsWith('/products')

  return (
    <>
      {/* Top bar */}
      <div className="hidden bg-ink text-ivory/75 md:block">
        <div className="container-site flex h-9 items-center justify-between gap-6 text-[0.8125rem]">
          <p className="truncate">
            <span className="font-semibold text-gold">B2B</span>&nbsp;·&nbsp;{siteConfig.tagline}
          </p>
          <ul className="flex shrink-0 items-center divide-x divide-ivory/15">
            <li className="pr-4">
              <Link href={ctaLinks.dealer} className="transition-colors hover:text-gold">
                Trở thành đại lý
              </Link>
            </li>
            <li className="px-4">
              <Link href={ctaLinks.sales} className="transition-colors hover:text-gold">
                Liên hệ kinh doanh
              </Link>
            </li>
            <li className="pl-4">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-gold">
                <Mail className="size-3.5" /> {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main row — sticky on mobile, scrolls away on desktop where the nav bar sticks */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper lg:static">
        <div className="container-site flex h-[64px] items-center gap-3 lg:h-[88px] lg:gap-8">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="-ml-2 grid size-11 place-items-center text-ink lg:hidden"
            aria-label="Mở menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-drawer"
          >
            <Menu className="size-6" />
          </button>

          <Logo className="mr-auto lg:mr-0" />

          <SearchForm className="hidden flex-1 lg:flex lg:max-w-xl xl:max-w-2xl" />

          <a href={siteConfig.contact.phoneHref} className="group ml-auto hidden items-center gap-3 xl:flex">
            <span className="grid size-11 place-items-center rounded-full bg-gold-soft text-ink transition-colors group-hover:bg-gold">
              <Headphones className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-stone">Hotline kinh doanh</span>
              <span className="block text-base font-bold text-wine">{siteConfig.contact.phone}</span>
            </span>
          </a>

          <div className="flex items-center gap-1 lg:gap-3">
            <QuoteLink />
            <Button asChild className="hidden lg:inline-flex">
              <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
            </Button>
          </div>
        </div>
        <div className="container-site pb-3 lg:hidden">
          <SearchForm />
        </div>
      </header>

      {/* Category nav bar (desktop) */}
      <nav
        aria-label="Điều hướng chính"
        className="sticky top-0 z-50 hidden h-[var(--header-h)] bg-wine text-ivory shadow-soft lg:block"
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-site flex h-full items-stretch justify-between">
          <ul className="flex items-stretch">
            <li onMouseEnter={() => setMegaOpen(true)}>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen((o) => !o)}
                className={cn(
                  'flex h-full items-center gap-2 whitespace-nowrap bg-wine-deep px-5 text-[0.9375rem] font-semibold transition-colors',
                  megaOpen || productsActive ? 'text-gold' : 'hover:text-gold',
                )}
              >
                <LayoutGrid className="size-4" />
                Thương hiệu
                <ChevronDown className={cn('size-4 transition-transform duration-300', megaOpen && 'rotate-180')} />
              </button>
            </li>
            <li>
              <NavLink href="/san-pham" active={productsActive}>
                Sản phẩm
              </NavLink>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} active={isActive(item.href)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            href={ctaLinks.dealer}
            className="flex items-center gap-2 whitespace-nowrap pl-4 text-[0.9375rem] font-semibold text-gold transition-colors hover:text-ivory"
          >
            <Handshake className="size-4" /> Trở thành đại lý
          </Link>
        </div>

        <div
          id="mega-menu"
          className={cn(
            'absolute inset-x-0 top-full border-t-2 border-gold bg-paper text-ink shadow-lift transition-[opacity,visibility,transform] duration-300',
            megaOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
          )}
        >
          <div className="container-site grid grid-cols-12 gap-8 py-8">
            {brandColumns.map((col, ci) => (
              <MegaColumn key={ci} title={ci === 0 ? 'Thương hiệu' : undefined} className="col-span-3">
                {col.map((b) => (
                  <MegaLink key={b.slug} href={brandHref(b.slug)} icon={<BrandMark brand={b} />}>
                    {b.name}
                  </MegaLink>
                ))}
                {ci === brandColumns.length - 1 && (
                  <li className="pt-3">
                    <Link href="/san-pham" className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine hover:underline">
                      Xem tất cả sản phẩm <ArrowRight className="size-4" />
                    </Link>
                  </li>
                )}
              </MegaColumn>
            ))}
            <Link
              href={ctaLinks.gift}
              className="group relative col-span-3 flex min-h-56 flex-col justify-end overflow-hidden rounded-card bg-ink p-5 text-ivory"
            >
              <Image src={images.corporateGifts} alt="" fill sizes="25vw" className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.14em] text-gold">Quà tặng doanh nghiệp</span>
              <span className="relative mt-1 text-lg font-bold leading-snug">Hộp quà in logo cho đối tác</span>
              <span className="relative mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                Nhận báo giá <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[100] transition-[opacity,visibility] duration-300 lg:hidden',
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="absolute inset-0 bg-ink/50" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cn(
            'absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-paper text-ink shadow-lift transition-transform duration-300 ease-luxe',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-wine px-4">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="grid size-11 place-items-center text-ivory"
              aria-label="Đóng menu"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav aria-label="Điều hướng di động" className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-line">
              <li>
                <Link ref={firstLinkRef} href="/" className="block px-4 py-3.5 font-semibold">
                  Trang chủ
                </Link>
              </li>
              <li>
                <details className="group" open={productsActive}>
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 font-semibold [&::-webkit-details-marker]:hidden">
                    Thương hiệu
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-5 bg-ivory px-4 pb-5 pt-2">
                    <DrawerChips title="Thương hiệu" items={brands.map((b) => ({ href: brandHref(b.slug), label: b.name }))} />
                    <Link href="/san-pham" className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine">
                      Xem tất cả sản phẩm <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </details>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn('block px-4 py-3.5 font-semibold', isActive(item.href) && 'text-wine')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-line p-4">
            <Button asChild className="w-full">
              <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="wine" size="sm">
                <Link href={ctaLinks.dealer}>Trở thành đại lý</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={ctaLinks.sales}>Liên hệ kinh doanh</Link>
              </Button>
            </div>
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2 pt-1 text-sm text-stone">
              <Phone className="size-4 text-wine" /> Hotline: <strong className="text-ink">{siteConfig.contact.phone}</strong>
            </a>
          </div>
        </div>
      </div>

      <MobileActionBar onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <FloatingContact />
    </>
  )
}

function SearchForm({ className }: { className?: string }) {
  return (
    <Form action="/san-pham" role="search" className={cn('relative flex w-full', className)}>
      <label htmlFor="site-search" className="sr-only">
        Tìm kiếm sản phẩm
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder="Tìm theo tên sản phẩm, thương hiệu…"
        className="h-11 w-full min-w-0 rounded-l-xs border border-r-0 border-line-strong bg-paper px-4 text-[0.9375rem] outline-none transition-colors placeholder:text-stone-light focus-visible:border-wine"
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="grid h-11 w-14 shrink-0 place-items-center rounded-r-xs bg-wine text-ivory transition-colors hover:bg-wine-deep"
      >
        <Search className="size-5" />
      </button>
    </Form>
  )
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex h-full items-center whitespace-nowrap px-3 text-[0.9375rem] font-medium transition-colors xl:px-4',
        'after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:bg-gold after:transition-transform after:duration-300',
        active ? 'text-gold after:scale-x-100' : 'text-ivory/90 after:scale-x-0 hover:text-gold hover:after:scale-x-100',
      )}
    >
      {children}
    </Link>
  )
}

function MegaColumn({ title, className, children }: { title?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      {/* Untitled columns keep an empty heading row so lists stay aligned */}
      <p aria-hidden={!title} className="border-b border-line pb-3 text-sm font-bold uppercase tracking-[0.08em] text-wine">
        {title ?? '\u00a0'}
      </p>
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </div>
  )
}

function MegaLink({
  href,
  count,
  icon,
  children,
}: {
  href: string
  count?: number
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-3 px-2 py-1.5 -mx-2 text-[0.9375rem] text-ink-soft transition-colors hover:text-wine"
      >
        {icon}
        <span className="border-b border-transparent transition-colors group-hover:border-wine">{children}</span>
        {count !== undefined && <span className="ml-auto text-xs text-stone-light">{count}</span>}
      </Link>
    </li>
  )
}

/** Small brand logo; falls back to the brand initial until /public/images/brands/<slug>.png exists. */
function BrandMark({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-xs border border-line bg-paper p-1">
      {failed ? (
        <span aria-hidden className="text-sm font-bold text-wine">
          {brand.name.charAt(0)}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.logo} alt="" loading="lazy" onError={() => setFailed(true)} className="max-h-full max-w-full object-contain" />
      )}
    </span>
  )
}

function DrawerChips({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block rounded-full border border-line-strong bg-paper px-3 py-1.5 text-sm">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuoteLink() {
  const { count, hydrated } = useQuote()
  const label = hydrated && count > 0 ? `Danh sách báo giá (${count} sản phẩm)` : 'Danh sách báo giá'
  return (
    <Link
      href={ctaLinks.quote}
      aria-label={label}
      title={label}
      className="relative flex items-center gap-2 rounded-xs p-2.5 text-ink transition-colors duration-300 hover:bg-cream"
    >
      <span className="relative">
        <FileText className="size-6" strokeWidth={1.6} />
        {hydrated && count > 0 && (
          <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-wine px-1 text-[0.625rem] font-semibold leading-5 text-ivory">
            {count}
          </span>
        )}
      </span>
      <span className="hidden text-left text-xs leading-tight text-stone xl:block">
        Danh sách
        <br />
        <span className="text-sm font-semibold text-ink">báo giá</span>
      </span>
    </Link>
  )
}

/** Fixed bottom bar on phones and tablets, similar to retail wine sites. */
function MobileActionBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { count, hydrated } = useQuote()
  const itemCls = 'flex flex-1 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium'
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(25_25_25/0.08)] lg:hidden"
      style={{ height: 'calc(64px + env(safe-area-inset-bottom))' }}
    >
      <button type="button" onClick={onOpenMenu} className={itemCls}>
        <LayoutGrid className="size-5" /> Danh mục
      </button>
      <a href={siteConfig.contact.phoneHref} className={itemCls}>
        <Phone className="size-5 text-wine" /> Gọi ngay
      </a>
      <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer" className={itemCls}>
        <MessageCircle className="size-5 text-wine" /> Zalo
      </a>
      <Link href={ctaLinks.quote} className={cn(itemCls, 'relative bg-gold text-ink')}>
        <span className="relative">
          <FileText className="size-5" />
          {hydrated && count > 0 && (
            <span className="absolute -right-2.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-wine px-1 text-[0.5625rem] font-semibold leading-4 text-ivory">
              {count}
            </span>
          )}
        </span>
        Báo giá
      </Link>
    </div>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.63A20.6 20.6 0 0 0 14.25 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.18H7.95v2.94h2.53V21h3.02Z" />
    </svg>
  )
}

/** Square contact rail pinned to the vertical middle of the right edge (desktop). */
function FloatingContact() {
  const items = [
    {
      href: siteConfig.contact.phoneHref,
      label: `Gọi ${siteConfig.contact.phone}`,
      icon: <Phone className="size-5" />,
    },
    {
      href: siteConfig.contact.zalo,
      label: 'Chat Zalo',
      icon: <span className="text-[0.8125rem] font-bold tracking-tight">Zalo</span>,
      external: true,
    },
    {
      href: siteConfig.contact.facebook,
      label: 'Fanpage Facebook',
      icon: <FacebookIcon className="size-6" />,
      external: true,
    },
  ]

  return (
    <ul className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col divide-y divide-ivory/30 rounded-l-lg border-l-2 border-gold bg-wine shadow-lift lg:flex">
      {items.map((item) => (
        <li key={item.label} className="group relative">
          <a
            href={item.href}
            aria-label={item.label}
            {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="grid size-12 place-items-center text-ivory transition-colors group-first:rounded-tl-md group-last:rounded-bl-md hover:bg-wine-deep hover:text-gold focus-visible:bg-wine-deep focus-visible:text-gold focus-visible:outline-none"
          >
            {item.icon}
          </a>
          <span
            aria-hidden
            className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap bg-ink px-3 py-1.5 text-xs font-medium text-ivory opacity-0 transition-[opacity,transform] duration-200 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
