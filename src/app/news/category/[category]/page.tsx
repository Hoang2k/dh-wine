import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getListPosts, getListCategories, getPostsByCategorySlug } from '@/services/news';
import { IPost, NewsResponse, ICategory } from '@/types/post'; // Use NewsResponse instead
import CategoryClient from './CategoryClient';
import { IResponseData } from '@/types/common';

export const revalidate = 300;


export const dynamicParams = true;

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
        // Fetch initial data (trang đầu tiên) - sẽ được cache với ISR
        const [response, categories] = await Promise.all([
            getPostsByCategorySlug(category),
            getListCategories()
        ]);

        // Handle both array and paginated response formats
        const articles = response?.data || [];
        const meta = response?.meta || {
            page: 1,
            perPage: 20,
            total: articles.length,
            totalPages: Math.ceil(articles.length / 20)
        };
        
        // Find category name from the categories list
        const categoryData = categories.find((cat: ICategory) => cat.slug === category);
        
        return (
            <CategoryClient 
                category={category}
                initialData={{
                    articles,
                    meta,
                    categoryName: categoryData?.name || category,
                    categories
                }}
            />
        );
    } catch (error) {
        console.error('Error fetching category data:', error);
        notFound();
    }
}
