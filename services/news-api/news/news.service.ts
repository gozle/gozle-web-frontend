import { NEWS_API_BASE_URL } from 'lib/constants';
import type { NewsExtendedData } from 'lib/types';

import type {
  GetNewsByIdRequest,
  GetNewsByIdResponse,
  GetNewsByIdTransformedResponse,
} from './news.type';

export const getNewsById = async ({
  id,
  language,
}: GetNewsByIdRequest): Promise<GetNewsByIdTransformedResponse> => {
  const params = new URLSearchParams({ id: String(id), lang: language });
  const res = await fetch(`${NEWS_API_BASE_URL}/post?${params}`);
  if (res.status === 200) {
    const data: GetNewsByIdResponse = await res.json();
    if (data) {
      const presentedData: NewsExtendedData | null = {
        id: data.post_id || '',
        categorySlug: data.post_category_slug || '',
        title: data.post_title || '',
        description: data.post_excerpt || '',
        content: data.post_content || '',
        timestamp: +data.post_pubdate || 0,
        img: data.post_featured_image || '',
        views: data.post_hits || 0,
        src: {
          id: data.post_feed_id || 0,
          icon: data.post_feed_logo_url || '',
          name: data.post_feed_name || '',
          link: data.post_source || '',
        },
      };
      return { status: res.status, data: presentedData };
    }
  }
  return { status: res.status };
};
