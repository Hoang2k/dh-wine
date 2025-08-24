'use client'

import { useQuery } from '@tanstack/react-query'
import { getListPosts } from '@/services/user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, AlertCircle } from 'lucide-react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function PostList() {
  const { 
    data: posts, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery<any>({
    queryKey: ['posts'],
    queryFn: getListPosts,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <CardTitle className="text-destructive mb-2">Có lỗi xảy ra</CardTitle>
          <CardDescription className="text-center mb-4">
            Không thể tải danh sách bài viết. Vui lòng thử lại.
          </CardDescription>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Thử lại
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
          <p className="text-muted-foreground">
            {posts?.posts?.length || 0} bài viết được tìm thấy
          </p>
        </div>
        <Button 
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          disabled={isFetching}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Đang tải...' : 'Làm mới'}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.posts?.slice(0, 9).map((post: any) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200 bg-yellow-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2 leading-tight">
                  {post.title}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0">
                  #{post.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 mb-4">
                {post.body}
              </CardDescription>
              <div className="flex justify-between items-center">
                <Badge variant="outline">
                  User {post.userId}
                </Badge>
                <Button variant="ghost" size="sm">
                  Xem thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts?.posts?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CardTitle className="text-muted-foreground mb-2">Không có bài viết</CardTitle>
            <CardDescription>
              Hiện tại chưa có bài viết nào để hiển thị.
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 