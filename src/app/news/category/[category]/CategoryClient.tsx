"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getListPosts } from '@/services/news';
import { IPost, ICategory } from '@/types/post';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils';
import Pagination from '@/components/ui/pagination';

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

export default function CategoryClient({ category, initialData }: CategoryClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [articles, setArticles] = React.useState<IPost[]>(initialData.articles);
    const [meta, setMeta] = React.useState(initialData.meta);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(initialData.meta.page);
    const [pageSize, setPageSize] = React.useState(initialData.meta.perPage);
    
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
            }) as any;

            // Handle both array and paginated response formats
            const newArticles = Array.isArray(response) ? response : response?.data || [];
            const newMeta = Array.isArray(response) ? {
                page: 1,
                perPage: newArticles.length,
                total: newArticles.length,
                totalPages: 1
            } : response?.meta || {
                page: 1,
                perPage: 0,
                total: 0,
                totalPages: 0
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 lg:px-30 py-6 md:py-10">
                {/* Category Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {initialData.categoryName}
                    </h1>
                    <p className="text-gray-600">
                        {meta.total} bài viết trong danh mục này
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Articles List */}
                        <div className="space-y-4 mb-8">
                            {loading ? (
                                // Loading skeleton
                                <div className="space-y-4">
                                    {[...Array(pageSize)].map((_, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                                            <div className="animate-pulse">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                                    </div>
                                                    <div className="md:ml-4 w-full md:w-48 lg:w-56 flex-shrink-0">
                                                        <div className="w-full h-32 md:h-40 bg-gray-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : articles?.length > 0 ? (
                                articles?.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/tin-tuc/${article.slug}`} className="block group">
                                            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <Badge className="bg-blue-100 text-blue-800 text-xs mb-2">
                                                            {typeof article.category === 'object' 
                                                                ? article.category?.name || 'Uncategorized'
                                                                : 'Uncategorized'
                                                            }
                                                        </Badge>
                                                        <h2 className="font-bold text-lg md:text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                            {article.title}
                                                        </h2>
                                                        <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-2">
                                                            {article.summary}
                                                        </p>
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(article.publishAt)} - {(article.view ?? 0).toLocaleString()} lượt xem
                                                        </div>
                                                    </div>
                                                    <div className="md:ml-4 w-full md:w-48 lg:w-56 flex-shrink-0">
                                                        <div className="relative w-full h-32 md:h-40 overflow-hidden rounded">
                                                            {article.thumbnailImage ? (
                                                                <Image
                                                                    src={article.thumbnailImage.path}
                                                                    alt={article.thumbnailImage.altText}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-gray-500 text-sm">Không có hình ảnh</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="bg-white rounded-lg p-8 text-center">
                                    <p className="text-gray-500 text-lg">Không có bài viết nào trong danh mục này</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {meta.totalPages > 1 && (
                            <div className="flex justify-center">
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

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-80 xl:w-96 space-y-4 md:space-y-6">
                        {/* Other Categories Section */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
                                DANH MỤC KHÁC
                            </h3>
                            {categories.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                    {categories.map((cat) => (
                                        <Link 
                                            key={cat.id} 
                                            href={`/tin-tuc/danh-muc/${cat.slug}`}
                                            className={`text-xs md:text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors p-2 rounded hover:bg-gray-50 ${cat.slug === category ? 'bg-blue-50 text-blue-700' : ''}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 text-sm">Không có danh mục khác</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

