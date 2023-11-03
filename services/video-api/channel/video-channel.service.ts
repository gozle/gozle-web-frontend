import { VIDEO_BASE_URL } from 'lib/constants';
import type { VideoChannelData } from 'lib/types';

import { videoApi } from '../video.api';
import { transformVideoListResponse } from '../video.transformer';
import type {
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

import type {
  GetVideoByChannelRequest,
  GetVideoChannelByIdRequest,
  GetVideoChannelByIdResponse,
  GetVideoChannelByIdTransformedResponse,
  GetVideoChannelsRequest,
  GetVideoChannelsResponse,
  GetVideoChannelsTransformedResponse,
} from './video-channel.type';

export const videoChannelApi = videoApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoByChannel: builder.query<
      GetVideoListTransformedResponse,
      GetVideoByChannelRequest
    >({
      query: ({ id, ...params }) => ({
        url: `video-by-channel/${id}`,
        params: { amount: 5, ...params },
      }),
      transformResponse: (res: GetVideoListResponse, _, req) =>
        transformVideoListResponse(res, req, 5),
      providesTags: ['Channel Videos'],
    }),
    getVideoChannels: builder.query<
      GetVideoChannelsTransformedResponse,
      GetVideoChannelsRequest
    >({
      query: ({ page, amount = 60, query }) => ({
        url: 'channels',
        params: { page, amount, query },
      }),
      transformResponse: (res: GetVideoChannelsResponse, _, req) => ({
        data: res.results.map((el) => ({
          id: el.pk,
          name: el.name,
          avatar: el.channel_avatar,
          views: el.view,
          banner: el.channel_banner,
        })),
        pagination: {
          currentPage: req.page,
          itemsPerPage: req.amount || 60,
          totalItems: res.count,
          totalPages: Math.ceil(res.count / (req.amount || 60)),
        },
      }),
      providesTags: ['Channels'],
    }),
  }),
});

export const { useGetVideoByChannelQuery, useGetVideoChannelsQuery } =
  videoChannelApi;

export const getVideoChannelById = async ({
  id,
}: GetVideoChannelByIdRequest): Promise<GetVideoChannelByIdTransformedResponse> => {
  const res = await fetch(`${VIDEO_BASE_URL}/channel?pk=${id}`);
  if (res.status === 200) {
    const data: GetVideoChannelByIdResponse = await res.json();
    if (data) {
      const presentedData: VideoChannelData | null = {
        id: data.pk,
        name: data.name,
        avatar: data.channel_avatar,
        views: data.view,
        banner: data.channel_banner,
      };
      return { status: res.status, data: presentedData };
    }
  }
  return { status: res.status };
};
