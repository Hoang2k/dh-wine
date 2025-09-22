import { getPostDetail } from '@/services/user';
import { Post } from '@/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Heart, HeartCrack } from 'lucide-react';

interface PostDetailProps {
  postId: string;
}

// Server-side data fetching function
async function getPostData(postId: string): Promise<Post | null> {
  try {
    const postData = await getPostDetail(postId);
    return postData.data || postData;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Server Component for SEO-optimized post display
export default async function PostDetail({ postId }: PostDetailProps) {
  const post = await getPostData(postId);

  if (!post) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-destructive text-lg">
            Không thể tải bài viết
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold leading-tight">
            {post.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} lượt xem</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{post.reactions.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <HeartCrack className="w-4 h-4" />
              <span>{post.reactions.dislikes}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* Post Content */}
          <div className="prose prose-gray max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {post.body}
            </div>
          </div>

          <Separator />

          {/* Post Metadata */}
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Bài viết #{post.id}</span>
            <span>Tác giả: User {post.userId}</span>
          </div>
        </CardContent>
      </Card>
    </article>
  );
} 