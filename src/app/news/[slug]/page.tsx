import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    getAllNewsSlugs,
    getPostDetail,
    getRelatedPostsByCategory,
    getFeaturedPosts
} from '@/services/news';
import StructuredData from '@/components/StructuredData';
import Breadcrumbs from '@/components/Breadcrumbs';
import { siteConfig } from '@/config/site';
import RelatedArticlesList from '@/components/News/RelatedArticlesList';
import FeaturedArticlesSidebar from '@/components/News/FeaturedArticlesSidebar';
import ShareButtons from '@/components/News/ShareButtons';
import ArticleContent from '@/components/News/ArticleContent';

export const revalidate = 300; // 5 minutes

// Allow dynamic params for new articles
export const dynamicParams = true;

interface NewsDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = await getPostDetail(slug);
        if (!post) {
            return {
                title: 'Trang không tìm thấy',
                description: 'Trang bạn đang tìm kiếm không tồn tại.',
            };
        }

        const siteUrl = siteConfig.url;
        const articleUrl = `${siteUrl}/tin-tuc/${slug}`;

        return {
            title: post.title,
            description: post.summary,
            keywords: [
                post.category.name,
                post.title,
                'rượu vang',
                'Khánh Hòa',
                siteConfig.name
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
                        url: post.thumbnailImage?.path || `${siteUrl}/icon.svg`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    }
                ],
                locale: 'vi_VN',
                url: articleUrl,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.summary,
                images: [post.thumbnailImage?.path || `${siteUrl}/icon.svg`],
            },
            alternates: {
                canonical: articleUrl,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Trang không tìm thấy',
            description: 'Trang bạn đang tìm kiếm không tồn tại.',
        };
    }
}

// Generate static params for all articles at build time
export async function generateStaticParams() {
    try {
        const articleSlugs = await getAllNewsSlugs().catch(() => []);
        return articleSlugs.map((slug) => ({
            slug: slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { slug } = await params;

    try {
        // Fetch article data
        const post = await getPostDetail(slug);
        if (!post) {
            notFound();
        }

        // Fetch related data in parallel for better performance
        const [relatedArticles, featuredArticles] = await Promise.all([
            getRelatedPostsByCategory(Number(post.id), 4).catch(() => []),
            getFeaturedPosts(6).catch(() => []),
        ]);

        const siteUrl = siteConfig.url;
        const articleUrl = `${siteUrl}/tin-tuc/${slug}`;

        // Breadcrumb data
        const breadcrumbItems = [
            { label: 'Tạp chí', href: '/tin-tuc' },
            { label: post.category.name, href: `/tin-tuc/danh-muc/${post.category.slug}` },
            { label: post.title },
        ];

        return (
            <>
                {/* Structured Data for SEO */}
                <StructuredData
                    type="article"
                    data={{
                        ...post,
                        url: articleUrl,
                    }}
                />
                <StructuredData
                    type="breadcrumb"
                    data={{ items: breadcrumbItems }}
                />

                <div className="bg-ivory">
                    <div className="container-site pt-6">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    <div className="container-site pb-20 pt-6 md:pb-28">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                            {/* Social Sharing - Left Side (Desktop) */}
                            <div className="hidden lg:col-span-1 lg:block">
                                <div className="sticky top-[calc(var(--header-h)+24px)]">
                                    <ShareButtons url={articleUrl} title={post.title} layout="vertical" />
                                </div>
                            </div>

                            <div className="lg:col-span-8">
                                <ArticleContent article={post} viewCount={Number(post.view) || 0} />
                                <div className="mt-8 flex lg:hidden">
                                    <ShareButtons url={articleUrl} title={post.title} layout="horizontal" />
                                </div>
                            </div>

                            <FeaturedArticlesSidebar articles={featuredArticles} />
                        </div>

                        <div className="mt-20">
                            <RelatedArticlesList articles={relatedArticles} />
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error('Error fetching article data:', error);
        notFound();
    }
}
