import type { PaginatedResponse, VideoData } from 'lib/types';

export type GetVideoListResponseItem = {
  channel_id: number;
  channel_name: string;
  channel_url: string | null;
  date: string;
  duration: number | null;
  m3u8: string;
  pk: number;
  thumbnail_url: string;
  title: string;
  view: number;
};

export type GetVideoListRequestPagination = { page: number; amount?: number };

export type GetVideoListResponse<T = GetVideoListResponseItem> = {
  count: number;
  next: null;
  previous: null;
  results: T[];
};

export type GetVideoListTransformedResponse<T = VideoData> =
  PaginatedResponse<T> | null;
