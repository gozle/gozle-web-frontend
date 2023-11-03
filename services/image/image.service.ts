import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { APP_URL } from 'lib/constants';

import { ImageSearchRequest, ImageSearchResponse } from './image.type';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: `${APP_URL}/api` })),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    imageSearch: builder.query<ImageSearchResponse, ImageSearchRequest>({
      query: ({ query, page }) => {
        return {
          url: 'images/search',
          params: { query, page },
        };
      },
    }),
  }),
});

export const { useImageSearchQuery } = imageApi;
