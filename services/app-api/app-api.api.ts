import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { APP_URL } from 'lib/constants';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api` }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'appApi',
  tagTypes: ['Search Results'],
});
