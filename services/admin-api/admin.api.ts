import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { ADMIN_BASE_URL } from 'lib/constants';

export const adminApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_BASE_URL }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'adminApi',
  tagTypes: ['Languages'],
});
