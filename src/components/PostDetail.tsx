'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '@/services/user';
import { Post } from '@/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Heart, HeartCrack } from 'lucide-react';

interface PostDetailProps {
  postId: string;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const {
    data: postData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (isError || !postData) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-destructive text-lg">
            {error instanceof Error ? error.message : 'Không thể tải bài viết'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const post: Post = postData.data || postData;

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

function PostDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Separator />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Separator />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 