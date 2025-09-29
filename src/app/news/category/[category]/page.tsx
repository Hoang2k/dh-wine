import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getListPosts, getListCategories } from '@/services/news';
import NewsClient from '@/components/News/NewsClient';

// ISR Configuration - revalidate every 5 minutes
export const revalidate = 300;

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

// Generate metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    
    try {
        const categories = await getListCategories();
        const categoryData = categories.find(cat => cat.slug === category);
        
        if (!categoryData) {
            return {
                title: 'Danh mục không tìm thấy',
                description: 'Danh mục bạn đang tìm kiếm không tồn tại.',
            };
        }

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
                canonical: `/news/category/${category}`,
            },
        };
    } catch (error) {
        console.error('Error generating metadata for category:', error);
        return {
            title: 'Danh mục không tìm thấy',
            description: 'Danh mục bạn đang tìm kiếm không tồn tại.',
        };
    }
}

// Generate static params for all categories
export async function generateStaticParams() {
    try {
        const categories = await getListCategories();
        return categories.map((category) => ({
            category: category.slug,
        }));
    } catch (error) {
        console.error('Error generating static params for categories:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    
    try {
        // Fetch category data and articles
        const [categories, articlesResponse] = await Promise.all([
            getListCategories(),
            getListPosts({ category: category, per_page: 20 })
        ]);

        const categoryData = categories.find(cat => cat.slug === category);
        
        if (!categoryData) {
            notFound();
        }

        const articles = Array.isArray(articlesResponse) ? articlesResponse : articlesResponse?.data || [];

        const initialData = {
            articles,
            featuredArticles: articles.slice(0, 6), // First 6 articles as featured
            categories
        };

        return <NewsClient initialData={initialData} />;
    } catch (error) {
        console.error('Error fetching category data:', error);
        notFound();
    }
}
