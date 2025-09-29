// News service for handling news-related API calls
import request from '@/axios'
import { IResponseData } from '@/types/common';


export interface IMedia {
  id: string;
  kind: number;
  path: string;
  altText: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  publishAt: string;
  views: number;
  category: ICategory;
  thumbnailImage?: IMedia;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  data: IPost[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// Cache configuration (these are hints you send to your API;
// real caching depends on API/server or Next.js fetch options)
const CACHE_DURATION = 300;     // 5 minutes
const STATIC_CACHE_DURATION = 3600; // 1 hour for static content

const emptyResponse = (overrides?: Partial<NewsResponse>): NewsResponse => ({
  data: [],
  meta: { page: 1, perPage: 0, total: 0, totalPages: 0 },
  ...overrides,
});

export const getListCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await request.get<IResponseData<ICategory[]>>({
      url: '/client/categories',
      headers: { 'Cache-Control': `max-age=${CACHE_DURATION}` },
    });
    return response?.data ?? [];
  } catch (error) {
    console.error('Error fetching news categories:', error);
    return [];
  }
};

type GetNewsParams = {
  category?: string;
  page?: number;
  per_page?: number;
  search?: string;
  featured?: boolean;
};

export const getListPosts = async (params?: GetNewsParams): Promise<IResponseData<IPost[]> | IPost[]> => {
  try {
    const queryParams: Record<string, any> = {};
    if (params?.category) queryParams.category = params.category;
    if (params?.page) queryParams.page = params.page;
    if (params?.per_page) queryParams.per_page = params.per_page;
    if (params?.search) queryParams.search = params.search;
    if (params?.featured !== undefined) queryParams.featured = params.featured;

    const response = await request.get<IResponseData<IPost[]>>({
      url: '/client/posts',
      params: queryParams,
      headers: { 'Cache-Control': `max-age=${CACHE_DURATION}` },
    });

    // Ensure a stable shape even if API misbehaves
    return response.data || [];
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return emptyResponse();
  }
};

export const getPostDetail = async (slug: string): Promise<IPost | null> => {
  try {
    const response = await request.get<IPost>({
      url: `/client/posts/slug/${slug}`,
      headers: { 'Cache-Control': `max-age=${STATIC_CACHE_DURATION}` },
    });
    return response ?? null;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
};

export const getFeaturedPosts = async (limit = 6): Promise<IPost[]> => {
  try {
    const res = await getListPosts({ featured: true, per_page: limit });
    return Array.isArray(res) ? res : res?.data || [];
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};


/**
 * For static generation (ISR/SSG)
 * NOTE: If your API paginates, consider looping pages until totalPages.
 */
export const getAllNewsSlugs = async (): Promise<string[]> => {
  try {
    const res = await getListPosts({ per_page: 1000 });
    return Array.isArray(res) ? res.map(a => a.slug) : res?.data?.map(a => a.slug) || [];
  } catch (error) {
    console.error('Error fetching all news slugs:', error);
    return [];
  }
};

/**
 * Get related posts by category
 * @param postId 
 * @param limit 
 * @returns 
 */
export const getRelatedPostsByCategory = async (postId: number, limit = 4): Promise<IPost[]> => {
    try {
        const response = await request.get<IPost[]>({
          url: `/client/posts/related`,
          params: {
            postId: Number(postId),
            limit: limit,
          },
        });

        return response;
      } catch (error) {
        console.error('Error fetching related posts by category:', error);
        return [];
      }
};