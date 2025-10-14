"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye, BookOpen, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/types/post";
import { postView, reactToPost } from "@/services/news";

interface NewsDetailClientProps {
  article: IPost;
  relatedArticles: IPost[];
  featuredArticles: IPost[];
}

const USER_ID_KEY = "user:v1:id";
const LIKES_PREFIX = "likes:v1:";
const VIEWS_PREFIX = "views:v1:";
const VIEW_EXPIRY_HOURS = 24;

function getOrCreateUserId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing) return existing;

    const gen =
      (globalThis as any).crypto?.randomUUID?.() ??
      `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    localStorage.setItem(USER_ID_KEY, gen);
    return gen;
  } catch {
    return null;
  }
}

function loadUserLikes(userId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LIKES_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveUserLikes(userId: string, bag: Record<string, boolean>) {
  try {
    localStorage.setItem(LIKES_PREFIX + userId, JSON.stringify(bag));
  } catch {}
}

function loadUserViews(userId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(VIEWS_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveUserViews(userId: string, views: Record<string, number>) {
  try {
    localStorage.setItem(VIEWS_PREFIX + userId, JSON.stringify(views));
  } catch {}
}
function hasViewedRecently(userId: string, articleId: string): boolean {
  try {
    const views = loadUserViews(userId);
    const viewTime = views[articleId];
    if (!viewTime) return false;
    const now = Date.now();
    const hoursSinceView = (now - viewTime) / (1000 * 60 * 60);
    return hoursSinceView < VIEW_EXPIRY_HOURS;
  } catch {
    return false;
  }
}
function markAsViewed(userId: string, articleId: string) {
  try {
    const views = loadUserViews(userId);
    views[articleId] = Date.now();
    saveUserViews(userId, views);
  } catch {}
}

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

export default function NewsDetailClient({
  article,
  relatedArticles,
  featuredArticles,
}: NewsDetailClientProps) {
  // View count state
  const [viewCount, setViewCount] = React.useState<number>(
    Number(article?.view) || 0
  );
  const [viewRecorded, setViewRecorded] = React.useState<boolean>(false);

  // Add a ref to track viewed articles in this session (only for reload prevention)
  const viewedArticlesRef = React.useRef<Set<string>>(new Set());

  // Add a ref to prevent duplicate API calls
  const apiCallMadeRef = React.useRef<Set<string>>(new Set());

  // Simple view tracking - always call API
  React.useEffect(() => {
    if (!article?.id) return;
    if (typeof window === "undefined") return;

    const articleId = String(article.id);
    
    // Prevent duplicate API calls for the same article
    if (apiCallMadeRef.current.has(articleId)) {
      console.log('API call already made for this article, skipping');
      return;
    }

    const abort = new AbortController();
    const userId = getOrCreateUserId();
    if (!userId) return;

    (async () => {
      try {
        // Mark API call as made
        apiCallMadeRef.current.add(articleId);
        
        console.log('Making API call to track view for article:', article.id);
        const response = await postView(Number(article.id));
        if (abort.signal.aborted) return;

        console.log('API response:', response);

        if (response?.view !== undefined) {
          setViewCount(response.view);
        } else if (response?.data?.view !== undefined) {
          setViewCount(response.data.view);
        } else {
          setViewCount((prev) => prev + 1);
        }

        markAsViewed(userId, String(article.id));
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("Error tracking view:", error);
          // Remove from set if API call failed
          apiCallMadeRef.current.delete(articleId);
        }
      }
    })();

    return () => abort.abort();
  }, [article?.id]);

  // Like state
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(
    Number(article?.totalLike) || 0
  );
  const [copied, setCopied] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // Init like state mỗi khi đổi bài (ưu tiên server hasReacted, fallback localStorage)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const userId = getOrCreateUserId();
      const localLiked =
        userId ? loadUserLikes(userId)[String(article.id)] === true : false;
      const serverLiked = (article as any)?.hasReacted === true;

      setIsLiked(serverLiked || localLiked);
      setLikeCount(Number(article?.totalLike) || 0);
    } catch {}
  }, [article]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const prevLiked = isLiked;
    const prevCount = likeCount;
    const userId = getOrCreateUserId();

    const nextIsLiked = !prevLiked;
    setIsLiked(nextIsLiked);
    setLikeCount((p) => (nextIsLiked ? p + 1 : Math.max(0, p - 1)));

    // optimistic local
    if (userId) {
      const bag = loadUserLikes(userId);
      if (nextIsLiked) {
        bag[String(article.id)] = true;
      } else {
        delete bag[String(article.id)];
      }
      saveUserLikes(userId, bag);
    }

    try {
      const res = await reactToPost(Number(article.id), nextIsLiked);
      if (typeof res?.totalLike === "number") {
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      // rollback UI + local
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      if (userId) {
        const bag = loadUserLikes(userId);
        if (prevLiked) {
          bag[String(article.id)] = true;
        } else {
          delete bag[String(article.id)];
        }
        saveUserLikes(userId, bag);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://nghiatranglietsivixuyen.vn";
    const url = `${base}/tin-tuc/${article.slug}`;
    const title = article.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "zalo":
        window.open(
          `https://zalo.me/share?url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "copy":
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }
        break;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Article Content */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Social Sharing - Left Side */}
            <div className="hidden lg:block lg:col-span-1 order-1">
              <div className="sticky top-8">
                <div className="flex flex-col items-center space-y-4 p-3 bg-gray-50 rounded-lg">
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                    title="Chia sẻ trên Facebook"
                    aria-label="Chia sẻ Facebook"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>

                  {/* Zalo */}
                  <button
                    onClick={() => handleShare("zalo")}
                    className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
                    title="Chia sẻ trên Zalo"
                    aria-label="Chia sẻ Zalo"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.5 8.5h-5c-.276 0-.5.224-.5.5s.224.5.5.5h3.293l-3.646 3.646c-.195.195-.195.512 0 .707.098.098.226.147.354.147s.256-.049.354-.147L12.5 10.207V13.5c0 .276.224.5.5.5s.5-.224.5-.5v-4.5c0-.276-.224-.5-.5-.5z" />
                    </svg>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center transition-colors"
                    title={copied ? "Đã sao chép!" : "Sao chép liên kết"}
                    aria-label="Sao chép liên kết"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 order-2">
              {/* Article Header */}
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <Badge
                  variant="secondary"
                  className="text-emerald-700 bg-emerald-100"
                >
                  {article?.category?.name ?? "Uncategorized"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article?.author?.name ?? "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article?.publishAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{viewCount} lượt xem</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8 max-w-3xl italic">
                {article.summary}
              </p>

              <div className="overflow-hidden mb-8">
                {/* Nếu dùng ảnh đầu bài, đảm bảo parent relative + sizes */}
                {/* <div className="relative h-64 md:h-80 lg:h-96">
                  <Image
                    src={article?.thumbnailImage?.path || ""}
                    alt={article?.thumbnailImage?.altText || article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
                    className="object-cover"
                  />
                </div> */}
                <div className="py-8">
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-emerald-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-emerald-800"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleLike}
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2 hover:cursor-pointer"
                    disabled={loading}
                  >
                    <span>{isLiked ? "Đã thích" : "Thích"}</span>
                    <span>({likeCount})</span>
                  </Button>
                </div>
              </div>

              {/* Related News Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-emerald-900 mb-6 border-b-2 border-emerald-600 pb-2">
                  TIN LIÊN QUAN
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((ra, index) => (
                    <motion.div
                      key={ra.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-4"
                    >
                      <Link href={`/tin-tuc/${ra.slug}`} className="block group">
                        <div className="bg-white rounded-lg p-4 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <Badge className="bg-emerald-100 text-emerald-800 text-xs mb-2">
                                {ra?.category?.name ?? "Uncategorized"}
                              </Badge>
                              <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                {ra.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                {ra.summary}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{ra?.author?.name ?? "—"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(ra?.publishAt)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{Number(ra?.view) || 0} lượt xem</span>
                                </div>
                              </div>
                            </div>
                            <div className="sm:ml-4 w-full sm:w-40 sm:flex-shrink-0">
                              <div className="relative w-full sm:w-40 h-32 sm:h-28 overflow-hidden rounded">
                                {ra?.thumbnailImage?.path ? (
                                  <Image
                                    src={ra.thumbnailImage.path}
                                    alt={
                                      ra?.thumbnailImage?.altText || ra.title
                                    }
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
                    </motion.div>
                  ))}

                  {relatedArticles.length === 0 && (
                    <div className="bg-white rounded-lg p-8 text-center shadow-md">
                      <p className="text-gray-500">Không có tin liên quan</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3 order-3">
              <div className="sticky top-8 space-y-6">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">Bài viết nổi bật</h3>
                  <div className="space-y-4">
                    {featuredArticles.map((fa: IPost) => (
                      <div
                        className="flex gap-3 border-b-2 border-gray-200 pb-6"
                        key={fa.id}
                      >
                        <Link href={`/tin-tuc/${fa.slug}`}>
                          <Image
                            src={fa?.thumbnailImage?.path || ""}
                            alt={fa.title}
                            width={64}
                            height={64}
                            className="rounded-lg flex-shrink-0 object-cover"
                          />
                        </Link>

                        <div className="flex-1">
                          <Link
                            href={`/tin-tuc/${fa.slug}`}
                            className="font-semibold text-sm line-clamp-2 mb-1"
                          >
                            {fa.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(fa?.publishAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {featuredArticles.length === 0 && (
                      <div className="text-sm text-gray-500">
                        Chưa có bài nổi bật
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
