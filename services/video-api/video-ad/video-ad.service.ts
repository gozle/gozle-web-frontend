import { isLocale } from 'lib/languages';
import { VideoAd } from 'lib/types';
import { videoApi } from '../video.api';

import type { GetVideoAdRequest, GetVideoAdResponse } from './video-ad.type';

export const videoAdApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoAd: builder.query<VideoAd | null, GetVideoAdRequest>({
      query: ({ language }) => {
        const locale = isLocale(language) ? language : undefined;

        return {
          url: 'ad',
          params: { lang: locale },
        };
      },
      providesTags: ['Video Ad'],
      transformResponse: (res: GetVideoAdResponse | undefined) =>
        res
          ? {
              description: res.description,
              duration: res.duration,
              id: res.pk,
              landingUrl: res.link,
              thumbnailUrl: res.thumbnail_url,
              title: res.title,
              videoUrl: res.m3u8,
            }
          : null,
    }),
  }),
});

export const { useGetVideoAdQuery } = videoAdApi;
