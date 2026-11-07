import { MetadataRoute } from 'next'
import { getAllNewsSlugs, getListCategories } from '@/services/news'
import { getAllWineSlugs } from '@/services/wine'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/san-pham`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giai-phap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/bao-gia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const productPages: MetadataRoute.Sitemap = getAllWineSlugs().map((slug) => ({
    url: `${baseUrl}/san-pham/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic pages - fetch from API
  try {
    // Fetch news articles
    const newsSlugs = await getAllNewsSlugs();
    const newsPages = newsSlugs.map((slug) => ({
      url: `${baseUrl}/tin-tuc/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Fetch categories
    const categories = await getListCategories();
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/tin-tuc/danh-muc/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...newsPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [...staticPages, ...productPages];
  }
}
