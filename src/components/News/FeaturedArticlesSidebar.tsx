import { IPost } from "@/types/post";
import PostCard from "./PostCard";

interface FeaturedArticlesSidebarProps {
  articles: IPost[];
}

export default function FeaturedArticlesSidebar({
  articles,
}: FeaturedArticlesSidebarProps) {
  if (articles.length === 0) return null;

  return (
    <aside className="lg:col-span-3">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
        <h2 className="eyebrow mb-6 text-wine">Bài viết nổi bật</h2>
        <div className="divide-y divide-line border-y border-line">
          {articles.map((article) => (
            <PostCard key={article.id} post={article} layout="row" className="py-5" />
          ))}
        </div>
      </div>
    </aside>
  );
}
