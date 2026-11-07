import type { Metadata } from 'next'
import PageHero from '@/components/site/PageHero'
import CtaBand from '@/components/site/CtaBand'
import CatalogClient from '@/components/Products/CatalogClient'
import { brands } from '@/data/brands'
import { getWineCountries, getWines } from '@/services/wine'

export const metadata: Metadata = {
  title: 'Danh mục sản phẩm',
  description:
    'Danh mục sản phẩm nhập khẩu theo thương hiệu dành cho nhà hàng, khách sạn, nhà bán lẻ và quà tặng doanh nghiệp tại Khánh Hòa.',
  alternates: { canonical: '/san-pham' },
}

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const pick = (key: string) => (typeof params[key] === 'string' ? (params[key] as string) : '')
  const all = await getWines()

  return (
    <>
      <PageHero
        eyebrow="Danh mục sản phẩm"
        title="Bộ sưu tập sản phẩm"
        description="Tuyển chọn theo thương hiệu cho nhà hàng, kệ hàng bán lẻ và hộp quà doanh nghiệp. Giá sỉ được báo riêng theo sản lượng."
        breadcrumbs={[{ label: 'Sản phẩm' }]}
      />
      <CatalogClient
        // Remount when the header search or a menu link changes the query
        key={JSON.stringify(params)}
        wines={all}
        brands={brands}
        countries={getWineCountries()}
        initial={{ brand: pick('thuong-hieu'), type: pick('loai'), country: pick('quoc-gia'), segment: pick('nhu-cau'), search: pick('q') }}
      />
      <CtaBand
        eyebrow="Chưa tìm thấy nhãn phù hợp?"
        title={
          <>
            Nhận <em className="text-gold">catalogue đầy đủ</em> kèm bảng giá sỉ.
          </>
        }
        description="Gửi nhu cầu của bạn, bộ phận kinh doanh sẽ gửi catalogue kèm bảng giá sỉ và đề xuất danh mục phù hợp."
      />
    </>
  )
}
