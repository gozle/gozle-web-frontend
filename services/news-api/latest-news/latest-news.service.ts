import { isLocale } from 'lib/languages';

import { newsApi } from '../news.api';
import { NEWS_TIMEOUT } from '../news.timeout';
import { transformNewsListResponse } from '../news.transformer';
import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from '../news.type';

import type { GetLatestNewsRequest } from './latest-news.type';

export const latestNewsApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestNews: builder.query<
      GetNewsListTransformedResponse,
      GetLatestNewsRequest
    >({
      query: ({ limit, page, language, slug }) => {
        const locale = isLocale(language) ? language : undefined;
        return {
          url: 'posts',
          params: { limit: limit || 10, page: page || 1, lang: locale, slug },
          timeout: NEWS_TIMEOUT,
        };
      },
      transformResponse: (res: GetNewsListResponse, _, req) =>
        transformNewsListResponse(res, req.limit || 10),
      providesTags: ['Latest News'],
    }),
  }),
});

export const { useGetLatestNewsQuery } = latestNewsApi;
