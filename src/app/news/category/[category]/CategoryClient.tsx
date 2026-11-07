"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getListPosts } from '@/services/news';
import { IPost, ICategory } from '@/types/post';
import Link from 'next/link';
import Pagination from '@/components/ui/pagination';
import PageHero from '@/components/site/PageHero';
import PostCard from '@/components/News/PostCard';
import { cn } from '@/lib/utils';

interface CategoryClientProps {
    category: string;
    initialData: {
        articles: IPost[];
        meta: {
            page: number;
            perPage: number;
            total: number;
            totalPages: number;
        };
        categoryName: string;
        categories: ICategory[];
    };
}

function CategoryWithSearchParams({ category, initialData }: CategoryClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [articles, setArticles] = React.useState<IPost[]>(initialData.articles);
    const [meta, setMeta] = React.useState(initialData.meta);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(initialData.meta.page);
    const [pageSize, setPageSize] = React.useState(initialData.meta.perPage);
    const [isInitialized, setIsInitialized] = React.useState(false);
    
    const categories = initialData.categories || [];
    // const otherCategories = categories.filter(cat => cat.slug !== category);

    // Update URL when pagination changes
    const updateURL = React.useCallback((page: number, perPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        params.set('per_page', perPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    // Fetch articles when page or page size changes
    const fetchArticles = React.useCallback(async (page: number, perPage: number) => {
        try {
            setLoading(true);
            const response = await getListPosts({ 
                category: category, 
                per_page: perPage,
                page: page
            });

            // getListPosts now always returns an array
            const newArticles = response;
            const newMeta = {
                page: page,
                perPage: perPage,
                total: newArticles.length,
                totalPages: Math.ceil(newArticles.length / perPage)
            };

            setArticles(newArticles);
            setMeta(newMeta);
            setCurrentPage(page);
            setPageSize(perPage);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    }, [category]);

    // Handle page change
    const handlePageChange = React.useCallback((page: number) => {
        updateURL(page, pageSize);
        fetchArticles(page, pageSize);
    }, [updateURL, fetchArticles, pageSize]);

    // Handle page size change
    const handlePageSizeChange = React.useCallback((newPageSize: number) => {
        updateURL(1, newPageSize);
        fetchArticles(1, newPageSize);
    }, [updateURL, fetchArticles]);

    React.useEffect(() => {
        const pageParam = searchParams.get('page');
        const perPageParam = searchParams.get('per_page');
        
        const urlPage = pageParam ? parseInt(pageParam) : 1;
        const urlPerPage = perPageParam ? parseInt(perPageParam) : 20;
        
    
        if (isInitialized && (urlPage !== currentPage || urlPerPage !== pageSize)) {
            fetchArticles(urlPage, urlPerPage);
        } else if (!isInitialized) {
            if (urlPage !== 1 || urlPerPage !== 20) {
                fetchArticles(urlPage, urlPerPage);
            }
            setIsInitialized(true);
        }
    }, [searchParams, isInitialized, currentPage, pageSize, fetchArticles]);

    return (
        <>
            <PageHero
                eyebrow="Tạp chí"
                title={initialData.categoryName}
                description={`${meta.total} bài viết trong chủ đề này.`}
                breadcrumbs={[{ label: 'Tạp chí', href: '/tin-tuc' }, { label: initialData.categoryName }]}
            />
            <section className="bg-ivory pb-20 pt-10 md:pb-28 md:pt-14">
                <div className="container-site">
                    {categories.length > 0 && (
                        <nav aria-label="Chủ đề" className="scrollbar-hide -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                            <Link href="/tin-tuc" className="shrink-0 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-ink">
                                Tất cả
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/tin-tuc/danh-muc/${cat.slug}`}
                                    aria-current={cat.slug === category ? 'page' : undefined}
                                    className={cn(
                                        'shrink-0 rounded-full border px-4 py-2 text-sm transition-colors',
                                        cat.slug === category ? 'border-ink bg-ink text-ivory' : 'border-line-strong text-ink hover:border-ink',
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {loading ? (
                        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="aspect-[3/2] animate-pulse rounded-card bg-cream" />
                                    <div className="h-6 animate-pulse rounded bg-cream" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-cream" />
                                </div>
                            ))}
                        </div>
                    ) : articles?.length > 0 ? (
                        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <PostCard key={article.id} post={article} />
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto max-w-md py-20 text-center">
                            <p className="heading-display text-display-sm text-ink">Chưa có bài viết trong chủ đề này.</p>
                            <Link href="/tin-tuc" className="mt-6 inline-block text-ink underline decoration-gold decoration-2 underline-offset-4">
                                Xem tất cả bài viết
                            </Link>
                        </div>
                    )}

                    {meta.totalPages > 1 && (
                        <div className="mt-16 flex justify-center">
                            <Pagination
                                totalRecords={meta.total}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                onPageSizeChange={handlePageSizeChange}
                                isLoading={loading}
                                pageSizeOptions={[10, 20, 50]}
                                showPageSizeSelector={true}
                                showRecordsInfo={true}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

// Wrapper component với Suspense
export default function CategoryClient({ category, initialData }: CategoryClientProps) {
    return (
        <React.Suspense fallback={<div className="min-h-[60vh] bg-ivory" />}>
            <CategoryWithSearchParams category={category} initialData={initialData} />
        </React.Suspense>
    );
}

