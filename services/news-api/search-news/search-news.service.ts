import { newsApi } from '../news.api';
import { NEWS_TIMEOUT } from '../news.timeout';
import { transformNewsListResponse } from '../news.transformer';
import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from '../news.type';

import type { SearchNewsRequest } from './search-news.type';

export const searchNewsApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    searchNews: builder.query<
      GetNewsListTransformedResponse,
      SearchNewsRequest
    >({
      query: ({ query, page, limit }) => ({
        url: 'search',
        params: { limit: limit || 10, page, q: query, type: 'latest' },
        timeout: NEWS_TIMEOUT,
      }),
      transformResponse: (res: GetNewsListResponse, _, req) =>
        transformNewsListResponse(res, req.limit || 10),
      providesTags: ['Search News'],
    }),
  }),
});

export const { useSearchNewsQuery } = searchNewsApi;
