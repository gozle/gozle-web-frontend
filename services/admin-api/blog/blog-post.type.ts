import type { PaginatedRequest, PaginatedResponse } from 'lib/types';

export type BlogPost = {
  createdDate: number | string;
  id: number;
  image: string;
  text: string;
  title: string;
};

export type GetBlogPostListRequest = PaginatedRequest & { languageId?: number };

export type GetBlogPostListResponse = PaginatedResponse<BlogPost>;

export type GetBlogPostOneRequest = { id: number | string; languageId: number };

export type GetBlogPostOneResponse = BlogPost;
