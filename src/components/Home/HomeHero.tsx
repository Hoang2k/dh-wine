import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AddToQuoteButton from '@/components/site/AddToQuoteButton'
import { ctaLinks } from '@/config/site'
import { wineTypeLabel } from '@/data/wines'
import { IWine } from '@/types/wine'

/**
 * Index hero: the head on the left, the wine list itself as the visual.
 * Set like a restaurant list, name, origin, vintage and case size in columns, a quote action per row.
 */
export default function HomeHero({ wines, total }: { wines: IWine[]; total: number }) {
  const rows = wines.slice(0, 5)

  return (
    <section aria-labelledby="home-title" className="bg-washi">
      <div className="container-site grid gap-12 py-14 md:py-20 lg:min-h-[calc(100svh-var(--header-h)-2.25rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:py-12">
        <div className="min-w-0">
          <h1 id="home-title" className="heading-display text-display-xl max-w-[12ch] text-ink">
            Rượu vang nhập khẩu cho nhà hàng
          </h1>
          <p className="mt-6 max-w-[36ch] text-lead text-ink-soft">
            Chọn nhãn, gửi danh sách, nhận giá sỉ trong 24 giờ.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/san-pham">Xem toàn bộ danh mục</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={ctaLinks.quote}>Gửi yêu cầu báo giá</Link>
            </Button>
          </div>
        </div>

        {rows.length > 0 && (
          <div className="min-w-0">
            <table className="w-full border-collapse text-left">
              <caption className="label pb-4 text-left text-stone">
                Trích danh mục, {total} nhãn đang phân phối
              </caption>
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-ink">
                  <th scope="col" className="label whitespace-nowrap pb-3 pr-4 font-medium text-ink">Tên vang</th>
                  <th scope="col" className="label whitespace-nowrap pb-3 pr-4 font-medium text-ink">Xuất xứ</th>
                  <th scope="col" className="label whitespace-nowrap pb-3 pr-4 font-medium text-ink">Niên vụ</th>
                  <th scope="col" className="label whitespace-nowrap pb-3 pr-4 font-medium text-ink">Quy cách</th>
                  <th scope="col" className="pb-3"><span className="sr-only">Báo giá</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((w) => (
                  <tr key={w.slug} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-4 md:table-row md:py-0">
                    <th scope="row" className="min-w-0 text-left font-normal md:w-[42%] md:py-3.5 md:pr-4">
                      <Link href={`/san-pham/${w.slug}`} className="line-clamp-2 font-display text-[1.25rem] leading-tight text-ink transition-colors hover:text-gold-deep">
                        {w.name}
                      </Link>
                      <span className="mt-0.5 block text-sm text-stone">{wineTypeLabel(w.type)}</span>
                    </th>
                    <td className="col-start-1 text-sm text-ink-soft md:py-3.5 md:pr-4">
                      {w.region ? `${w.region}, ${w.country}` : w.country}
                    </td>
                    <td className="num hidden text-sm text-ink-soft md:table-cell md:py-3.5 md:pr-4">
                      {w.vintage === 'NV' ? 'NV' : w.vintage}
                    </td>
                    <td className="num hidden whitespace-nowrap text-sm text-ink-soft md:table-cell md:py-3.5 md:pr-4">
                      {w.caseSize}&nbsp;chai/thùng
                    </td>
                    <td className="col-start-2 row-span-2 row-start-1 text-right md:py-3.5">
                      <AddToQuoteButton slug={w.slug} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/san-pham" className="link-underline mt-5 inline-block text-[0.9375rem] font-semibold text-gold-deep">
              Xem đủ {total} nhãn
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
