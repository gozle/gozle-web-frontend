import { type ParsedUrlQuery } from 'querystring';

export const extractQueryPage = (pq: ParsedUrlQuery) => ({
  query: 'q' in pq && typeof pq['q'] === 'string' ? pq['q'] : null,
  page:
    'page' in pq && typeof pq['page'] === 'string' ? parseInt(pq['page']) : 1,
});
