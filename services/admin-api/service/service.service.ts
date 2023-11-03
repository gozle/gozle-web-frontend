import { ADMIN_BASE_URL } from 'lib/constants';
import type { Service } from 'lib/types';
import type {
  GetServiceListRequest,
  GetServiceListResponse,
} from './service.type';

export const getServiceList = (() => {
  const cachedList: { [languageId: number]: [Service[], number] } = {};

  return async ({ languageId }: GetServiceListRequest): Promise<Service[]> => {
    if (
      languageId in cachedList &&
      cachedList[languageId][1] + 86400000 > +new Date()
    )
      return cachedList[languageId][0];

    try {
      const res = await fetch(
        `${ADMIN_BASE_URL}/service/list?languageId=${languageId}`,
      );

      const json: GetServiceListResponse = await res.json();
      const result =
        json && json.data
          ? json.data.map((el) => ({
              id: el.id,
              icon: el.logo || '',
              title: el.title,
              description: el.description,
              src: el.url || '',
              color: el.color || '',
            }))
          : [];

      cachedList[languageId] = [result, +new Date()];

      return result;
    } catch (err) {
      return [];
    }
  };
})();
