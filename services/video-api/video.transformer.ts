import type {
  GetVideoListRequestPagination,
  GetVideoListResponse,
  GetVideoListTransformedResponse,
} from './video.type';

export const transformVideoListResponse = (
  res: GetVideoListResponse | undefined,
  req: GetVideoListRequestPagination,
  defaultAmount: number,
): GetVideoListTransformedResponse =>
  res && 'results' in res
    ? {
        data: res.results.map((el) => ({
          id: el.pk,
          title: el.title,
          views: el.view,
          m3u8: el.m3u8 || '',
          duration: el.duration,
          thumbnail: el.thumbnail_url,
          timestamp: +new Date(el.date),
          src: {
            id: el.channel_id,
            name: el.channel_name,
            icon: el.channel_url,
          },
        })),
        pagination: {
          currentPage: req.page,
          itemsPerPage: req.amount || defaultAmount,
          totalItems: res.count,
          totalPages: Math.ceil(res.count / (req.amount || defaultAmount)),
        },
      }
    : null;
