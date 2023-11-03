import { isLocale } from 'lib/languages';
import type { AdvData } from 'lib/types';

import { newsApi } from '../news.api';

import type { GetAdvRequest, GetAdvResponse } from './adv.type';

export const advApi = newsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdv: builder.query<AdvData | null, GetAdvRequest>({
      query: ({ language }) => {
        const locale = isLocale(language) ? language : undefined;
        return { url: 'ads', params: { lang: locale } };
      },
      transformResponse: (res: GetAdvResponse): AdvData | null =>
        res && res.length
          ? {
              img: res[0].images_url,
              title: res[0].title,
              description: res[0].description,
              src: {
                link: res[0].site_url,
              },
            }
          : null,
      providesTags: ['Adv'],
    }),
  }),
});

export const { useGetAdvQuery } = advApi;
