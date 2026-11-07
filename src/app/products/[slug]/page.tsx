import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BadgeCheck, ChevronRight, FlaskConical, Handshake, ReceiptText, Thermometer, Truck, Wine } from 'lucide-react'
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

export const dynamicParams = false

export function generateStaticParams() {
  return getAllWineSlugs().map((slug) => ({ slug }))
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
  'h-auto flex-none rounded-none border-0 border-b-2 border-transparent px-4 py-3 text-[0.9375rem] font-semibold text-stone shadow-none data-[state=active]:border-wine data-[state=active]:bg-transparent data-[state=active]:text-wine data-[state=active]:shadow-none'

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

      <div className="border-b border-line bg-ivory">
        <nav aria-label="Breadcrumb" className="container-site py-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-stone">
            <li><Link href="/" className="hover:text-wine">Trang chủ</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight className="size-3" /><Link href="/san-pham" className="hover:text-wine">Sản phẩm</Link></li>
            <li className="flex items-center gap-1.5"><ChevronRight className="size-3" /><Link href={`/san-pham?loai=${wine.type}`} className="hover:text-wine">{wineTypeLabel(wine.type)}</Link></li>
            <li className="flex min-w-0 items-center gap-1.5"><ChevronRight className="size-3" /><span aria-current="page" className="line-clamp-1 text-ink">{wine.name}</span></li>
          </ol>
        </nav>
      </div>

      <section className="bg-paper py-6 md:py-10">
        <div className="container-site grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-card border border-line bg-ivory pt-10 lg:sticky lg:top-[calc(var(--header-h)+16px)]">
              {wine.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-xs bg-wine px-2.5 py-1 text-xs font-semibold text-ivory">
                  {wineBadges[wine.badge]}
                </span>
              )}
              <span className="absolute right-4 top-4 z-10 rounded-xs bg-paper px-2.5 py-1 text-xs font-medium text-stone">{wine.country}</span>
              {wine.image ? (
                <Image src={wine.image} alt={wine.name} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-10" />
              ) : (
                <div className="relative h-[86%] pb-8">
                  <WineBottle id={`pdp-${wine.slug}`} type={wine.type} shape={wine.bottle} producer={wine.producer} vintage={wine.vintage} />
                </div>
              )}
            </div>
          </div>

          {/* Summary + quote */}
          <div className="min-w-0 lg:col-span-4">
            <p className="text-sm font-medium text-wine">
              {wineTypeLabel(wine.type)} · {wine.region}, {wine.country}
            </p>
            <h1 className="heading-display mt-2 text-display-sm text-ink md:text-[1.75rem]">{wine.name}</h1>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{wine.summary}</p>

            <div className="mt-5 rounded-card border border-gold/60 bg-gold-soft/50 p-4">
              <p className="text-sm text-stone">Giá sỉ B2B</p>
              <p className="mt-0.5 text-xl font-bold text-wine">Liên hệ báo giá</p>
              <p className="mt-1 text-xs text-stone">Giá theo sản lượng, chính sách chiết khấu và công nợ được báo riêng.</p>
            </div>

            <table className="mt-5 w-full text-sm">
              <caption className="sr-only">Thông số sản phẩm</caption>
              <tbody>
                {specs.slice(0, 7).map((s) => (
                  <tr key={s.label} className="border-b border-dashed border-line">
                    <th scope="row" className="w-36 py-2 pr-3 text-left font-normal text-stone">{s.label}</th>
                    <td className="py-2 font-medium text-ink">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5">
              <QuotePanel wine={wine} />
            </div>
          </div>

          {/* Commitments */}
          <aside className="space-y-4 lg:col-span-3">
            <div className="rounded-card border border-line">
              <p className="border-b border-line bg-ivory px-4 py-3 text-sm font-bold uppercase tracking-[0.06em] text-wine">
                Cam kết với đối tác
              </p>
              <ul className="divide-y divide-line">
                {commitments.map(({ icon: Icon, title: t, text }) => (
                  <li key={t} className="flex gap-3 px-4 py-3">
                    <Icon className="mt-0.5 size-5 shrink-0 text-wine" />
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold text-ink">{t}</span>
                      <span className="mt-0.5 block text-xs text-stone">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={ctaLinks.dealer} className="group block rounded-card bg-ink p-5 text-ivory">
              <Handshake className="size-6 text-gold" />
              <p className="mt-3 font-bold">Trở thành đại lý</p>
              <p className="mt-1 text-sm text-ivory/70">Giá đại lý, thưởng doanh số và hỗ trợ marketing cho đối tác phân phối.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                Đăng ký ngay <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </aside>
        </div>

        {/* Detail tabs */}
        <div className="container-site mt-10 md:mt-14">
          <Tabs defaultValue="mo-ta" className="gap-0">
            <TabsList className="scrollbar-hide h-auto w-full justify-start overflow-x-auto rounded-none border-b border-line bg-transparent p-0">
              <TabsTrigger value="mo-ta" className={tabTrigger}>Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="ghi-chu" className={tabTrigger}>Ghi chú nếm</TabsTrigger>
              <TabsTrigger value="thong-so" className={tabTrigger}>Thông số</TabsTrigger>
            </TabsList>

            <TabsContent value="mo-ta" forceMount className="py-6 data-[state=inactive]:hidden">
              <div className="grid gap-8 lg:grid-cols-3">
                <p className="max-w-3xl leading-relaxed text-ink-soft lg:col-span-2">{wine.description}</p>
                <div className="rounded-card bg-ivory p-5">
                  <h2 className="text-sm font-bold uppercase tracking-[0.06em] text-wine">Gợi ý kết hợp món</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {wine.pairing.map((p) => (
                      <li key={p} className="rounded-full border border-line-strong bg-paper px-3 py-1 text-sm text-ink">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-5 text-sm font-bold uppercase tracking-[0.06em] text-wine">Phù hợp cho</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-sm text-ink">
                      <Thermometer className="size-3.5 text-wine" /> Phục vụ {wine.servingTemp}
                    </li>
                    {wine.segments.map((seg) => (
                      <li key={seg} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-sm text-ink">
                        <Wine className="size-3.5 text-wine" /> {wineSegments.find((s) => s.value === seg)?.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ghi-chu" forceMount className="py-6 data-[state=inactive]:hidden">
              <dl className="grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Hương', value: wine.tasting.nose },
                  { label: 'Vị', value: wine.tasting.palate },
                  { label: 'Hậu vị', value: wine.tasting.finish },
                ].map((t) => (
                  <div key={t.label} className="rounded-card border border-line p-5">
                    <dt className="font-bold text-wine">{t.label}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>

            <TabsContent value="thong-so" forceMount className="py-6 data-[state=inactive]:hidden">
              <table className="w-full max-w-2xl overflow-hidden rounded-card text-sm">
                <caption className="sr-only">Thông số chi tiết</caption>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label} className="odd:bg-ivory">
                      <th scope="row" className="w-48 px-4 py-2.5 text-left font-normal text-stone">{s.label}</th>
                      <td className="px-4 py-2.5 font-medium text-ink">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-10 md:py-14">
          <div className="container-site">
            <div className="border-b-2 border-line">
              <h2 className="relative inline-block pb-3 text-display-sm font-bold uppercase tracking-tight text-ink after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-wine">
                Sản phẩm tương tự
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {related.map((w, i) => (
                <ProductCard key={w.slug} wine={w} className={i === 4 ? 'hidden xl:flex' : undefined} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
