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
import RelatedArticlesList from '@/components/News/RelatedArticlesList';
import FeaturedArticlesSidebar from '@/components/News/FeaturedArticlesSidebar';
import ShareButtons from '@/components/News/ShareButtons';
import NewsDetailClient from './NewsDetailClient';

// ISR Configuration - Revalidate every 5 minutes for fresher content
// Balances between performance and data freshness
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nghiatranglietsivixuyen.vn';
    const articleUrl = `${siteUrl}/tin-tuc/${slug}`;

    return {
      title: `${post.title} - Nghĩa trang liệt sĩ Vị Xuyên`,
      description: post.summary,
      keywords: [
        post.category.name,
        post.title,
        'tin tức',
        'thông tin',
        'nghĩa trang liệt sĩ',
        'Vị Xuyên'
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
            url: post.thumbnailImage?.path || `${siteUrl}/logo-la-co-03.jpg`,
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
        images: [post.thumbnailImage?.path || `${siteUrl}/logo-la-co-03.jpg`],
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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nghiatranglietsivixuyen.vn';
    const articleUrl = `${siteUrl}/tin-tuc/${slug}`;

    // Breadcrumb data
    const breadcrumbItems = [
      { label: 'Tin tức', href: '/tin-tuc' },
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

        <div className="min-h-[100dvh] bg-white">
          {/* Breadcrumbs */}
          <div className="px-4 pt-4 max-w-6xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Article Content */}
          <div className="px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Social Sharing - Left Side (Desktop) */}
                <div className="hidden lg:block lg:col-span-1 order-1">
                  <div className="sticky top-8">
                    <ShareButtons
                      url={articleUrl}
                      title={post.title}
                      layout="vertical"
                    />
                  </div>
                </div>

                {/* Main Content + Interactions */}
                <div className="lg:col-span-8 order-2">
                  <NewsDetailClient
                    post={post}
                    initialViewCount={Number(post.view) || 0}
                    initialLikeCount={Number(post.totalLike) || 0}
                    initialHasReacted={(post as any)?.hasReacted}
                  />
                </div>

                {/* Sidebar - Featured Articles */}
                <FeaturedArticlesSidebar articles={featuredArticles} />
              </div>

              {/* Related Articles */}
              <div className="max-w-6xl mx-auto lg:pl-[calc((100%/12)*1)] lg:pr-[calc((100%/12)*3)] mt-8">
                <RelatedArticlesList articles={relatedArticles} />
              </div>

              {/* Mobile Share Buttons */}
              <div className="lg:hidden max-w-6xl mx-auto mt-8 flex justify-center">
                <ShareButtons
                  url={articleUrl}
                  title={post.title}
                  layout="horizontal"
                />
              </div>
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
