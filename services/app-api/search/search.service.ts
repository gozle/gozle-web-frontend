import { isLocale } from 'lib/languages';

import { appApi } from '../app-api.api';

import type { WebSearchRequest, WebSearchResponse } from './search.type';

export const searchApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    webSearch: builder.query<WebSearchResponse, WebSearchRequest>({
      query: ({ headers, language, page, query, theme }) => {
        const locale = language && isLocale(language) ? language : undefined;

        return {
          headers,
          params: { query, page, locale, theme },
          url: 'search',
        };
      },
      providesTags: ['Search Results'],
    }),
  }),
});

export const { useWebSearchQuery } = searchApi;
