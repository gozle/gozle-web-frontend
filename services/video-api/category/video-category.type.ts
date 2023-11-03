import type { GetVideoListRequestPagination } from '../video.type';

export type GetVideoByCategoryRequest = GetVideoListRequestPagination & {
  id: number | string;
};

export type GetVideoCategoriesRequest = { language: string };

export type GetVideoCategoriesResponse = {
  pk: number;
  name: string;
  verbose: string;
}[];
