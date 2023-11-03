import { videoApi } from '../video.api';
import { transformVideoListResponse } from '../video.transformer';
import type {
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

import type { GetPopularVideoRequest } from './popular-video.type';

export const popularVideoApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularVideo: builder.query<
      GetVideoListTransformedResponse,
      GetPopularVideoRequest
    >({
      query: ({ page, amount = 8 }) => ({
        url: 'popular',
        params: { time: 2, page, amount },
      }),
      transformResponse: (res: GetVideoListResponse, _, req) =>
        transformVideoListResponse(res, req, 8),
      providesTags: ['Popular Videos'],
    }),
  }),
});

export const { useGetPopularVideoQuery } = popularVideoApi;
