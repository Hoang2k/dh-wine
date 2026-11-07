import { IPost } from "@/types/post";
import PostCard from "./PostCard";

interface RelatedArticlesListProps {
  articles: IPost[];
}

export default function RelatedArticlesList({
  articles,
}: RelatedArticlesListProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t border-line pt-14">
      <h2 className="heading-display text-display-sm text-ink">Bài viết liên quan</h2>
      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <PostCard key={article.id} post={article} />
        ))}
      </div>
    </section>
  );
}
