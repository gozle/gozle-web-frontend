import { videoApi } from '../video.api';
import { transformVideoListResponse } from '../video.transformer';
import type {
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

import type { GetLatestVideoRequest } from './latest-video.type';

export const latestVideoApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestVideo: builder.query<
      GetVideoListTransformedResponse,
      GetLatestVideoRequest
    >({
      query: ({ page, amount = 8 }) => ({
        url: 'laters',
        params: { page, amount },
      }),
      transformResponse: (res: GetVideoListResponse, _, req) =>
        transformVideoListResponse(res, req, 8),
      providesTags: ['Latest Videos'],
    }),
  }),
});

export const { useGetLatestVideoQuery } = latestVideoApi;
