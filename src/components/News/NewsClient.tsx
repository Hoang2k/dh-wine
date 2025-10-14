"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    User,
    ArrowRight,
    Clock,
    Eye,
    Share2,
    BookOpen,
    TrendingUp,
    Star,
    Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getListCategories, getListPosts, getListPostHomepage } from "@/services/news";
import { ICategory, IPost, IPostHomepage } from "@/types/post";

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 lg:px-30 py-6 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Featured Article */}
                        {newsLoading ? (
                            <div className="mb-6 md:mb-8">
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                    <div className="animate-pulse">
                                        <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200"></div>
                                        <div className="p-4 md:p-6">
                                            <div className="h-6 bg-gray-200 rounded mb-3"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : heroPost ? (
                            <motion.div
                                key={heroPost.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 md:mb-8"
                            >
                                    <Link href={`/news/${heroPost.slug}`} className="block group">
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                                            {heroPost.thumbnailImage ? (
                                                <Image
                                                    src={heroPost.thumbnailImage.path}
                                                    alt={heroPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500">Không có hình ảnh</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 md:p-6">
                                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                                {heroPost.title}
                                            </h1>
                                            <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                                                {heroPost.summary}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="mb-6 md:mb-8">
                                <div className="bg-white rounded-lg p-8 text-center">
                                    <p className="text-gray-500">Không có bài viết nào</p>
                                </div>
                            </div>
                        )}

                        {/* Latest News Section */}
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                                TIN MỚI NHẤT
                            </h2>
                            {newsLoading ? (
                                <div className="space-y-4">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className="bg-white rounded-lg p-3 md:p-4 shadow-md">
                                            <div className="animate-pulse">
                                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                                    <div className="flex-1">
                                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                                        <div className="h-5 bg-gray-200 rounded mb-2"></div>
                                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                                    </div>
                                                    <div className="sm:ml-4 w-32 sm:w-36 md:w-40 sm:flex-shrink-0">
                                                        <div className="w-full sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 bg-gray-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : latest ? (
                                latest.map((article) => (
                                    <motion.div
                                        key={`latest-${article.id}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="mb-4"
                                    >
                                        <Link href={`/news/${article.slug}`} className="block group">
                                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-md group-hover:shadow-lg transition-all duration-300">
                                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                                    <div className="flex-1">
                                                        <Badge className="bg-blue-100 text-blue-800 text-xs mb-2">
                                                            {typeof article.category === 'object' 
                                                                ? article.category?.name || 'Uncategorized'
                                                                : 'Uncategorized'
                                                            }
                                                        </Badge>
                                                        <h3 className="font-bold text-base md:text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                            {article.summary}
                                                        </p>
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(article.publishAt)} - {(article.view ?? 0).toLocaleString()} lượt xem
                                                        </div>
                                                    </div>
                                                    <div className="sm:ml-4 w-32 sm:w-36 md:w-40 sm:flex-shrink-0">
                                                        <div className="relative w-full sm:w-36 md:w-40 h-24 sm:h-28 md:h-32 overflow-hidden rounded">
                                                            {article.thumbnailImage ? (
                                                                <Image
                                                                    src={article.thumbnailImage.path}
                                                                    alt={article.thumbnailImage.altText}
                                                                    fill
                                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-gray-500 text-xs">Không có hình ảnh</span>
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
                                    <p className="text-gray-500">Không có bài viết nào</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full lg:w-80 xl:w-96 space-y-4 md:space-y-6">
                        {/* Topics Section */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">CHỦ ĐỀ</h3>
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="animate-pulse">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                                    {careerTopics.map((topic) => (
                                        <Link 
                                            key={topic.id} 
                                            href={`/tin-tuc/danh-muc/${topic.slug}`}
                                            className="text-xs md:text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                                        >
                                            {topic.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Featured Articles Section */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-md">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 border-b border-gray-200 pb-2">
                                BÀI VIẾT NỔI BẬT
                            </h3>
                            {newsLoading ? (
                                <div className="space-y-3 md:space-y-4">
                                    {[...Array(6)].map((_, index) => (
                                        <div key={index} className="animate-pulse">
                                            <div className="flex gap-3 p-2">
                                                <div className="w-12 h-8 sm:w-16 sm:h-12 bg-gray-200 rounded flex-shrink-0"></div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : featuredArticles.length > 0 ? (
                                <div className="space-y-3 md:space-y-4">
                                    {featuredArticles.map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Link href={`/news/${article.slug}`} className="block group">
                                                <div className="flex gap-3 group-hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                    <div className="relative w-12 h-8 sm:w-16 sm:h-12 overflow-hidden rounded flex-shrink-0">
                                                        {article.thumbnailImage ? (
                                                            <Image
                                                                src={article.thumbnailImage.path}
                                                                alt={article.thumbnailImage.altText}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                <span className="text-gray-500 text-xs">N/A</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-xs sm:text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                            {article.title}
                                                        </h4>
                                                        <div className="text-xs text-gray-500">
                                                            {formatDate(article.publishAt)} - {(article.view ?? 0).toLocaleString()} lượt xem
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 text-sm">Không có bài viết nổi bật</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
