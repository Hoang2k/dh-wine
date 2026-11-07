"use client";
import { Calendar, User, Eye } from "lucide-react";
import { IPost } from "@/types/post";
import { useState, useEffect, useRef } from "react";
import { postView } from "@/services/news";

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface ArticleMetaProps {
  article: IPost;
  initialViewCount: number;
}

export default function ArticleMeta({ article, initialViewCount }: ArticleMetaProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!article.id || hasTrackedRef.current) return;

    hasTrackedRef.current = true;

    (async () => {
      try {
        const response = await postView(Number(article.id));

        if (response?.view !== undefined) {
          setViewCount(response.view);
        }
        
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    })();
  }, [article.id]);

  return (
    <div className="mb-10 mt-8 flex flex-wrap items-center gap-6 border-y border-line py-4 text-sm text-stone">
      <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
        <User className="h-4 w-4" />
        <span itemProp="name">{article?.author?.name ?? "—"}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <time itemProp="datePublished" dateTime={article?.publishAt || ""}>
          {formatDate(article?.publishAt)}
        </time>
        {article?.updatedAt && (
          <meta itemProp="dateModified" content={article.updatedAt} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4" />
        <span>{viewCount} lượt xem</span>
      </div>
    </div>
  );
}
