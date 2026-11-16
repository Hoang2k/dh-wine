import { getSite } from '@/lib/site';

interface StructuredDataProps {
  type: 'product' | 'organization' | 'website' | 'article' | 'breadcrumb';
  data: any;
}

/** JSON-LD cho SEO; thông tin doanh nghiệp lấy từ Cài đặt website. */
export default async function StructuredData({ type, data }: StructuredDataProps) {
  const siteConfig = await getSite();
  const getStructuredData = () => {
    switch (type) {
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": `${data.producer} ${data.name}`,
          "description": data.summary,
          "category": data.category,
          "countryOfOrigin": data.country,
          "brand": { "@type": "Brand", "name": data.producer },
          "seller": { "@type": "Organization", "name": siteConfig.name }
        };
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "WholesaleStore",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "description": siteConfig.description,
          "telephone": siteConfig.contact.phone,
          "email": siteConfig.contact.email,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": siteConfig.city,
            "addressRegion": siteConfig.province,
            "addressCountry": "VN"
          },
          "areaServed": siteConfig.serviceAreas
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "description": siteConfig.description
        };
      
      case 'article':
        const siteUrl = siteConfig.url;
        return {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": data.title,
          "description": data.summary,
          "image": {
            "@type": "ImageObject",
            "url": data.thumbnailImage?.path || `${siteUrl}/icon.svg`,
            "width": 1200,
            "height": 630
          },
          "datePublished": data.publishAt,
          "dateModified": data.updatedAt || data.publishAt,
          "author": {
            "@type": "Person",
            "name": data.author?.name || siteConfig.name
          },
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.name,
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/icon.svg`,
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
          "keywords": data.category?.name ? [data.category.name, "rượu vang", siteConfig.province, siteConfig.name] : []
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items?.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `${siteConfig.url}${item.href}` : undefined
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
