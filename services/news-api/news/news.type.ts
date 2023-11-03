import type { NewsExtendedData } from 'lib/types';

export type GetNewsByIdRequest = { id: number | string; language: string };

export type GetNewsByIdResponse = {
  post_id: number;
  post_category_id: number;
  post_feed_id: number;
  post_title: string;
  post_author: string;
  post_content: string;
  post_excerpt: string;
  post_featured_image: string;
  post_type: string;
  post_source: string;
  post_hits: number;
  post_likes: number;
  post_pubdate: number;
  created_at: number;
  updated_at: number;
  is_image_downloaded: number;
  is_title_cleared: number;
  post_category_slug: string;
  post_feed_name: string;
  post_feed_logo_url: string;
};

export type GetNewsByIdTransformedResponse = {
  status: number;
  data?: NewsExtendedData;
};
