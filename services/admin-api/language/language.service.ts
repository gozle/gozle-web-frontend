import { ADMIN_BASE_URL } from 'lib/constants';

import type { GetLanguageListResponse, Language } from './language.type';

export const getLanguageList = (() => {
  let timestamp = Date.now();
  let cachedList: Language[] = [];

  return async (): Promise<Language[]> => {
    if (timestamp + 86400000 > +new Date() && cachedList.length)
      return cachedList;

    try {
      const res = await fetch(`${ADMIN_BASE_URL}/language/list`);
      const json: GetLanguageListResponse = await res.json();
      const result = json && json.data ? json.data : [];

      timestamp = Date.now();
      cachedList = result;

      return result;
    } catch (err) {
      return [];
    }
  };
})();
