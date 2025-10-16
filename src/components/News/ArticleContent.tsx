import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { IPost } from "@/types/post";
import ArticleMeta from "./ArticleMeta";
import LikeButton from "./LikeButton";

interface ArticleContentProps {
  article: IPost;
  viewCount: number;
}

export default function ArticleContent({
  article,
  viewCount,
}: ArticleContentProps) {
  return (
    <article className="lg:col-span-8 order-2" itemScope itemType="https://schema.org/NewsArticle">
      {/* Article Header */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-emerald-600" />
        <Badge variant="secondary" className="text-emerald-700 bg-emerald-100">
          <span itemProp="articleSection">{article?.category?.name ?? "Uncategorized"}</span>
        </Badge>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 leading-tight" itemProp="headline">
        {article.title}
      </h1>

      {/* Article Meta */}
      <ArticleMeta article={article} initialViewCount={viewCount} />

      {/* Article Summary */}
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl italic" itemProp="description">
        {article.summary}
      </p>

      {/* Thumbnail Image (optional) */}
      {article?.thumbnailImage?.path && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden rounded-lg" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <Image
            src={article.thumbnailImage.path}
            alt={article?.thumbnailImage?.altText || article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
            className="object-cover"
            priority
          />
          <meta itemProp="url" content={article.thumbnailImage.path} />
          <meta itemProp="width" content="1200" />
          <meta itemProp="height" content="630" />
        </div>
      )}

      {/* Article Content */}
      <div className="py-8" itemProp="articleBody">
        <div
          className="prose prose-lg max-w-none prose-headings:text-emerald-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-emerald-800 prose-img:rounded-lg prose-a:text-emerald-600 hover:prose-a:text-emerald-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Like Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <LikeButton
            articleId={String(article.id)}
            initialLikeCount={article.totalLike || 0}
            initialHasReacted={false}
          />
        </div>
      </div>

      {/* Hidden metadata for search engines */}
      <meta itemProp="inLanguage" content="vi-VN" />
      {article?.category?.name && (
        <meta itemProp="keywords" content={`${article.category.name}, tin tức, Vị Xuyên, nghĩa trang liệt sĩ`} />
      )}
    </article>
  );
}

