import request from '@/axios'
import { IResponseData } from '@/types/common';
import { ICategory, IPost, IPostHomepage, NewsResponse, ReactToPostResponse } from '@/types/post';


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
  isFeatured?: number;
};

export const getListPosts = async (params?: GetNewsParams): Promise<IPost[]> => {
  try {
    const queryParams: Record<string, any> = {};
    if (params?.category) queryParams.category = params.category;
    if (params?.page) queryParams.page = params.page;
    if (params?.per_page) queryParams.per_page = params.per_page;
    if (params?.search) queryParams.search = params.search;
    if (params?.isFeatured !== undefined) queryParams.isFeatured = params.isFeatured;

    const response = await request.get<IResponseData<IPost[]>>({
      url: '/client/posts',
      params: queryParams,
      headers: { 'Cache-Control': `max-age=${CACHE_DURATION}` },
    });

    // Ensure a stable shape even if API misbehaves
    return response.data || [];
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
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
    const res = await getListPosts({ isFeatured: 1, per_page: limit });
    return res;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};


/**
 * For static generation (ISR/SSG)
 */
export const getAllNewsSlugs = async (): Promise<string[]> => {
  try {
    const res = await getListPosts({ per_page: 1000 });
    return res.map((a: IPost) => a.slug);
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

export const getListPostHomepage = async (limit = 20): Promise<IPostHomepage> => {
  try {
    const response = await request.get<IPostHomepage>({
      url: '/client/posts/homepage',
      params: { limit: limit },
    });

    return response;
  } catch (error) {
    console.error('Error fetching list post homepage:', error);
    return {
      hero: {} as IPost,
      featured: [] as IPost[],
      latest: {
        data: [] as IPost[],
        meta: {
          page: 1,
          perPage: 0,
          total: 0,
          totalPages: 0,
        },
      },
    };
  }
};

export const getPostsByCategorySlug = async (slug: string): Promise<NewsResponse> => {
  try {
    const response = await request.get<NewsResponse>({
      url: `/client/posts/category/${slug}`,
    });
    return response;
  }
  catch (error) {
    console.error('Error fetching posts by category slug:', error);
    return emptyResponse();
  }
}

// React to a post (like/dislike)
export const reactToPost = async (postId: number, reaction: boolean): Promise<{totalLike: number}> => {
  try {
    const response = await request.post<ReactToPostResponse>({
      url: '/client/posts/react',
      data: { postId, reaction },
    });
    return { totalLike: response.totalLike };
  } catch (error) {
    console.error('Error reacting to post:', error);
    return { totalLike: 0 };
  }
}

// Get total like count for a post (hasReacted handled by frontend localStorage)
export const getPostLikeStatus = async (postId: number): Promise<{totalLike: number}> => {
  try {
    const response = await request.get<{totalLike: number}>({
      url: `/client/posts/${postId}/total-like`,
    });
    return { totalLike: response.totalLike };
  } catch (error) {
    console.error('Error fetching post like count:', error);
    return { totalLike: 0 };
  }
}

export const postView = async (postId: number): Promise<{view: number}> => {
  try {
    const response = await request.post({
      url: `/client/posts/${postId}/view`,
      data: {id: postId},
    },)

    return { view: response.view };
  } catch(error) {
    console.log(error);
    return { view: 0 };
  }
}