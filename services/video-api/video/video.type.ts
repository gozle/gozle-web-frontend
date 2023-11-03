import type { VideoExtendedData } from 'lib/types';

import type { GetVideoListResponseItem } from '../video.type';

export type GetVideoByIdRequest = { id: number | string };

export type GetVideoByIdResponse = GetVideoListResponseItem & {
  category: number[];
  description: string;
  m3u8: string;
};

export type GetVideoByIdTransformedResponse = VideoExtendedData | null;

export type GetVideoMenuItemsRequest = { language: string };

export type GetVideoMenuItemsResponse = {
  pk: number;
  category_name: string;
  category_slug: string;
  category_icon: string;
}[];
