import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllNewsSlugs, getPostDetail, getRelatedPostsByCategory, getListCategories, getFeaturedPosts } from '@/services/news';
import NewsDetailClient from '@/components/News/NewsDetailClient';
import { IPost } from '@/types/post';

// ISR Configuration - revalidate every hour for individual articles
export const revalidate = 3600;

// Cho phép render các slug không có trong generateStaticParams
export const dynamicParams = true;

interface NewsDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for each article or category
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    
    try {
        // First check if it's a category
        const categories = await getListCategories();
        const categoryData = categories.find(cat => cat.slug === slug);
        
        if (categoryData) {
            return {
                title: `${categoryData.name} - Tin tức`,
                description: `Tin tức mới nhất về ${categoryData.name}. Cập nhật thông tin nhanh chóng và chính xác.`,
                keywords: [
                    categoryData.name,
                    'tin tức',
                    'thông tin',
                    'sự kiện',
                    'cập nhật'
                ],
                openGraph: {
                    title: `${categoryData.name} - Tin tức`,
                    description: `Tin tức mới nhất về ${categoryData.name}. Cập nhật thông tin nhanh chóng và chính xác.`,
                    type: 'website',
                    locale: 'vi_VN',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: `${categoryData.name} - Tin tức`,
                    description: `Tin tức mới nhất về ${categoryData.name}. Cập nhật thông tin nhanh chóng và chính xác.`,
                },
                alternates: {
                    canonical: `/news/${slug}`,
                },
            };
        }

        // If not a category, check if it's an article
        const post = await getPostDetail(slug);
        if (post) {
            return {
                title: `${post.title} - Tin tức`,
                description: post.summary,
                keywords: [
                    post.category.name,
                    post.title,
                    'tin tức',
                    'thông tin'
                ],
                authors: [{ name: post.author.name }],
                openGraph: {
                    title: post.title,
                    description: post.summary,
                    type: 'article',
                    publishedTime: post.publishAt,
                    modifiedTime: post.updatedAt || post.publishAt,
                    authors: [post.author.name],
                    tags: [post.category.name],
                    images: [
                        {
                            url: post.thumbnailImage?.path || '',
                            width: 800,
                            height: 400,
                            alt: post.title,
                        }
                    ],
                    locale: 'vi_VN',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: post.title,
                    description: post.summary,
                    images: [post.thumbnailImage?.path || ''],
                },
                alternates: {
                    canonical: `/news/${slug}`,
                },
            };
        }

        return {
            title: 'Trang không tìm thấy',
            description: 'Trang bạn đang tìm kiếm không tồn tại.',
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Trang không tìm thấy',
            description: 'Trang bạn đang tìm kiếm không tồn tại.',
        };
    }
}

// Generate static params for all categories and articles
export async function generateStaticParams() {
    try {
        const [categories, articleSlugs] = await Promise.all([
            getListCategories().catch(() => []),
            getAllNewsSlugs().catch(() => [])
        ]);
        
        const categoryParams = categories.map((category) => ({
            slug: category.slug,
        }));
        
        const articleParams = articleSlugs.map((slug) => ({
            slug: slug,
        }));
        
        return [...categoryParams, ...articleParams];
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function DynamicPage({ params }: NewsDetailPageProps) {
    const { slug } = await params;
    
    try {

        // Check if it's an article
        const post = await getPostDetail(slug);

        const featuredArticles = await getFeaturedPosts(6);
        if (post) {
            // It's an article page
            const relatedArticlesResponse = await getRelatedPostsByCategory(
                Number(post.id),
                4
            );
            const relatedArticles = relatedArticlesResponse || [];
            
            return (
                <NewsDetailClient 
                    article={post as any}
                    relatedArticles={relatedArticles as any}
                    featuredArticles={featuredArticles as any}
                />
            );
        }

        // Neither category nor article found
        notFound();
    } catch (error) {
        console.error('Error fetching data:', error);
        notFound();
    }
}
