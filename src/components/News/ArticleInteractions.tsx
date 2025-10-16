"use client";
import * as React from "react";
import LikeButton from "./LikeButton";
import ViewTracker from "./ViewTracker";
import { Eye } from "lucide-react";

interface ArticleInteractionsProps {
  articleId: string;
  initialViewCount: number;
  initialLikeCount: number;
  initialHasReacted?: boolean;
  onViewUpdate?: (count: number) => void;
}

export default function ArticleInteractions({
  articleId,
  initialViewCount,
  initialLikeCount,
  initialHasReacted,
  onViewUpdate,
}: ArticleInteractionsProps) {
  return (
    <>
      <ViewTracker
        articleId={articleId}
        initialViewCount={initialViewCount}
        onViewUpdate={onViewUpdate}
      />
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <LikeButton
            articleId={articleId}
            initialLikeCount={initialLikeCount}
            initialHasReacted={initialHasReacted}
          />
        </div>
      </div>
    </>
  );
}

