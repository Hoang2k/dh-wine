

export interface TPost {
    id: string;
    title: string;
    content: string;
    summary: string;
    slug: string;
    status: number;
    publishedAt: string;
    authorId: number;
    source: string;
    categoryId: number;
    thumbnailImageId: number;
    thumbnailVideoId: number;
    createdAt: string;
    updatedAt: string;
}

export interface IPostHomepage {
    hero: IPost,
    featured: IPost[],
    latest: {
        data: IPost[],
        meta: {
            page: number,
            perPage: number,
            total: number,
            totalPages: number,
        },
    },
}

export interface PostReactions {
    likes: number;
    dislikes: number;
  }
  
  export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: PostReactions;
    views: number;
    userId: number;
  }
  
  export interface PostDetailResponse {
    data: Post;
    message: string;
    status: string;
  } 

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