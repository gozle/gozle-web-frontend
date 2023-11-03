import type { GetVideoListRequestPagination } from '../video.type';

export type SearchVideoRequest = GetVideoListRequestPagination & {
  query: string;
};
