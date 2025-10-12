import HeroMemorial from '@/components/Home/HeroMemorial'
import FeatureSection from '@/components/Home/FeatureSection'
import NewsSection from '@/components/Home/NewsSection'
import StatisticActivitieSection from '@/components/Home/StatisticAtivitieSection'
import ContactSection from '@/components/Home/ContactSection'
import { getListPosts } from '@/services/news'
import { IPost } from '@/types/post'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  return []
}

export default async function HomePage() {

  let listPosts: IPost[] = [];
  try {
    listPosts = await getListPosts();
  } catch (error) {
    // Error already logged in service layer, no need to log again
  }

  return (
    <div className="space-y-8 bg-[#fbfbfb]">
      <HeroMemorial />
      <FeatureSection />
      <NewsSection listPosts={listPosts || []} />
      <StatisticActivitieSection />
      <ContactSection />
    </div>
  )
}
