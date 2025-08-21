import PostList from '@/components/PostList'
import UserList from '@/components/UserList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Zap, Database, RefreshCw, Settings, Eye, Timer } from 'lucide-react'

export async function generateStaticParams() {
  return []
}

export default async function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8539D9] to-[#7028C8] bg-clip-text text-transparent">
            NTLSVX
            TEST Gitlab CI/CD
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Test hiển thị NTLSVX
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            JSONPlaceholder API
          </Badge>
          <Badge variant="outline">No Auth Required</Badge>
        </div>
      </div>

      <Separator />
      
      {/* Posts Section */}
      <section>
        <PostList />
      </section>
      
      <Separator />
      
      {/* Users Section */}
      <section>
        <UserList />
      </section>
      
      <Separator />
      
      {/* Features Info */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-[#8539D9]" />
            Tính năng TanStack Query được demo
          </CardTitle>
          <CardDescription className="text-base">
            Các tính năng mạnh mẽ được tích hợp trong ứng dụng này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Tính năng cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Tự động cache dữ liệu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Loading states</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Error handling</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Manual refetch</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  Tính năng nâng cao
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-3 w-3 text-muted-foreground" />
                  <span>Background updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings className="h-3 w-3 text-muted-foreground" />
                  <span>Enable/disable queries</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="h-3 w-3 text-muted-foreground" />
                  <span>Auto refetch interval</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Database className="h-3 w-3 text-muted-foreground" />
                  <span>Stale time configuration</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6 border-[#8539D9] bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="flex items-center gap-3 p-4">
              <Eye className="h-8 w-8 text-[#8539D9]" />
              <div>
                <p className="font-semibold text-[#8539D9]">💡 Pro Tip</p>
                <p className="text-sm text-muted-foreground">
                  Mở DevTools (F12) và tìm tab <strong>'TanStack Query'</strong> để xem chi tiết cache và queries!
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
