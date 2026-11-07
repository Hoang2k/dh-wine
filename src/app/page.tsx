import HomeHero from '@/components/Home/HomeHero'
import {
  HomeAudiences,
  HomeCategories,
  HomeCorporateGifts,
  HomeDealer,
  HomeProcess,
} from '@/components/Home/HomeSections'
import HomeBrands from '@/components/Home/HomeBrands'
import HomeJournal from '@/components/Home/HomeJournal'
import ProductTabs, { ProductTab } from '@/components/Home/ProductTabs'
import QuoteSection from '@/components/site/QuoteSection'
import StructuredData from '@/components/StructuredData'
import { brands } from '@/data/brands'
import { wineTypes } from '@/data/wines'
import { getListPosts } from '@/services/news'
import { getWines } from '@/services/wine'
import { IPost } from '@/types/post'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  let listPosts: IPost[] = [];
  try {
    listPosts = await getListPosts({ per_page: 3 });
  } catch {
    // Error already logged in service layer
  }
  const all = await getWines()
  const featuredFirst = [...all].sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))

  const typeTabs: ProductTab[] = [
    { key: 'all', label: 'Tất cả', href: '/san-pham', wines: featuredFirst },
    ...wineTypes.map((t) => ({
      key: t.value,
      label: t.label,
      href: `/san-pham?loai=${t.value}`,
      wines: all.filter((w) => w.type === t.value),
    })),
  ]

  return (
    <>
      <StructuredData type="website" data={{}} />
      <HomeHero />
      <HomeCategories wines={all} />
      <ProductTabs id="home-featured" title="Sản phẩm xu hướng" subtitle="Những nhãn vang được đối tác tin chọn" tabs={typeTabs} />
      {/* <HomeAudiences /> */}
      {/* <HomeCorporateGifts wines={featuredFirst} /> */}
      <HomeDealer />
      <HomeBrands brands={brands} />
      <HomeProcess />
      <HomeJournal posts={listPosts} />
      <QuoteSection />
    </>
  )
}
