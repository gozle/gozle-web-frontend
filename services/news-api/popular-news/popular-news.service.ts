import { isLocale } from 'lib/languages';

import { newsApi } from '../news.api';
import { NEWS_TIMEOUT } from '../news.timeout';
import { transformNewsListResponse } from '../news.transformer';
import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from '../news.type';

import type { GetPopularNewsRequest } from './popular-news.type';

export const popularNewsApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularNews: builder.query<
      GetNewsListTransformedResponse,
      GetPopularNewsRequest
    >({
      query: ({ page, language }) => {
        const locale = isLocale(language) ? language : undefined;
        return {
          url: 'popular',
          params: { time: 'day', page, lang: locale },
          timeout: NEWS_TIMEOUT,
        };
      },
      transformResponse: (res: GetNewsListResponse) =>
        transformNewsListResponse(res),
      providesTags: ['Popular News'],
    }),
  }),
});

export const { useGetPopularNewsQuery } = popularNewsApi;
