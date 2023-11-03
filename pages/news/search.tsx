import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, Suspense } from 'react';

import {
  WithFooterLayout,
  WithModalLayout,
  WithNavigationLayout,
  WithNavMenuLayout,
} from '@/layouts';
import { BreakingNewsContext } from '@/page-blocks';
import { getNewsCategoryLink } from 'lib/helpers';
import { useAppSelector, usePaginatedData, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { NavMenuItem, NewsCategory } from 'lib/types';
import {
  newsApi,
  getNewsCategories,
  useSearchNewsQuery,
  searchNewsApi,
  breakingNewsApi,
  latestNewsApi,
} from 'services/news-api';

import { NextPageWithLayout } from '../_app';
import { BREAKING_NEWS_CATEGORY_SLUGS } from 'lib/constants';

const NewsSearchDesktopView = dynamic(
  () => import('@/views/news/search/desktop/news-search-desktop.view'),
  { suspense: true },
);
const NewsSearchMobileView = dynamic(
  () => import('@/views/news/search/mobile/news-search-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  breakingNewsCategories: NewsCategory[];
  categories: NavMenuItem[];
  categoryId?: number;
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const language = ctx.locale || 'tk';
    const query: string | null =
      'q' in ctx.query && typeof ctx.query['q'] === 'string'
        ? ctx.query['q']
        : null;
    const page: number =
      'page' in ctx.query && typeof ctx.query['page'] === 'string'
        ? Number(ctx.query['page'])
        : 1;

    if (query)
      store.dispatch(
        searchNewsApi.endpoints.searchNews.initiate({ query, page }),
      );

    const categories = await getNewsCategories({ language });
    const breakingNewsCategories = categories
      .filter((el) => BREAKING_NEWS_CATEGORY_SLUGS.includes(el.slug))
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      categories,
      breakingNewsCategories,
    };

    if (!store.getState().settings.mobile && breakingNewsCategories.length) {
      store.dispatch(
        breakingNewsApi.endpoints.getBreakingNews.initiate({
          slug: breakingNewsCategories[0].slug,
          language,
        }),
      );
      props.categoryId = breakingNewsCategories[0].id;
    }
    store.dispatch(
      latestNewsApi.endpoints.getLatestNews.initiate({ language, page: 1 }),
    );
    await Promise.all([
      ...store.dispatch(newsApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const NewsSearch: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation('news');
  const router = useRouter();
  const { query, page } = useQueryPage(router);
  const { data, isFetching } = useSearchNewsQuery(
    { query, page },
    { skip: !query },
  );
  const {
    reducedData: reducedNews,
    minPage,
    maxPage,
  } = usePaginatedData(data, query);

  return (
    <>
      <Head>
        <title>{t('news_page_title')}</title>
      </Head>
      <section className="page">
        <WithNavMenuLayout
          categories={props.categories}
          getCategoryLink={getNewsCategoryLink}
        >
          <BreakingNewsContext.Provider
            value={{
              categories: props.breakingNewsCategories,
              categoryId: props.categoryId,
            }}
          >
            <Suspense>
              {mobile ? (
                <NewsSearchMobileView
                  minPage={minPage}
                  maxPage={maxPage}
                  data={data}
                  isFetching={isFetching}
                  reducedNews={reducedNews}
                />
              ) : (
                <NewsSearchDesktopView
                  minPage={minPage}
                  maxPage={maxPage}
                  data={data}
                  isFetching={isFetching}
                  reducedNews={reducedNews}
                />
              )}
            </Suspense>
          </BreakingNewsContext.Provider>
        </WithNavMenuLayout>
      </section>
    </>
  );
};

NewsSearch.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/news/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default NewsSearch;
