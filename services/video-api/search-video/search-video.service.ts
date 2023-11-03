import { videoApi } from '../video.api';
import { transformVideoListResponse } from '../video.transformer';
import type {
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

import type { SearchVideoRequest } from './search-video.type';

export const searchVideoApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    searchVideo: builder.query<
      GetVideoListTransformedResponse,
      SearchVideoRequest
    >({
      query: ({ query, page, amount = 12 }) => ({
        url: 'search',
        params: { q: query, page, amount },
      }),
      transformResponse: (res: GetVideoListResponse, _, req) =>
        transformVideoListResponse(res, req, 12),
      providesTags: ['Search Videos'],
    }),
  }),
});

export const { useSearchVideoQuery } = searchVideoApi;
