import { VIDEO_BASE_URL } from 'lib/constants';
import type { VideoMenuItem } from 'lib/types';
import { videoApi } from '../video.api';

import type {
  GetVideoByIdRequest,
  GetVideoByIdResponse,
  GetVideoByIdTransformedResponse,
  GetVideoMenuItemsRequest,
  GetVideoMenuItemsResponse,
} from './video.type';

export const mainVideoApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoById: builder.query<
      GetVideoByIdTransformedResponse,
      GetVideoByIdRequest
    >({
      query: ({ id }) => `video/${id}`,
      transformResponse: (res: GetVideoByIdResponse) =>
        res
          ? {
              id: res.pk,
              title: res.title,
              description: res.description,
              views: res.view,
              duration: res.duration,
              m3u8: res.m3u8,
              thumbnail: res.thumbnail_url,
              categories: res.category,
              timestamp: +new Date(res.date),
              src: {
                id: +res.channel_id,
                name: res.channel_name,
                icon: res.channel_url,
              },
            }
          : null,
      providesTags: ['Video'],
    }),
  }),
});

export const { useGetVideoByIdQuery } = mainVideoApi;

export const getVideoMenuItems = async ({
  language,
}: GetVideoMenuItemsRequest): Promise<VideoMenuItem[]> => {
  const res = await fetch(`${VIDEO_BASE_URL}/icons?lang=${language}`);
  if (res.status === 200) {
    const data: GetVideoMenuItemsResponse = await res.json();
    if (data.length) {
      const presentedData: VideoMenuItem[] = data.map((el) => ({
        id: +el.pk || 0,
        name: el.category_name || '',
        slug: el.category_slug || '',
        icon: el.category_icon || '',
      }));
      return presentedData.filter((el) => el.id);
    }
  }
  return [];
};
