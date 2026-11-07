"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getListCategories, getListPostHomepage } from "@/services/news";
import { ICategory, IPost } from "@/types/post";
import PageHero from "@/components/site/PageHero";
import PostCard, { formatPostDate } from "@/components/News/PostCard";
import CtaBand from "@/components/site/CtaBand";

interface NewsClientProps {
    initialData?: {
        heroPost: IPost;
        latest: IPost[];
        featuredArticles: IPost[];
        categories: ICategory[];
    };
}

export default function NewsClient({ initialData }: NewsClientProps) {
    const [careerTopics, setCareerTopics] = React.useState<ICategory[]>(initialData?.categories || []);
    const [heroPost, setHeroPost] = React.useState<IPost>(initialData?.heroPost || {} as IPost);
    const [featuredArticles, setFeaturedArticles] = React.useState<IPost[]>(initialData?.featuredArticles || [] as IPost[]);
    const [latest, setLatest] = React.useState<IPost[]>(initialData?.latest || [] as IPost[]);
    const [loading, setLoading] = React.useState(!initialData?.categories);
    const [newsLoading, setNewsLoading] = React.useState(!initialData?.heroPost);

    // Fetch api get list category
    React.useEffect(() => {
        if (initialData?.categories) return;

        const fetchCareerTopics = async () => {
            try {
                setLoading(true);
                const categories = await getListCategories();
                setCareerTopics(categories);
            } catch (error) {
                console.error('Error fetching career topics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCareerTopics();
    }, [initialData?.categories]);

    // Fetch api get list post
    React.useEffect(() => {
        if (initialData?.heroPost) return;
        const fetchNewsArticles = async () => {
            try {
                setNewsLoading(true);
                const response = await getListPostHomepage(20);
                // Set data from the structured response
                setHeroPost(response.hero);
                setLatest(response.latest.data);
                setFeaturedArticles(response.featured);
            } catch (error) {
                console.error('Error fetching news articles:', error);
            } finally {
                setNewsLoading(false);
            }
        };

        fetchNewsArticles();
    }, [initialData?.heroPost as IPost, initialData?.featuredArticles as IPost[], initialData?.latest as IPost[]]);

    const hasHero = Boolean(heroPost?.id);

    return (
        <>
            <PageHero
                eyebrow="Tạp chí"
                title="Tạp chí rượu vang"
                description="Kiến thức, xu hướng và câu chuyện từ thế giới rượu vang — dành cho những người làm nghề ẩm thực và người yêu vang."
                breadcrumbs={[{ label: "Tạp chí" }]}
            />

            <section className="bg-ivory pb-20 pt-10 md:pb-28 md:pt-14">
                <div className="container-site">
                    <nav aria-label="Chủ đề" className="scrollbar-hide -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                        <span className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm text-ivory">Tất cả</span>
                        {loading
                            ? [...Array(4)].map((_, i) => <span key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-cream" />)
                            : careerTopics.map((topic) => (
                                  <Link
                                      key={topic.id}
                                      href={`/tin-tuc/danh-muc/${topic.slug}`}
                                      className="shrink-0 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                                  >
                                      {topic.name}
                                  </Link>
                              ))}
                    </nav>

                    {newsLoading ? (
                        <div className="grid gap-8 lg:grid-cols-12" aria-hidden>
                            <div className="aspect-[3/2] animate-pulse rounded-card bg-cream lg:col-span-7" />
                            <div className="space-y-4 lg:col-span-5">
                                <div className="h-4 w-1/3 animate-pulse rounded bg-cream" />
                                <div className="h-10 animate-pulse rounded bg-cream" />
                                <div className="h-24 animate-pulse rounded bg-cream" />
                            </div>
                        </div>
                    ) : hasHero ? (
                        <article className="group relative grid items-center gap-8 border-b border-line pb-14 lg:grid-cols-12 lg:gap-14">
                            <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-cream lg:col-span-7">
                                {heroPost.thumbnailImage?.path && (
                                    <Image
                                        src={heroPost.thumbnailImage.path}
                                        alt={heroPost.thumbnailImage.altText || heroPost.title}
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 58vw, 100vw"
                                        className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="lg:col-span-5">
                                <p className="eyebrow text-wine">
                                    {heroPost.category?.name} <span className="mx-2 text-line-strong">/</span>
                                    <span className="text-stone">{formatPostDate(heroPost.publishAt)}</span>
                                </p>
                                <h2 className="mt-5 heading-display text-display-md text-ink transition-colors group-hover:text-wine">
                                    <Link href={`/tin-tuc/${heroPost.slug}`} className="after:absolute after:inset-0 after:content-['']">
                                        {heroPost.title}
                                    </Link>
                                </h2>
                                {heroPost.summary && <p className="prose-lead mt-5 line-clamp-4">{heroPost.summary}</p>}
                                <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink underline decoration-gold decoration-2 underline-offset-[6px]">
                                    Đọc bài viết
                                </span>
                            </div>
                        </article>
                    ) : (
                        <div className="mx-auto max-w-md py-20 text-center">
                            <p className="heading-display text-display-sm text-ink">Bài viết đang được biên tập.</p>
                            <p className="mt-3 text-stone">Hãy quay lại sau để đọc những câu chuyện mới nhất về rượu vang.</p>
                        </div>
                    )}

                    {(latest?.length > 0 || featuredArticles.length > 0) && (
                        <div className="mt-14 grid gap-14 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <h2 className="eyebrow mb-8 text-wine">Mới nhất</h2>
                                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                                    {latest?.map((article) => (
                                        <PostCard key={`latest-${article.id}`} post={article} />
                                    ))}
                                </div>
                            </div>
                            {featuredArticles.length > 0 && (
                                <aside className="lg:col-span-4">
                                    <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
                                        <h2 className="eyebrow mb-8 text-wine">Nổi bật</h2>
                                        <div className="divide-y divide-line border-y border-line">
                                            {featuredArticles.map((article) => (
                                                <PostCard key={article.id} post={article} layout="row" className="py-5" />
                                            ))}
                                        </div>
                                    </div>
                                </aside>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <CtaBand />
        </>
    );
}
