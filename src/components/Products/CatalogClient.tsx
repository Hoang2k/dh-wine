'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/site/ProductCard'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ctaLinks, siteConfig } from '@/config/site'
import { Brand } from '@/data/brands'
import { wineSegments, wineTypes } from '@/data/wines'
import { filterWines } from '@/services/wine'
import { IWine, WineSegment, WineType } from '@/types/wine'
import { cn } from '@/lib/utils'

type SortKey = 'featured' | 'name' | 'vintage'

type CatalogClientProps = {
  wines: IWine[]
  brands: Brand[]
  countries: string[]
  initial: { brand: string; type: string; country: string; segment: string; search: string }
}

type Option = { value: string; label: string; count: number }

const isType = (v: string): v is WineType => wineTypes.some((t) => t.value === v)
const isSegment = (v: string): v is WineSegment => wineSegments.some((s) => s.value === v)

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Nổi bật' },
  { value: 'name', label: 'Tên A–Z' },
  { value: 'vintage', label: 'Niên vụ mới' },
]

export default function CatalogClient({ wines, brands, countries, initial }: CatalogClientProps) {
  const pathname = usePathname()
  const [brand, setBrand] = React.useState(brands.some((b) => b.slug === initial.brand) ? initial.brand : '')
  const [type, setType] = React.useState<WineType | ''>(isType(initial.type) ? initial.type : '')
  const [country, setCountry] = React.useState(countries.includes(initial.country) ? initial.country : '')
  const [segment, setSegment] = React.useState<WineSegment | ''>(isSegment(initial.segment) ? initial.segment : '')
  const [search, setSearch] = React.useState(initial.search)
  const [sort, setSort] = React.useState<SortKey>('featured')
  const deferredSearch = React.useDeferredValue(search)

  // Mirror filters into the URL so filtered views can be shared.
  React.useEffect(() => {
    const params = new URLSearchParams()
    if (brand) params.set('thuong-hieu', brand)
    if (type) params.set('loai', type)
    if (country) params.set('quoc-gia', country)
    if (segment) params.set('nhu-cau', segment)
    if (deferredSearch.trim()) params.set('q', deferredSearch.trim())
    const qs = params.toString()
    const next = qs ? `${pathname}?${qs}` : pathname
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', next)
    }
  }, [brand, type, country, segment, deferredSearch, pathname])

  const results = React.useMemo(() => {
    const list = filterWines(wines, {
      brand: brand || undefined,
      type: type || undefined,
      country: country || undefined,
      segment: segment || undefined,
      search: deferredSearch,
    })
    if (sort === 'name') return [...list].sort((a, b) => a.producer.localeCompare(b.producer, 'vi'))
    if (sort === 'vintage') return [...list].sort((a, b) => vintageValue(b) - vintageValue(a))
    return [...list].sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
  }, [wines, brand, type, country, segment, deferredSearch, sort])

  const facets = React.useMemo(
    () => ({
      brand: brands.map((b) => ({ value: b.slug, label: b.name, count: wines.filter((w) => w.brand === b.slug).length })),
      type: wineTypes.map((t) => ({ value: t.value, label: t.label, count: wines.filter((w) => w.type === t.value).length })),
      country: countries.map((c) => ({ value: c, label: c, count: wines.filter((w) => w.country === c).length })),
      segment: wineSegments.map((s) => ({ value: s.value, label: s.label, count: wines.filter((w) => w.segments.includes(s.value)).length })),
    }),
    [wines, brands, countries],
  )

  const chips = [
    brand && { label: brands.find((b) => b.slug === brand)?.name ?? brand, clear: () => setBrand('') },
    type && { label: wineTypes.find((t) => t.value === type)?.label ?? type, clear: () => setType('') },
    country && { label: country, clear: () => setCountry('') },
    segment && { label: wineSegments.find((s) => s.value === segment)?.label ?? segment, clear: () => setSegment('') },
    deferredSearch.trim() && { label: `“${deferredSearch.trim()}”`, clear: () => setSearch('') },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  const reset = () => {
    setBrand('')
    setType('')
    setCountry('')
    setSegment('')
    setSearch('')
  }

  const panel = (scope: string) => (
    <FilterPanel
      scope={scope}
      search={search}
      onSearch={setSearch}
      groups={[
        { title: 'Thương hiệu', name: 'brand', value: brand, options: facets.brand, onChange: setBrand },
        { title: 'Loại vang', name: 'type', value: type, options: facets.type, onChange: (v) => setType(v as WineType | '') },
        { title: 'Xuất xứ', name: 'country', value: country, options: facets.country, onChange: setCountry },
        { title: 'Nhu cầu sử dụng', name: 'segment', value: segment, options: facets.segment, onChange: (v) => setSegment(v as WineSegment | '') },
      ]}
    />
  )

  return (
    <section className="bg-paper pb-12 pt-6 md:pb-16 md:pt-8">
      <div className="container-site grid gap-8 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]">
        <aside aria-label="Bộ lọc sản phẩm" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+16px)] space-y-4">
            {panel('aside')}
            <div className="rounded-card bg-wine p-5 text-ivory">
              <p className="font-bold">Cần báo giá số lượng lớn?</p>
              <p className="mt-1.5 text-sm text-ivory/75">Gọi bộ phận kinh doanh hoặc gửi danh sách sản phẩm quan tâm.</p>
              <a href={siteConfig.contact.phoneHref} className="mt-3 block text-lg font-bold text-gold">
                {siteConfig.contact.phone}
              </a>
              <Button asChild size="sm" className="mt-3 w-full">
                <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-ivory px-3 py-2.5 sm:px-4">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal /> Bộ lọc{chips.length > 0 && ` (${chips.length})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88%] gap-0 overflow-y-auto bg-paper p-0 sm:max-w-sm">
                  <SheetTitle className="border-b border-line px-4 py-4 text-base font-bold">Bộ lọc sản phẩm</SheetTitle>
                  <div className="p-4">{panel('sheet')}</div>
                </SheetContent>
              </Sheet>
              <p aria-live="polite" className="text-sm text-stone">
                <span className="font-semibold text-ink">{results.length}</span> sản phẩm
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-stone">
              <span className="hidden sm:inline">Sắp xếp:</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Sắp xếp"
                  className="h-9 appearance-none rounded-xs border border-line-strong bg-paper pl-3 pr-9 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-1.5 -translate-y-3/4 rotate-45 border-b border-r border-ink" />
              </span>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  className="inline-flex items-center gap-1.5 rounded-full bg-wine-soft px-3 py-1 text-sm text-wine transition-colors hover:bg-wine hover:text-ivory"
                >
                  {c.label} <X className="size-3.5" aria-label="Bỏ lọc" />
                </button>
              ))}
              <button type="button" onClick={reset} className="text-sm font-medium text-stone underline underline-offset-4 hover:text-ink">
                Xóa tất cả
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {results.map((wine) => (
                <ProductCard key={wine.slug} wine={wine} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md py-20 text-center">
              <FileText className="mx-auto size-10 text-line-strong" strokeWidth={1.4} />
              <p className="mt-4 text-lg font-bold text-ink">Chưa có sản phẩm phù hợp.</p>
              <p className="mt-2 text-stone">
                Hãy thử bỏ bớt bộ lọc, hoặc gửi yêu cầu để chúng tôi tìm sản phẩm theo nhu cầu của bạn.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="outline" onClick={reset}>
                  Xem tất cả sản phẩm
                </Button>
                <Button asChild>
                  <Link href={ctaLinks.quote}>Yêu cầu báo giá</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

type FilterGroup = {
  title: string
  name: string
  value: string
  options: Option[]
  onChange: (value: string) => void
}

function FilterPanel({
  scope,
  search,
  onSearch,
  groups,
}: {
  scope: string
  search: string
  onSearch: (v: string) => void
  groups: FilterGroup[]
}) {
  return (
    <div className="overflow-hidden rounded-card border border-line">
      <div className="border-b border-line bg-ivory p-4">
        <label className="relative block">
          <span className="sr-only">Tìm trong danh mục</span>
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Tên sản phẩm, thương hiệu…"
            className="h-10 w-full rounded-xs border border-line-strong bg-paper pl-9 pr-3 text-sm outline-none placeholder:text-stone-light focus-visible:border-wine"
          />
        </label>
      </div>
      {groups.map((g) => (
        <fieldset key={g.name} className="border-b border-line p-4 last:border-b-0">
          <legend className="float-left mb-2 w-full text-sm font-bold uppercase tracking-[0.06em] text-wine">{g.title}</legend>
          <ul className="clear-both space-y-0.5">
            {[{ value: '', label: 'Tất cả', count: -1 }, ...g.options].map((o) => {
              const checked = g.value === o.value
              return (
                <li key={o.value || 'all'}>
                  <label
                    className={cn(
                      'flex cursor-pointer items-center gap-2.5 rounded-xs px-2 py-1.5 text-[0.9375rem] transition-colors -mx-2',
                      checked ? 'bg-gold-soft font-semibold text-ink' : 'text-ink-soft hover:bg-ivory',
                    )}
                  >
                    <input
                      type="radio"
                      name={`${scope}-${g.name}`}
                      value={o.value}
                      checked={checked}
                      onChange={() => g.onChange(o.value)}
                      className="size-4 accent-[var(--color-wine)]"
                    />
                    <span className="flex-1">{o.label}</span>
                    {o.count >= 0 && <span className="text-xs text-stone-light">{o.count}</span>}
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  )
}

const vintageValue = (w: IWine) => (w.vintage === 'NV' ? 0 : w.vintage)
