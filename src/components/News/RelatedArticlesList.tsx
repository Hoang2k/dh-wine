import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye } from "lucide-react";
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

interface RelatedArticlesListProps {
  articles: IPost[];
}

export default function RelatedArticlesList({
  articles,
}: RelatedArticlesListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 border-b-2 border-emerald-600 pb-2">
          TIN LIÊN QUAN
        </h2>
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <p className="text-gray-500">Không có tin liên quan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6 border-b-2 border-emerald-600 pb-2">
        TIN LIÊN QUAN
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="mb-4">
            <Link href={`/tin-tuc/${article.slug}`} className="block group">
              <div className="bg-white rounded-lg p-4 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs mb-2">
                      {article?.category?.name ?? "Uncategorized"}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{article?.author?.name ?? "—"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(article?.publishAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{Number(article?.view) || 0} lượt xem</span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:ml-4 w-full sm:w-40 sm:flex-shrink-0">
                    <div className="relative w-full sm:w-40 h-32 sm:h-28 overflow-hidden rounded">
                      {article?.thumbnailImage?.path ? (
                        <Image
                          src={article.thumbnailImage.path}
                          alt={article?.thumbnailImage?.altText || article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 160px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            Không có hình ảnh
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

