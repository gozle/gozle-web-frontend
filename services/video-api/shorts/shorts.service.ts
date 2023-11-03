import { videoApi } from '../video.api';
import type { GetVideoListResponseItem } from '../video.type';

import type { GetShortsRequest, GetShortsResponse } from './shorts.type';

export const shortsApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getShorts: builder.query<GetShortsResponse, GetShortsRequest>({
      query: () => ({ url: 'shorts' }),
      transformResponse: (res: GetVideoListResponseItem[]) =>
        res
          ? res.map((el) => ({
              id: el.pk,
              title: el.title,
              views: el.view,
              duration: el.duration,
              m3u8: el.m3u8,
              thumbnail: el.thumbnail_url,
              timestamp: +new Date(el.date),
              src: {
                id: el.channel_id,
                name: el.channel_name,
                icon: el.channel_url,
              },
            }))
          : [],
      providesTags: ['Latest Videos'],
    }),
  }),
});

export const { useGetShortsQuery } = shortsApi;
