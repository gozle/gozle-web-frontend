import type { NewsBaseData, PaginatedResponse } from 'lib/types';

export type GetNewsListResponseItem = {
  post_id: number;
  post_category_id: number;
  post_category_slug: string;
  post_feed_name: string;
  post_feed_logo_url: string;
  post_title: string;
  post_excerpt: string;
  post_hits: number;
  post_featured_image: string;
  post_source: string;
  post_pubdate: number;
  created_at: number;
};

export type GetNewsListResponse<T = GetNewsListResponseItem> = {
  data: T[];
  page: number;
  allPage: number;
};

export type GetNewsListTransformedResponse<T = NewsBaseData> =
  PaginatedResponse<T> | null;
