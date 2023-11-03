import { NextRouter } from 'next/router';
import { useMemo } from 'react';

export const useQueryPage = (router: NextRouter) => {
  const query = useMemo(
    () =>
      'q' in router.query && typeof router.query['q'] === 'string'
        ? decodeURIComponent(router.query['q'])
        : '',
    [router.query],
  );
  const page = useMemo(
    () =>
      'page' in router.query && typeof router.query['page'] === 'string'
        ? Number(router.query['page'])
        : 1,
    [router.query],
  );
  return { query, page };
};
