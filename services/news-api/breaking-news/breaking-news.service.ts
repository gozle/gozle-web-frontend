import { isLocale } from 'lib/languages';

import { newsApi } from '../news.api';
import { NEWS_TIMEOUT } from '../news.timeout';
import { transformNewsListResponse } from '../news.transformer';
import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from '../news.type';

import type { GetBreakingNewsRequest } from './breaking-news.type';

export const breakingNewsApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getBreakingNews: builder.query<
      GetNewsListTransformedResponse,
      GetBreakingNewsRequest
    >({
      query: ({ language, slug }) => {
        const locale = isLocale(language) ? language : undefined;
        return {
          url: 'posts',
          params: { limit: 5, lang: locale, slug },
          timeout: NEWS_TIMEOUT,
        };
      },
      transformResponse: (res: GetNewsListResponse) =>
        transformNewsListResponse(res),
      providesTags: ['Breaking News'],
    }),
  }),
});

export const { useGetBreakingNewsQuery } = breakingNewsApi;
