import { ADMIN_BASE_URL } from 'lib/constants';
import { objectToQueryStringSerializer } from 'lib/serializers';
import type { Site, SiteCategory } from 'lib/types';

import type {
  GetSiteCategoryListRequest,
  GetSiteCategoryListResponse,
} from './site-category.type';
import type { GetSiteListRequest, GetSiteListResponse } from './site.type';

export const getSiteCategoryList = (() => {
  const cachedList: { [languageId: number]: [SiteCategory[], number] } = {};

  return async ({
    languageId,
  }: GetSiteCategoryListRequest): Promise<SiteCategory[]> => {
    if (
      languageId in cachedList &&
      cachedList[languageId][1] + 86400000 > +new Date()
    )
      return cachedList[languageId][0];

    try {
      const res = await fetch(
        `${ADMIN_BASE_URL}/site-category/list?languageId=${languageId}`,
      );

      const json: GetSiteCategoryListResponse = await res.json();
      const result =
        json && json.data
          ? json.data.map((el) => ({
              id: el.id,
              slug: el.slug,
              name: el.name,
            }))
          : [];

      cachedList[languageId] = [result, +new Date()];

      return result;
    } catch (err) {
      return [];
    }
  };
})();

export const getSiteList = (() => {
  const cachedList: { [languageId: number]: [Site[], number] } = {};

  return async (params: GetSiteListRequest): Promise<Site[]> => {
    if (
      params.languageId in cachedList &&
      cachedList[params.languageId][1] + 86400000 > +new Date()
    )
      return cachedList[params.languageId][0];

    try {
      const res = await fetch(
        `${ADMIN_BASE_URL}/site/list?${objectToQueryStringSerializer(params)}`,
      );

      const json: GetSiteListResponse = await res.json();
      const result =
        json && json.data
          ? json.data.map((el) => ({
              id: el.id,
              categoryId: el.categoryId || 0,
              icon: el.logo || '',
              title: el.title,
              description: el.description,
              src: el.url || '',
            }))
          : [];

      cachedList[params.languageId] = [result, +new Date()];

      return result;
    } catch (err) {
      return [];
    }
  };
})();
