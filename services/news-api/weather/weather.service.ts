import { isLocale } from 'lib/languages';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { WeatherData } from 'lib/types';

import { newsApi } from '../news.api';

import type { GetWeatherRequest, GetWeatherResponse } from './weather.type';

export const weatherApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, GetWeatherRequest>({
      query: ({ lat, lon, language }) => {
        const tz = tunedDayjs.tz.guess();
        const locale = isLocale(language) ? language : undefined;
        return {
          url: 'weather',
          params: {
            lat,
            lon,
            tz,
            lang: locale,
          },
        };
      },
      transformResponse: (response: GetWeatherResponse): WeatherData => ({
        ...response,
        city: 'Ashgabat',
      }),
      providesTags: ['Weather'],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
