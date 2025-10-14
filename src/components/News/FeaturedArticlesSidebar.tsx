import Link from "next/link";
import Image from "next/image";
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

interface FeaturedArticlesSidebarProps {
  articles: IPost[];
}

export default function FeaturedArticlesSidebar({
  articles,
}: FeaturedArticlesSidebarProps) {
  return (
    <div className="lg:col-span-3 order-3">
      <div className="sticky top-8 space-y-6">
        <div className="p-6">
          <h3 className="font-bold text-lg mb-4">Bài viết nổi bật</h3>
          <div className="space-y-4">
            {articles.map((article: IPost) => (
              <div
                className="flex gap-3 border-b-2 border-gray-200 pb-6"
                key={article.id}
              >
                <Link href={`/tin-tuc/${article.slug}`}>
                  <Image
                    src={article?.thumbnailImage?.path || ""}
                    alt={article.title}
                    width={64}
                    height={64}
                    className="rounded-lg flex-shrink-0 object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    href={`/tin-tuc/${article.slug}`}
                    className="font-semibold text-sm line-clamp-2 mb-1 hover:text-emerald-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(article?.publishAt)}
                  </p>
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <div className="text-sm text-gray-500">Chưa có bài nổi bật</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

