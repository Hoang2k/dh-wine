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
            title: 'Tạp chí rượu vang',
            description: `Kiến thức, xu hướng và câu chuyện rượu vang${categoryNames ? `: ${categoryNames}` : ''}.`,
            keywords: [
                'rượu vang',
                'kiến thức rượu vang',
                'xu hướng rượu vang',
                ...categories.map(cat => cat.name)
            ],
            openGraph: {
                title: 'Tạp chí rượu vang',
                description: `Kiến thức, xu hướng và câu chuyện rượu vang${categoryNames ? `: ${categoryNames}` : ''}.`,
                type: 'website',
                locale: 'vi_VN',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Tạp chí rượu vang',
                description: `Kiến thức, xu hướng và câu chuyện rượu vang${categoryNames ? `: ${categoryNames}` : ''}.`,
            },
            alternates: {
                canonical: '/tin-tuc',
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Tạp chí rượu vang',
            description: 'Kiến thức, xu hướng và câu chuyện rượu vang.',
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
