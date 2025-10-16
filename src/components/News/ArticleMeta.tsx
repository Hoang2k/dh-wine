"use client";
import { Calendar, User, Eye } from "lucide-react";
import { IPost } from "@/types/post";

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
  viewCount: number;
}

export default function ArticleMeta({ article, viewCount }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
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
