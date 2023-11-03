import type {
  GetNewsListResponse,
  GetNewsListTransformedResponse,
} from './news.type';

export const transformNewsListResponse = (
  res: GetNewsListResponse | undefined,
  perPage?: number,
): GetNewsListTransformedResponse =>
  res
    ? {
        data: res.data
          .map((el) => ({
            id: el.post_id || '',
            description: el.post_excerpt || '',
            categorySlug: el.post_category_slug || '',
            img: el.post_featured_image || '',
            timestamp: +el.post_pubdate || 0,
            title: el.post_title || '',
            views: el.post_hits || 0,
            src: {
              icon: el.post_feed_logo_url || '',
              name: el.post_feed_name || '',
            },
          }))
          .sort((a, b) => (+a.id > +b.id ? -1 : 1)),
        pagination: {
          currentPage: res.page,
          itemsPerPage: perPage || 0,
          totalItems: 0,
          totalPages: res.allPage,
        },
      }
    : null;
