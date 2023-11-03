import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { INFO_BASE_URL } from 'lib/constants';
import { isLocale } from 'lib/languages';
import { InfoData } from 'lib/types';

import { SearchInfoRequest } from './info.type';

export const infoApi = createApi({
  reducerPath: 'infoApi',
  baseQuery: fetchBaseQuery({ baseUrl: INFO_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    searchInfo: builder.query<InfoData | null, SearchInfoRequest>({
      query: ({ query, language }) => {
        const locale = isLocale(language) ? language : undefined;
        return {
          url: 'search',
          params: { q: query, lang: locale },
        };
      },
    }),
  }),
});

export const { useSearchInfoQuery } = infoApi;
