import type { VideoChannelData } from 'lib/types';

import type {
  GetVideoListRequestPagination,
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from '../video.type';

export type GetVideoByChannelRequest = GetVideoListRequestPagination & {
  id: number | string;
  sort: 'date' | 'views' | 'random';
  order: 'asc' | 'desc';
};

export type ChannelListResponseItem = {
  pk: number;
  name: string;
  channel_avatar: string | null;
  view: number;
  channel_banner: string | null;
};

export type GetVideoChannelsRequest = GetVideoListRequestPagination & {
  query?: string;
};

export type GetVideoChannelsResponse =
  GetVideoListResponse<ChannelListResponseItem>;

export type GetVideoChannelsTransformedResponse =
  GetVideoListTransformedResponse<VideoChannelData>;

export type GetVideoChannelByIdRequest = { id: number | string };

export type GetVideoChannelByIdResponse = ChannelListResponseItem;

export type GetVideoChannelByIdTransformedResponse = {
  status: number;
  data?: VideoChannelData | null;
};
