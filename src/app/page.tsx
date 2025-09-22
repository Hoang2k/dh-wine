import PostList from '@/components/PostList'
import UserList from '@/components/UserList'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Zap, Database, RefreshCw, Settings, Eye, Timer } from 'lucide-react'
import HeroMemorial from '@/components/Home/HeroMemorial'
import FeatureSection from '@/components/Home/FeatureSection'
import NewsSection from '@/components/Home/NewsSection'
import StatisticActivitieSection from '@/components/Home/StatisticAtivitieSection'
import ContactSection from '@/components/Home/ContactSection'

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  return []
}

export default async function HomePage() {
  return (
    <div className="space-y-8 bg-[#fbfbfb]">
      <HeroMemorial />
      <FeatureSection />
      <NewsSection />
      <StatisticActivitieSection />
      <ContactSection />
    </div>
  )
}
