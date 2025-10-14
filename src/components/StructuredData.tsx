interface StructuredDataProps {
  type: 'product' | 'organization' | 'website' | 'article' | 'breadcrumb';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.imageMedia?.path,
          "offers": {
            "@type": "Offer",
            "price": data.unitPrice || data.minPrice,
            "priceCurrency": "VND",
            "availability": "https://schema.org/InStock"
          },
          "brand": {
            "@type": "Brand",
            "name": "Nghĩa trang liệt sĩ Vị Xuyên"
          }
        };
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nghĩa trang liệt sĩ Vị Xuyên",
          "url": "https://ntlsvx.com",
          "logo": "https://ntlsvx.com/logo-la-co-03.jpg",
          "description": "Nghĩa trang liệt sĩ Vị Xuyên - Nơi tưởng niệm các anh hùng liệt sĩ"
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Nghĩa trang liệt sĩ Vị Xuyên",
          "url": "https://ntlsvx.com",
          "description": "Website chính thức của nghĩa trang liệt sĩ Vị Xuyên"
        };
      
      case 'article':
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nghiatranglietsivixuyen.vn';
        return {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": data.title,
          "description": data.summary,
          "image": {
            "@type": "ImageObject",
            "url": data.thumbnailImage?.path || `${siteUrl}/logo-la-co-03.jpg`,
            "width": 1200,
            "height": 630
          },
          "datePublished": data.publishAt,
          "dateModified": data.updatedAt || data.publishAt,
          "author": {
            "@type": "Person",
            "name": data.author?.name || "Nghĩa trang liệt sĩ Vị Xuyên"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Nghĩa trang liệt sĩ Vị Xuyên",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/logo-la-co-03.jpg`,
              "width": 600,
              "height": 60
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url || `${siteUrl}/tin-tuc/${data.slug}`
          },
          "articleSection": data.category?.name,
          "inLanguage": "vi-VN",
          // SEO Enhancement: Add engagement metrics (crawlable from server)
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/LikeAction",
              "userInteractionCount": data.totalLike || 0
            },
            {
              "@type": "InteractionCounter", 
              "interactionType": "https://schema.org/ViewAction",
              "userInteractionCount": data.view || 0
            }
          ],
          // Word count for content quality signals
          "wordCount": data.content ? data.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0,
          // Keywords for topical relevance
          "keywords": data.category?.name ? [data.category.name, "tin tức", "Vị Xuyên", "nghĩa trang liệt sĩ"] : []
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `https://nghiatranglietsivixuyen.vn${item.href}` : undefined
          })) || []
        };
      
      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
