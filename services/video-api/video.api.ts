import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { VIDEO_BASE_URL } from 'lib/constants';

export const videoApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: VIDEO_BASE_URL }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'videoApi',
  tagTypes: [
    'Category Videos',
    'Channel Videos',
    'Channels',
    'Latest Videos',
    'Popular Videos',
    'Search Videos',
    'Video',
    'Video Ad',
  ],
});
