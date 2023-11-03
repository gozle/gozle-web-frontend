import { isLocale } from 'lib/languages';
import type { NewsFeed } from 'lib/types';

import { newsApi } from '../news.api';
import { NEWS_TIMEOUT } from '../news.timeout';
import { transformNewsListResponse } from '../news.transformer';
import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from '../news.type';

import type {
  GetNewsByFeedRequest,
  GetNewsPopularFeedsRequest,
  GetNewsPopularFeedsResponse,
} from './news-feed.type';

export const newsFeedApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsByFeed: builder.query<
      GetNewsListTransformedResponse,
      GetNewsByFeedRequest
    >({
      query: ({ id, page, lang, limit }) => {
        const locale = isLocale(lang) ? lang : undefined;
        return {
          url: 'feed',
          params: { limit: limit || 10, page: page || 1, lang: locale, id },
          timeout: NEWS_TIMEOUT,
        };
      },
      transformResponse: (res: GetNewsListResponse, _, req) =>
        transformNewsListResponse(res, req.limit || 10),
      providesTags: ['Feed News'],
    }),
    getNewsPopularFeeds: builder.query<
      NewsFeed[] | null,
      GetNewsPopularFeedsRequest
    >({
      query: ({ lang }) => {
        const locale = isLocale(lang) ? lang : undefined;
        return {
          url: 'popular-feeds',
          params: { lang: locale },
          timeout: NEWS_TIMEOUT,
        };
      },
      transformResponse: (res: GetNewsPopularFeedsResponse) =>
        res
          ? res.map((el) => ({
              id: +el.feed_id || 0,
              name: el.feed_name || '',
              icon: el.feed_logo_url || '',
              total: parseInt(el.TOTAL) || 0,
            }))
          : null,
      providesTags: ['Popular News Feeds'],
    }),
  }),
});

export const { useGetNewsByFeedQuery, useGetNewsPopularFeedsQuery } =
  newsFeedApi;
