import PostList from '@/components/PostList'
import UserList from '@/components/UserList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Zap, Database, RefreshCw, Settings, Eye, Timer } from 'lucide-react'
import HeroMemorial from '@/components/Home/HeroMemorial'
import FeatureSection from '@/components/Home/FeatureSection'

export async function generateStaticParams() {
  return []
}

export default async function HomePage() {
  return (
    <div className="p-6 space-y-8 bg-[#fbfbfb]">
      <HeroMemorial />
      <FeatureSection />
    </div>
  )
}
