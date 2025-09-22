import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ntlsvx.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-items?per_page=100`, {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    
    const dynamicPages = data.data?.map((item: any) => ({
      url: `${baseUrl}/offering/${item.id}`,
      lastModified: new Date(item.updated_at || item.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || [];

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
