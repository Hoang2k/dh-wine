import HomeHero from '@/components/Home/HomeHero'
import BannerSlider, { BannerSlide } from '@/components/Home/BannerSlider'
import { HomeDealer, HomeProcess } from '@/components/Home/HomeSections'
import HomeBrands from '@/components/Home/HomeBrands'
import HomeJournal from '@/components/Home/HomeJournal'
import ProductTabs, { ProductTab } from '@/components/Home/ProductTabs'
import QuoteSection from '@/components/site/QuoteSection'
import StructuredData from '@/components/StructuredData'
import { brands } from '@/data/brands'
import { wineTypes } from '@/data/wines'
import { getListPosts } from '@/services/news'
import { getWines } from '@/services/wine'
import { images } from '@/lib/images'
import { IPost } from '@/types/post'

// Render động mỗi request để luôn lấy data backend lúc chạy (backend không reachable
// lúc `next build` trong container). Có thể đổi lại `revalidate = 60` khi có cache ổn định.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let listPosts: IPost[] = [];
  try {
    listPosts = await getListPosts({ per_page: 3 });
  } catch {
    // Error already logged in service layer
  }
  const all = await getWines()
  const featuredFirst = [...all].sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))

  const slides: BannerSlide[] = [
    {
      href: `/san-pham?thuong-hieu=glenfiddich`,
      image: images.bannerVangDgold,
      imageAlt: "D'Gold, tinh hoa vang Đà Lạt, bộ sưu tập cao cấp",
      eyebrow: "D'Gold",
      title: 'Tinh hoa vang Đà Lạt',
      cta: 'Khám phá',
      position: 'center 35%',
    },
    {
      href: '/san-pham',
      image: images.bannerRum,
      imageAlt: 'Rum Nha Trang, đẳng cấp vị rum, trọn vẹn hương trái cây',
      eyebrow: 'Rum Nha Trang',
      title: 'Tinh hoa Nha Trang',
      cta: 'Khám phá',
    },
  ]

  const typeTabs: ProductTab[] = [
    { key: 'all', label: 'Tất cả', href: '/san-pham', wines: featuredFirst },
    ...wineTypes.map((t) => ({
      key: t.value,
      label: t.label,
      href: `/san-pham?loai=${t.value}`,
      wines: all.filter((w) => w.type === t.value),
    })),
  ]

  // The four promises that used to sit under the hero; they now stand beside the quote form.
  const promises = [
    { title: 'Nhập khẩu chính ngạch', text: 'Đầy đủ chứng từ, tem nhãn phụ' },
    { title: 'Hóa đơn VAT', text: 'Xuất hóa đơn cho mọi đơn hàng' },
    { title: 'Tư vấn sommelier', text: 'Đồng hành xây dựng wine list' },
    { title: 'Mẫu thử cho đối tác', text: 'Thử vang trước khi đặt hàng' },
  ]

  return (
    <>
      <StructuredData type="website" data={{}} />
      <HomeHero wines={featuredFirst} total={all.length} />
      <section aria-label="Nhãn đang giới thiệu" className="bg-washi pb-24 md:pb-32">
        <BannerSlider slides={slides} />
      </section>
      <ProductTabs id="danh-muc" title="Chọn theo dòng vang" subtitle="Những nhãn được nhà hàng và đại lý tin dùng." tabs={typeTabs} />
      <HomeProcess />
      <HomeDealer />
      <HomeBrands brands={brands} />
      <HomeJournal posts={listPosts} />
      <QuoteSection facts={promises} />
    </>
  )
}
