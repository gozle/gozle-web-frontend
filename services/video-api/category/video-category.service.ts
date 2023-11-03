import { VIDEO_BASE_URL } from 'lib/constants';
import type { VideoCategory } from 'lib/types';

import { videoApi } from '../video.api';
import { transformVideoListResponse } from '../video.transformer';
import type {
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

import type {
  GetVideoByCategoryRequest,
  GetVideoCategoriesRequest,
  GetVideoCategoriesResponse,
} from './video-category.type';

export const videoCategoryApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoByCategory: builder.query<
      GetVideoListTransformedResponse,
      GetVideoByCategoryRequest
    >({
      query: ({ id, page, amount = 8 }) => ({
        url: 'video-by-category',
        params: { pk: id, page, amount },
      }),
      transformResponse: (res: GetVideoListResponse, _, req) =>
        transformVideoListResponse(res, req, 8),
      providesTags: ['Category Videos'],
    }),
  }),
});

export const { useGetVideoByCategoryQuery } = videoCategoryApi;

export const getVideoCategories = async ({
  language,
}: GetVideoCategoriesRequest): Promise<VideoCategory[]> => {
  const res = await fetch(`${VIDEO_BASE_URL}/category?lang=${language}`);
  if (res.status === 200) {
    const data: GetVideoCategoriesResponse = await res.json();
    if (data.length) {
      const presentedData: VideoCategory[] = data.map((el) => ({
        id: +el.pk || 0,
        name: el.verbose || '',
        slug: el.name || '',
      }));
      return presentedData.filter((el) => el.id);
    }
  }
  return [];
};
