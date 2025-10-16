"use client";
import * as React from "react";
import ArticleContent from "@/components/News/ArticleContent";
import ArticleInteractions from "@/components/News/ArticleInteractions";
import { IPost } from "@/types/post";

interface NewsDetailClientProps {
  post: IPost;
  initialViewCount: number;
  initialLikeCount: number;
  initialHasReacted?: boolean;
}

export default function NewsDetailClient({
  post,
  initialViewCount,
  initialLikeCount,
  initialHasReacted,
}: NewsDetailClientProps) {
  // Lift state lên đây để share giữa ArticleContent và ViewTracker
  const [viewCount, setViewCount] = React.useState(initialViewCount);

  return (
    <>
      {/* Main Content - truyền viewCount từ state */}
      <ArticleContent article={post} viewCount={viewCount} />

      {/* Action Buttons - ViewTracker sẽ update viewCount */}
      <div className="mt-8">
        <ArticleInteractions
          articleId={String(post.id)}
          initialViewCount={initialViewCount}
          initialLikeCount={initialLikeCount}
          initialHasReacted={initialHasReacted}
          onViewUpdate={setViewCount}
        />
      </div>
    </>
  );
}

