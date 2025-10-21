import { Metadata } from 'next';
import { getListPosts, getFeaturedPosts, getListCategories, getListPostHomepage } from '@/services/news';
import NewsClient from '@/components/News/NewsClient';
import { IPost, IPostHomepage } from '@/types/post';

// ISR Configuration - revalidate every 5 minutes
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    try {
        const categories = await getListCategories();
        const categoryNames = categories.map(cat => cat.name).join(', ');
        
        return {
            title: 'Tin tức mới nhất - Cập nhật thông tin hàng ngày',
            description: `Tin tức mới nhất về ${categoryNames}. Cập nhật thông tin nhanh chóng và chính xác về các sự kiện, tin tức trong và ngoài tỉnh.`,
            keywords: [
                'tin tức',
                'tin tức mới nhất',
                'thông tin',
                'sự kiện',
                'cập nhật',
                ...categories.map(cat => cat.name)
            ],
            openGraph: {
                title: 'Tin tức mới nhất - Cập nhật thông tin hàng ngày',
                description: `Tin tức mới nhất về ${categoryNames}. Cập nhật thông tin nhanh chóng và chính xác.`,
                type: 'website',
                locale: 'vi_VN',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Tin tức mới nhất - Cập nhật thông tin hàng ngày',
                description: `Tin tức mới nhất về ${categoryNames}. Cập nhật thông tin nhanh chóng và chính xác.`,
            },
            alternates: {
                canonical: '/news',
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Tin tức mới nhất',
            description: 'Tin tức mới nhất và cập nhật thông tin hàng ngày',
        };
    }
}

// Server-side data fetching for better SEO
export default async function NewsPage() {
    let initialData: {
        heroPost: IPost;
        latest: IPost[];
        featuredArticles: any[];
        categories: any[];
    } = {
        heroPost: {} as IPost,
        latest: [],
        featuredArticles: [],
        categories: []
    };

    try {
        // Fetch data in parallel for better performance
        const [listPosts, listCategories] = await Promise.all([
            getListPostHomepage() as Promise<IPostHomepage>,
            getListCategories()
        ]);

        console.log('listPosts', listPosts);

        const heroPost = listPosts?.hero || [];
        const featuredPosts = listPosts?.featured || [];
        const latestPosts = listPosts?.latest || [];
        initialData = {
            heroPost: heroPost,
            featuredArticles: featuredPosts,
            latest: latestPosts.data,
            categories: listCategories || []
        };


    } catch (error) {
        console.error('Error fetching initial data:', error);
        // Continue with empty data - component will handle loading states
    }

    return <NewsClient initialData={initialData} />;
}
