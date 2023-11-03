import { NEWS_API_BASE_URL } from 'lib/constants';
import { NewsCategory } from 'lib/types';

import {
  GetNewsCategoriesRequest,
  GetNewsCategoriesResponse,
} from './news-category.type';

export const getNewsCategories = async ({
  language,
}: GetNewsCategoriesRequest): Promise<NewsCategory[]> => {
  try {
    const res = await fetch(`${NEWS_API_BASE_URL}/categories?lang=${language}`);
    if (res.status === 200) {
      const data: GetNewsCategoriesResponse = await res.json();
      if (data && data.length) {
        const presentedData: NewsCategory[] = data.map((el) => ({
          id: +el.category_id || 0,
          name: el.category_name || '',
          slug: el.category_slug || '',
        }));
        const result = presentedData.filter((el) => el.id);
        result.sort((a, b) => (a.id > b.id ? 1 : -1));
        return result;
      }
    }
    return [];
  } catch (err) {
    return [];
  }
};
