'use client'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  FileText,
  Handshake,
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
import { ctaLinks, mainNav } from '@/config/site'
import { useSite } from '@/lib/site-context'
import { Brand, brands } from '@/data/brands'
import { images } from '@/lib/images'
import { cn } from '@/lib/utils'

const brandHref = (slug: string) => `/san-pham?thuong-hieu=${encodeURIComponent(slug)}`
const perColumn = Math.ceil(brands.length / 3)
const brandColumns = [0, 1, 2].map((i) => brands.slice(i * perColumn, (i + 1) * perColumn)).filter((c) => c.length)

export default function Header() {
  const siteConfig = useSite()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMegaOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setIsMobileMenuOpen(false)
      setMegaOpen(false)
      setSearchOpen(false)
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
      {/* Top bar — slim, informational */}
      <div className="hidden bg-ink text-on-dark-muted md:block">
        <div className="container-site flex h-9 items-center justify-between gap-6 text-[0.8125rem]">
          <p className="truncate">{siteConfig.tagline}</p>
          <ul className="flex shrink-0 items-center gap-6">
            <li>
              <a href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-gold">
                <Phone className="size-3.5" /> {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-gold">
                <Mail className="size-3.5" /> {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <Link href={ctaLinks.dealer} className="flex items-center gap-1.5 text-gold transition-colors hover:text-on-dark">
                <Handshake className="size-3.5" /> Trở thành đại lý
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main header — one sticky row on every breakpoint */}
      <header
        className="sticky top-0 z-50 border-b border-line bg-paper"
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="container-site flex h-[64px] items-center gap-3 lg:h-[var(--header-h)] lg:gap-4">
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

          <nav aria-label="Điều hướng chính" className="hidden h-full min-w-0 flex-1 justify-center lg:flex">
            <ul className="flex h-full items-stretch">
              <li onMouseEnter={() => setMegaOpen(true)}>
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="mega-menu"
                  onClick={() => setMegaOpen((o) => !o)}
                  className={cn(navItemCls, (megaOpen || productsActive) && navActiveCls)}
                >
                  Thương hiệu
                  <ChevronDown className={cn('size-3.5 transition-transform duration-300', megaOpen && 'rotate-180')} />
                </button>
              </li>
              <li onMouseEnter={() => setMegaOpen(false)}>
                <NavLink href="/san-pham" active={productsActive}>
                  Sản phẩm
                </NavLink>
              </li>
              {mainNav.filter((i) => siteConfig.features.news || !i.href.startsWith('/tin-tuc')).map((item) => (
                <li key={item.href} onMouseEnter={() => setMegaOpen(false)}>
                  <NavLink href={item.href} active={isActive(item.href)}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Tìm kiếm'}
              aria-expanded={searchOpen}
              aria-controls="header-search"
              className="hidden size-11 place-items-center text-ink transition-colors hover:text-gold-deep lg:grid"
            >
              {searchOpen ? <X className="size-5" strokeWidth={1.6} /> : <Search className="size-5" strokeWidth={1.6} />}
            </button>
            <QuoteLink />
            <Button asChild size="sm" className="ml-2 hidden h-10 px-5 lg:inline-flex">
              <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
            </Button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="container-site pb-3 lg:hidden">
          <SearchForm />
        </div>

        {/* Desktop search drawer */}
        <div
          id="header-search"
          className={cn(
            'absolute inset-x-0 top-full hidden border-b border-line bg-paper transition-[opacity,visibility] duration-300 lg:block',
            searchOpen ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          <div className="container-narrow py-6">
            <SearchForm autoFocus={searchOpen} />
          </div>
        </div>

        {/* Mega menu — brands */}
        <div
          id="mega-menu"
          className={cn(
            'absolute inset-x-0 top-full hidden border-b border-line bg-paper text-ink shadow-lift transition-[opacity,visibility,transform] duration-300 lg:block',
            megaOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
          )}
        >
          <div className="container-site grid grid-cols-12 gap-10 py-10">
            {brandColumns.map((col, ci) => (
              <MegaColumn key={ci} title={ci === 0 ? 'Thương hiệu' : undefined} className="col-span-3">
                {col.map((b) => (
                  <MegaLink key={b.slug} href={brandHref(b.slug)} icon={<BrandMark brand={b} />}>
                    {b.name}
                  </MegaLink>
                ))}
                {ci === brandColumns.length - 1 && (
                  <li className="pt-4">
                    <Link href="/san-pham" className="link-underline text-sm font-medium text-gold-deep">
                      Xem tất cả sản phẩm
                    </Link>
                  </li>
                )}
              </MegaColumn>
            ))}
            <Link
              href={ctaLinks.gift}
              className="group relative col-span-3 flex min-h-56 flex-col justify-end overflow-hidden bg-ink p-6 text-on-dark"
            >
              <Image src={images.corporateGifts} alt="" fill sizes="25vw" className="object-cover opacity-50" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <span className="relative font-display text-2xl leading-snug">Hộp quà in logo cho đối tác</span>
              <span className="relative mt-2 text-sm text-on-dark-muted">Quà tặng doanh nghiệp</span>
              <span className="relative mt-4 text-sm font-semibold text-gold underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-gold">
                Nhận báo giá
              </span>
            </Link>
          </div>
        </div>
      </header>

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
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-ink px-4">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="grid size-11 place-items-center text-on-dark"
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
                    <Link href="/san-pham" className="text-sm font-semibold text-gold-deep underline underline-offset-4">
                      Xem tất cả sản phẩm
                    </Link>
                  </div>
                </details>
              </li>
              {mainNav.filter((i) => siteConfig.features.news || !i.href.startsWith('/tin-tuc')).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn('block px-4 py-3.5 font-semibold', isActive(item.href) && 'text-gold-deep')}
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
              <Phone className="size-4 text-gold-deep" /> Hotline: <strong className="text-ink">{siteConfig.contact.phone}</strong>
            </a>
          </div>
        </div>
      </div>

      <MobileActionBar onOpenMenu={() => setIsMobileMenuOpen(true)} />
      <FloatingContact />
    </>
  )
}

function SearchForm({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (autoFocus) setTimeout(() => inputRef.current?.focus(), 60)
  }, [autoFocus])
  return (
    <Form action="/san-pham" role="search" className={cn('relative flex w-full', className)}>
      <input
          ref={inputRef}
          name="q"
          type="search"
          aria-label="Tìm kiếm sản phẩm"
          placeholder="Tìm theo tên sản phẩm, thương hiệu…"
          className="peer h-11 w-full min-w-0 border-0 border-b border-line-strong bg-transparent pl-0 pr-12 text-[0.9375rem] outline-none transition-colors placeholder:text-stone focus-visible:border-gold-deep focus-visible:outline-none lg:h-14 lg:font-display lg:text-2xl"
        />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="absolute right-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center text-ink transition-colors hover:text-gold-deep"
      >
        <Search className="size-5" strokeWidth={1.6} />
      </button>
    </Form>
  )
}

const navItemCls = cn(
  'relative flex h-full items-center gap-1.5 whitespace-nowrap px-2 text-[0.875rem] font-medium text-ink-soft transition-colors xl:px-3.5 xl:text-[0.9375rem]',
  'after:absolute after:inset-x-2 after:bottom-[-1px] after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold-deep after:transition-transform after:duration-[var(--dur-short)] xl:after:inset-x-3.5',
  'hover:text-ink hover:after:scale-x-100',
)
const navActiveCls = 'text-ink after:scale-x-100'

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={cn(navItemCls, active && navActiveCls)}>
      {children}
    </Link>
  )
}

function MegaColumn({ title, className, children }: { title?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      {/* Untitled columns keep an empty heading row so lists stay aligned */}
      <p aria-hidden={!title} className="label border-b border-line pb-3 text-stone">
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
        className="group flex items-center gap-3 px-2 py-1.5 -mx-2 text-[0.9375rem] text-ink-soft transition-colors hover:text-gold-deep"
      >
        {icon}
        <span className="border-b border-transparent transition-colors group-hover:border-wine">{children}</span>
        {count !== undefined && <span className="num ml-auto text-sm text-stone">{count}</span>}
      </Link>
    </li>
  )
}

/** Small brand logo; falls back to the brand initial until /public/images/brands/<slug>.png exists. */
function BrandMark({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-paper p-1">
      {failed ? (
        <span aria-hidden className="font-display text-base text-gold-deep">
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
      <p className="label text-stone">{title}</p>
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
      className="relative grid size-11 place-items-center text-ink transition-colors duration-300 hover:text-gold-deep"
    >
      <span className="relative">
        <FileText className="size-5" strokeWidth={1.6} />
        {hydrated && count > 0 && (
          <span className="absolute -right-2.5 -top-2 grid min-w-[18px] place-items-center rounded-full bg-gold-deep px-1 text-[0.6875rem] font-semibold leading-[18px] text-paper">
            {count}
          </span>
        )}
      </span>
    </Link>
  )
}

/** Fixed bottom bar on phones and tablets, similar to retail wine sites. */
function MobileActionBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const siteConfig = useSite()
  const { count, hydrated } = useQuote()
  const itemCls = 'flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium'
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] shadow-bar lg:hidden"
      style={{ height: 'calc(64px + env(safe-area-inset-bottom))' }}
    >
      <button type="button" onClick={onOpenMenu} className={itemCls}>
        <LayoutGrid className="size-5" /> Danh mục
      </button>
      <a href={siteConfig.contact.phoneHref} className={itemCls}>
        <Phone className="size-5 text-gold-deep" /> Gọi ngay
      </a>
      <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer" className={itemCls}>
        <MessageCircle className="size-5 text-gold-deep" /> Zalo
      </a>
      <Link href={ctaLinks.quote} className={cn(itemCls, 'relative bg-gold-deep text-paper')}>
        <span className="relative">
          <FileText className="size-5" />
          {hydrated && count > 0 && (
            <span className="absolute -right-2.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6875rem] font-semibold leading-4 text-ink">
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
  const siteConfig = useSite()
  const items = [
    {
      href: siteConfig.contact.phoneHref,
      label: `Gọi ${siteConfig.contact.phone}`,
      icon: <Phone className="size-4" />,
    },
    {
      href: siteConfig.contact.zalo,
      label: 'Chat Zalo',
      icon: <span className="text-xs font-bold">Zalo</span>,
      external: true,
    },
    {
      href: siteConfig.contact.facebook,
      label: 'Fanpage Facebook',
      icon: <FacebookIcon className="size-5" />,
      external: true,
    },
  ]

  return (
    <ul className="fixed bottom-8 right-6 z-40 hidden flex-col gap-2 lg:flex">
      {items.map((item) => (
        <li key={item.label} className="group relative">
          <a
            href={item.href}
            aria-label={item.label}
            {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
            className="grid size-11 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-gold-deep hover:bg-gold-deep hover:text-paper active:translate-y-px"
          >
            {item.icon}
          </a>
          <span
            aria-hidden
            className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-xs bg-ink px-3 py-1.5 text-sm font-medium text-on-dark opacity-0 transition-[opacity,transform] duration-[var(--dur-short)] group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-[800ms]"
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
