import { getSite } from '@/lib/site';
import Image from "next/image";
import { IPost } from "@/types/post";
import ArticleMeta from "./ArticleMeta";
import LikeButton from "./LikeButton";

interface ArticleContentProps {
  article: IPost;
  viewCount: number;
}

export default async function ArticleContent({
  article,
  viewCount,
}: ArticleContentProps) {
  const site = await getSite();
  return (
    <article itemScope itemType="https://schema.org/NewsArticle">
      <h1 className="heading-display text-display-lg max-w-[22ch] text-ink" itemProp="headline">
        {article.title}
      </h1>
      <p className="mt-4 text-sm font-medium text-gold-deep" itemProp="articleSection">
        {article?.category?.name ?? "Tạp chí"}
      </p>

      <ArticleMeta article={article} initialViewCount={viewCount} />

      {article.summary && (
        <p className="mb-10 max-w-[56ch] text-lead text-ink-soft" itemProp="description">
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
        <meta itemProp="keywords" content={`${article.category.name}, rượu vang, ${site.province}`} />
      )}
    </article>
  );
}
