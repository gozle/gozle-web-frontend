// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToStaticMarkup } from 'react-dom/server';

import { SearchResultList } from '@/views/search/search-result-list';
import {
  TranslationContext,
  type Translations,
} from '@/views/search/translation.context';
import { VideoResultList } from '@/views/search/video-result-list';
import { VIDEO_BASE_URL, WEBSEARCH_URL } from 'lib/constants';
import { isLocale, type Locale } from 'lib/languages';
import { appTheme } from 'lib/theme';
import type { WebSearchData } from 'lib/types';
import type { WebSearchResponse } from 'services/app-api';
import {
  type GetVideoListResponse,
  type GetVideoListTransformedResponse,
  transformVideoListResponse,
} from 'services/video-api';

import { AppThemeContext } from '../_app';

interface SearchApiResult {
  max_page: number;
  page: number;
  results: {
    description: string;
    icon?: string;
    image?: string;
    path: string;
    query: string;
    site: string;
    title: string;
    url: string;
  }[];
  suggestion?: string;
  took: number;
}

const translations: Translations = {
  en: {
    show_full_description: 'Read more',
    hide_full_description: 'Hide',
    videos: 'Videos',
  },
  ru: {
    show_full_description: 'Читать далее',
    hide_full_description: 'Скрыть',
    videos: 'Видео',
  },
  tk: {
    show_full_description: 'Köpräk oka',
    hide_full_description: 'Gizle',
    videos: 'Wideolar',
  },
};

const resultsPerPage = 10;

const getSearchResult = async (
  query: string,
  page: number,
  headers: Record<string, string>,
): Promise<SearchApiResult | null> => {
  try {
    const fetchRes = await fetch(WEBSEARCH_URL, {
      method: 'post',
      body: JSON.stringify({
        ip: headers['x-user-ip'],
        query,
        page,
        size: resultsPerPage,
        user_agent: headers['user-agent'],
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return fetchRes.status === 200 ? fetchRes.json() : null;
  } catch {
    return null;
  }
};

const getVideoSearchResult = async (
  query: string,
): Promise<GetVideoListTransformedResponse | null> => {
  try {
    const fetchRes = await fetch(
      `${VIDEO_BASE_URL}/search?q=${query}&amount=${5}`,
    );
    const result = (await fetchRes.json()) as GetVideoListResponse;
    return fetchRes.status === 200 && result.results
      ? transformVideoListResponse(result, { page: 1, amount: 5 }, 5)
      : null;
  } catch {
    return null;
  }
};

const presentSearchResults = (
  results: SearchApiResult['results'],
): WebSearchData[] =>
  results.map((el) => ({
    image: el.image,
    title: el.title,
    description: el.description,
    src: {
      icon: el.icon,
      link: el.url,
    },
  }));

const getLocale = (req: NextApiRequest) => {
  let locale: Locale = 'tk';
  let queryLocale = req.query['locale'];
  if (queryLocale && isLocale(queryLocale)) locale = queryLocale as Locale;
  return locale;
};

const getTheme = (req: NextApiRequest) => {
  let theme: 'dark' | 'light' = 'light';
  let queryTheme = req.query['theme'];
  if (queryTheme && queryTheme === 'dark') theme = 'dark';
  return theme;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebSearchResponse | ''>,
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
    const data = await getSearchResult(
      query,
      +page,
      req.headers as Record<string, string>,
    );
    const video =
      +page === 1 ? await getVideoSearchResult(query) : { data: [] };
    // const data = mockResult;
    if (data) {
      const presentedData = presentSearchResults(data.results);
      const pageHtml = (
        <AppThemeContext.Provider value={appTheme[getTheme(req)]}>
          <TranslationContext.Provider value={translations[getLocale(req)]}>
            <>
              {video && video.data.length > 0 && (
                <VideoResultList data={video.data} language={getLocale(req)} />
              )}
              <SearchResultList data={presentedData} />
            </>
          </TranslationContext.Provider>
        </AppThemeContext.Provider>
      );
      return res.status(200).json({
        html: renderToStaticMarkup(pageHtml),
        page: +page,
        suggestion: data.suggestion,
        time: data.took,
        last_page: data.max_page,
      });
    }
  }
  return res.status(404).send('');
}
