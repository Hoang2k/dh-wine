import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BadgeCheck, ChevronRight, FlaskConical, ReceiptText, Thermometer, Truck, Wine } from 'lucide-react'
import ProductCard from '@/components/site/ProductCard'
import QuotePanel from '@/components/Products/QuotePanel'
import CtaBand from '@/components/site/CtaBand'
import StructuredData from '@/components/StructuredData'
import WineBottle from '@/components/site/WineBottle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ctaLinks } from '@/config/site'
import { wineBadges, wineSegments, wineTypeLabel } from '@/data/wines'
import { getAllWineSlugs, getRelatedWines, getWineBySlug } from '@/services/wine'

type ProductPageProps = { params: Promise<{ slug: string }> }

// Cho phép render on-demand (ISR) với slug chưa prebuild — cần cho deploy container
// vì backend không reachable lúc `next build`.
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getAllWineSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const wine = await getWineBySlug((await params).slug)
  if (!wine) return { title: 'Không tìm thấy sản phẩm' }
  const title = `${wine.producer} ${wine.name}${wine.vintage !== 'NV' ? ` ${wine.vintage}` : ''}`
  return {
    title,
    description: wine.summary,
    alternates: { canonical: `/san-pham/${wine.slug}` },
    openGraph: { title, description: wine.summary, type: 'website' },
  }
}

const commitments = [
  { icon: BadgeCheck, title: 'Nhập khẩu chính ngạch', text: 'Chứng từ nhập khẩu, tem nhãn phụ tiếng Việt' },
  { icon: ReceiptText, title: 'Hóa đơn VAT đầy đủ', text: 'Hỗ trợ hồ sơ chi phí doanh nghiệp' },
  { icon: FlaskConical, title: 'Mẫu thử cho đối tác', text: 'Thử vang trước khi đặt hàng' },
  { icon: Truck, title: 'Giao hàng tận nơi', text: 'Vận chuyển bằng xe chuyên dụng' },
]

const tabTrigger =
  'h-auto flex-none rounded-none border-0 border-b-2 border-transparent px-0 py-4 mr-8 text-base font-medium text-stone shadow-none transition-colors hover:text-ink data-[state=active]:border-gold-deep data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none'

export default async function ProductPage({ params }: ProductPageProps) {
  const wine = await getWineBySlug((await params).slug)
  if (!wine) notFound()
  const related = await getRelatedWines(wine, 5)

  const specs = [
    { label: 'Loại vang', value: wineTypeLabel(wine.type) },
    { label: 'Nhà sản xuất', value: wine.producer },
    { label: 'Xuất xứ', value: `${wine.region}, ${wine.country}` },
    { label: 'Giống nho', value: wine.grapes.join(', ') },
    { label: 'Niên vụ', value: wine.vintage === 'NV' ? 'Không niên vụ (NV)' : String(wine.vintage) },
    { label: 'Nồng độ', value: `${wine.abv}% ABV` },
    { label: 'Dung tích', value: `${wine.volumeMl} ml` },
    { label: 'Quy cách', value: `${wine.caseSize} chai / thùng` },
    { label: 'Nhiệt độ phục vụ', value: wine.servingTemp },
    { label: 'Phân khúc', value: wine.tier },
  ]

  return (
    <>
      <StructuredData type="product" data={{ ...wine, category: wineTypeLabel(wine.type) }} />

      <div className="bg-washi">
        <nav aria-label="Breadcrumb" className="container-site pt-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone">
            <li><Link href="/" className="hover:text-ink">Trang chủ</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight aria-hidden className="size-3.5" /><Link href="/san-pham" className="hover:text-ink">Sản phẩm</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight aria-hidden className="size-3.5" /><Link href={`/san-pham?loai=${wine.type}`} className="hover:text-ink">{wineTypeLabel(wine.type)}</Link></li>
            <li className="flex min-w-0 items-center gap-1.5"><ChevronRight aria-hidden className="size-3.5" /><span aria-current="page" className="line-clamp-1 text-ink">{wine.name}</span></li>
          </ol>
        </nav>
      </div>

      {/* Offer: the bottle, then what a buyer needs at the moment of asking for a price */}
      <section className="bg-washi pb-24 pt-10 md:pb-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-card bg-ivory lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              {wine.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-deep px-3 py-1 text-sm font-medium text-paper">
                  {wineBadges[wine.badge]}
                </span>
              )}
              {wine.image ? (
                <Image src={wine.image} alt={wine.name} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain p-12 mix-blend-multiply" />
              ) : (
                <div className="relative h-[80%]">
                  <WineBottle id={`pdp-${wine.slug}`} type={wine.type} shape={wine.bottle} producer={wine.producer} vintage={wine.vintage} />
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <h1 className="heading-display text-display-md max-w-[18ch] text-ink">{wine.name}</h1>
            <p className="mt-4 text-stone">
              {wineTypeLabel(wine.type)}, {wine.region ? `${wine.region}, ` : ''}{wine.country}
            </p>
            <p className="mt-6 max-w-[52ch] text-lead text-ink-soft">{wine.summary}</p>

            <div className="mt-8 border-y border-line py-5">
              <p className="font-display text-display-sm text-ink">Liên hệ báo giá</p>
              <p className="mt-1 text-sm text-stone">Giá sỉ theo sản lượng; chiết khấu và công nợ được báo riêng.</p>
            </div>

            <div className="mt-8">
              <QuotePanel wine={wine} />
            </div>

            <table className="mt-12 w-full text-left">
              <caption className="sr-only">Thông số sản phẩm</caption>
              <tbody>
                {specs.slice(0, 7).map((s) => (
                  <tr key={s.label} className="border-b border-line">
                    <th scope="row" className="w-40 py-3 pr-4 text-sm font-normal text-stone">{s.label}</th>
                    <td className="py-3 text-ink">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {commitments.map(({ icon: Icon, title: t, text }) => (
                <li key={t} className="flex gap-3">
                  <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.6} />
                  <span>
                    <span className="block font-medium text-ink">{t}</span>
                    <span className="mt-0.5 block text-sm text-stone">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-ink-soft">
              Phân phối lại sản phẩm này?{' '}
              <Link href={ctaLinks.dealer} className="link-underline font-semibold text-gold-deep">
                Đăng ký làm đại lý
              </Link>
            </p>
          </div>
        </div>

        {/* Detail tabs */}
        <div className="container-site mt-20 md:mt-28">
          <Tabs defaultValue="mo-ta" className="gap-0">
            <TabsList className="scrollbar-hide h-auto w-full justify-start overflow-x-auto rounded-none border-b border-line bg-transparent p-0">
              <TabsTrigger value="mo-ta" className={tabTrigger}>Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="ghi-chu" className={tabTrigger}>Ghi chú nếm</TabsTrigger>
              <TabsTrigger value="thong-so" className={tabTrigger}>Thông số</TabsTrigger>
            </TabsList>

            <TabsContent value="mo-ta" forceMount className="py-10 data-[state=inactive]:hidden">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft lg:col-span-7">{wine.description}</p>
                <div className="lg:col-span-4 lg:col-start-9">
                  <h2 className="font-display text-display-sm text-ink">Gợi ý kết hợp món</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {wine.pairing.map((p) => (
                      <li key={p} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-8 font-display text-display-sm text-ink">Phù hợp cho</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-sm text-ink">
                      <Thermometer aria-hidden className="size-3.5 text-gold-deep" /> Phục vụ {wine.servingTemp}
                    </li>
                    {wine.segments.map((seg) => (
                      <li key={seg} className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 text-sm text-ink">
                        <Wine aria-hidden className="size-3.5 text-gold-deep" /> {wineSegments.find((s) => s.value === seg)?.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ghi-chu" forceMount className="py-10 data-[state=inactive]:hidden">
              <dl className="grid gap-x-8 gap-y-10 md:grid-cols-3">
                {[
                  { label: 'Hương', value: wine.tasting.nose },
                  { label: 'Vị', value: wine.tasting.palate },
                  { label: 'Hậu vị', value: wine.tasting.finish },
                ].map((t) => (
                  <div key={t.label} className="border-t border-ink pt-5">
                    <dt className="font-display text-display-sm text-ink">{t.label}</dt>
                    <dd className="mt-3 text-ink-soft">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>

            <TabsContent value="thong-so" forceMount className="py-10 data-[state=inactive]:hidden">
              <table className="w-full max-w-3xl text-left">
                <caption className="sr-only">Thông số chi tiết</caption>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label} className="border-b border-line">
                      <th scope="row" className="w-52 py-3.5 pr-4 text-sm font-normal text-stone">{s.label}</th>
                      <td className="py-3.5 text-ink">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y border-t border-line bg-washi">
          <div className="container-site">
            <h2 id="related-title" className="heading-display text-display-md text-ink">
              Sản phẩm tương tự
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {related.slice(0, 4).map((w) => (
                <ProductCard key={w.slug} wine={w} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
