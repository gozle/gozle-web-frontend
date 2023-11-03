// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { IMAGE_SEARCH_BASE_URL } from 'lib/constants';
import { ImgFullData } from 'lib/types';
import { ImageSearchResponse } from 'services/image';

const resultsPerPage = 100;

interface SearchApiResult {
  max_page: number;
  page: number;
  results: {
    height: string;
    icon: string;
    id: string | number;
    page_url: string;
    site: string;
    src: string;
    thumbnail: string;
    title: string;
    width: string;
  }[];
  took: number;
}

const getSearchResult = async (
  query: string,
  page: number,
): Promise<SearchApiResult | null> => {
  try {
    const res = await fetch(`${IMAGE_SEARCH_BASE_URL}/imagesearch`, {
      body: JSON.stringify({ query, page, size: resultsPerPage }),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });

    return res.status === 200 ? res.json() : null;
  } catch (error) {
    return null;
  }
};

const presentSearchResults = (
  results: SearchApiResult['results'],
): ImgFullData[] =>
  results.map((el) => ({
    id: el.id,
    width: +el.width,
    height: +el.height,
    link: el.thumbnail,
    description: el.title,
    src: {
      link: el.page_url,
      name: el.site,
      icon: el.icon,
    },
  }));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageSearchResponse | ''>,
) {
  const query = req.query['query'];
  const page = req.query['page'];
  if (
    page &&
    typeof page === 'string' &&
    /^[0-9]+$/.test(page) &&
    query &&
    typeof query === 'string'
  ) {
    const data = await getSearchResult(query, +page);
    if (data)
      return res.status(200).json({
        data: presentSearchResults(data.results),
        pagination: {
          currentPage: +page,
          itemsPerPage: resultsPerPage,
          totalItems: data.max_page * resultsPerPage,
          totalPages: data.max_page,
        },
        time: data.took,
        query,
      });
  }
  return res.status(404).send('');
}
