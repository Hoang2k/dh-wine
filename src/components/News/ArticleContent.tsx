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
    <article itemScope itemType="https://schema.org/NewsArticle">
      <p className="eyebrow mb-6 flex items-center gap-3 text-wine">
        <span aria-hidden className="h-px w-8 bg-gold" />
        <span itemProp="articleSection">{article?.category?.name ?? "Tạp chí"}</span>
      </p>

      <h1 className="heading-display text-display-lg text-ink" itemProp="headline">
        {article.title}
      </h1>

      <ArticleMeta article={article} initialViewCount={viewCount} />

      {article.summary && (
        <p className="heading-display mb-10 text-2xl italic leading-snug text-ink-soft md:text-[1.75rem]" itemProp="description">
          {article.summary}
        </p>
      )}

      {article?.thumbnailImage?.path && (
        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-card bg-cream" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <Image
            src={article.thumbnailImage.path}
            alt={article?.thumbnailImage?.altText || article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover"
            priority
          />
          <meta itemProp="url" content={article.thumbnailImage.path} />
          <meta itemProp="width" content="1200" />
          <meta itemProp="height" content="630" />
        </div>
      )}

      <div
        className="article-body"
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <LikeButton
          articleId={String(article.id)}
          initialLikeCount={article.totalLike || 0}
          initialHasReacted={article.hasReacted}
        />
      </div>

      <meta itemProp="inLanguage" content="vi-VN" />
      {article?.category?.name && (
        <meta itemProp="keywords" content={`${article.category.name}, rượu vang, Khánh Hòa`} />
      )}
    </article>
  );
}
