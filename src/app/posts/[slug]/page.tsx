// src/app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import React from 'react';
import { getListPosts, getPostDetail } from '@/services/user';
import PostDetail from '@/components/PostDetail';
import { Post } from '@/types/post';

type PageParams = Promise<{
  slug: string;
}>

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    // Fetch post data để tạo metadata
    const postData = await getPostDetail(resolvedParams.slug);
    const post: Post = postData.data || postData;
    
    return {
      title: post.title,
      description: post.body.substring(0, 160) + (post.body.length > 160 ? '...' : ''),
      keywords: post.tags.join(', '), // Để search engines hiểu content
      openGraph: {
        title: post.title,
        description: post.body.substring(0, 160) + (post.body.length > 160 ? '...' : ''),
        type: 'article',
        url: `/posts/${resolvedParams.slug}`,
        siteName: 'Your Site Name',
      }, //Để social media hiển thị preview đẹp
      twitter: {
        card: 'summary',
        title: post.title,
        description: post.body.substring(0, 160) + (post.body.length > 160 ? '...' : ''),
      }, //Để Twitter cards hoạt động
      alternates: {
        canonical: `/posts/${resolvedParams.slug}`,
      }, //Để tránh duplicate content
    };
  } catch (error) {
    // Fallback metadata nếu không fetch được data
    return {
      title: `Bài viết ${resolvedParams.slug}`,
      description: 'Đọc bài viết chi tiết tại đây',
    };
  }
}

export async function generateStaticParams() {
  try {
    const allPosts = await getListPosts();
    return allPosts.posts.slice(0, 10).map((post: any) => ({
      slug: post.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// SEO-optimized page component
export default async function PostPage(props: {params: PageParams}) {
  const resolvedParams = await props.params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD structured data cho SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `Bài viết ${resolvedParams.slug}`,
            "url": `/posts/${resolvedParams.slug}`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `/posts/${resolvedParams.slug}`,
            },
          }),
        }}
      />
      
      {/* Client-side component sử dụng TanStack Query */}
      <PostDetail postId={resolvedParams.slug} />
    </div>
  );
}
