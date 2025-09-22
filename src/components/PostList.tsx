import { getListPosts } from '@/services/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Server-side data fetching function
async function getPostsData() {
  try {
    const posts = await getListPosts();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [] };
  }
}

// Server Component for SEO-optimized post listing
export default async function PostList() {
  const posts = await getPostsData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Danh sách bài viết</h2>
          <p className="text-muted-foreground">
            {posts?.posts?.length || 0} bài viết được tìm thấy
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.posts?.slice(0, 9).map((post: Post) => (
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
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/posts/${post.id}`}>
                    Xem thêm
                  </Link>
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
  );
} 