'use client'

import { useQuery } from '@tanstack/react-query'
import { getListUsers } from '@/services/user'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, AlertCircle, Power, PowerOff, Mail, Phone, Globe, Building } from 'lucide-react'

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
}

export default function UserList() {
  const [enabled, setEnabled] = useState(true)
  
  const { 
    data: users, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useQuery<any>({
    queryKey: ['users'],
    queryFn: getListUsers,
    enabled, // Có thể bật/tắt query
    staleTime: 5 * 60 * 1000, // 5 phút
    refetchInterval: 30 * 1000, // Tự động refetch mỗi 30 giây
  })

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Danh sách người dùng</h2>
          <p className="text-muted-foreground">
            {enabled ? `${users?.users?.length || 0} người dùng được tìm thấy` : 'Query đã bị tắt'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setEnabled(!enabled)}
            variant={enabled ? "destructive" : "default"}
            size="sm"
          >
            {enabled ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                Tắt Query
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                Bật Query
              </>
            )}
          </Button>
          <Button 
            onClick={() => refetch()}
            disabled={!enabled}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Đang tải...' : 'Làm mới'}
          </Button>
        </div>
      </div>

      {!enabled && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <PowerOff className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <CardTitle className="text-yellow-800 mb-2">Query đã bị tắt</CardTitle>
              <CardDescription className="text-yellow-700">
                Bấm 'Bật Query' để tải dữ liệu người dùng.
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      )}
      
      {enabled && isLoading && <LoadingSkeleton />}

      {enabled && error && (
        <Card className="border-destructive">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <CardTitle className="text-destructive mb-2">Có lỗi xảy ra</CardTitle>
            <CardDescription className="text-center mb-4">
              Không thể tải danh sách người dùng. Vui lòng thử lại.
            </CardDescription>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </CardContent>
        </Card>
      )}

      {enabled && users?.users && (
        <div className="grid gap-4 md:grid-cols-2">
          {users.users.slice(0, 6).map((user: any) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                  </div>
                  <Badge variant="secondary">#{user.id}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.website}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.company.name}</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {enabled && users?.users?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CardTitle className="text-muted-foreground mb-2">Không có người dùng</CardTitle>
            <CardDescription>
              Hiện tại chưa có người dùng nào để hiển thị.
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {enabled && isFetching && !isLoading && (
        <div className="flex items-center justify-center p-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Đang cập nhật dữ liệu trong background...
          </Badge>
        </div>
      )}
    </div>
  )
} 