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
  const [viewCount, setViewCount] = React.useState(initialViewCount);

  return (
    <>
      <ArticleContent article={post} viewCount={viewCount} />
    </>
  );
}

