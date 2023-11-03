import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from 'lib/constants';
import { City } from 'lib/types';

import { GetCityRequest, GetCityResponse } from './city.type';

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getClosestCity: builder.query<City, GetCityRequest>({
      query: ({ lat, lon }) => ({
        url: 'getcity',
        params: { lat, lon },
      }),
      transformResponse: (response: GetCityResponse): City => response,
    }),
  }),
});

export const { useGetClosestCityQuery } = cityApi;
