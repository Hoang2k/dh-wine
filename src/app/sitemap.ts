import { MetadataRoute } from 'next'
import { getAllNewsSlugs, getListCategories } from '@/services/news'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nghiatranglietsivixuyen.vn'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/offering`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/book-visit`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic pages - fetch from API
  try {
    // Fetch news articles
    const newsSlugs = await getAllNewsSlugs();
    const newsPages = newsSlugs.map((slug) => ({
      url: `${baseUrl}/news/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Fetch categories
    const categories = await getListCategories();
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/news/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...newsPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
