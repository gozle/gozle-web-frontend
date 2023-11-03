import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { NEWS_API_BASE_URL } from 'lib/constants';

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: NEWS_API_BASE_URL }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'newsApi',
  tagTypes: [
    'Adv',
    'Breaking News',
    'Feed News',
    'Latest News',
    'Popular News',
    'Popular News Feeds',
    'Search News',
    'Weather',
  ],
});
