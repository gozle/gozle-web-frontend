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
import { NewsCategory, NavMenuItem } from 'lib/types';
import {
  breakingNewsApi,
  getNewsCategories,
  latestNewsApi,
  newsApi,
  useGetLatestNewsQuery,
} from 'services/news-api';

import { NextPageWithLayout } from '../../_app';
import { BREAKING_NEWS_CATEGORY_SLUGS } from 'lib/constants';

const NewsCategoryDesktopView = dynamic(
  () => import('@/views/news/category/desktop/news-category-desktop.view'),
  { suspense: true },
);
const NewsCategoryMobileView = dynamic(
  () => import('@/views/news/category/mobile/news-category-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  breakingNewsCategories: NewsCategory[];
  breakingNewsCategoryId?: number;
  categories: NavMenuItem[];
  category: NewsCategory;
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { categorySlug, page } = ctx.query;
    if (!categorySlug || typeof categorySlug !== 'string')
      return { notFound: true };

    const language = ctx.locale || 'tk';

    const categories = await getNewsCategories({ language });
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return { notFound: true };

    const breakingNewsCategories = categories
      .filter((el) => BREAKING_NEWS_CATEGORY_SLUGS.includes(el.slug))
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      category,
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
      props.breakingNewsCategoryId = breakingNewsCategories[0].id;
    }
    store.dispatch(
      latestNewsApi.endpoints.getLatestNews.initiate({
        language,
        page: typeof page === 'string' ? Number(page) : 1,
        slug: categorySlug,
      }),
    );
    await Promise.all([
      ...store.dispatch(newsApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const NewsCategory: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { i18n } = useTranslation();
  const { data, isFetching } = useGetLatestNewsQuery({
    language: i18n.language,
    slug: props.category.slug,
    page,
  });

  const {
    reducedData: reducedNews,
    minPage,
    maxPage,
  } = usePaginatedData(data, props.category.slug);

  return (
    <>
      <Head>
        <title>{props.category.name}</title>
      </Head>
      <section className="page">
        <WithNavMenuLayout
          categories={props.categories}
          category={props.category}
          getCategoryLink={getNewsCategoryLink}
        >
          <BreakingNewsContext.Provider
            value={{
              categories: props.breakingNewsCategories,
              categoryId: props.breakingNewsCategoryId,
            }}
          >
            <Suspense>
              {mobile ? (
                <NewsCategoryMobileView
                  minPage={minPage}
                  maxPage={maxPage}
                  data={data}
                  isFetching={isFetching}
                  reducedNews={reducedNews}
                />
              ) : (
                <NewsCategoryDesktopView
                  category={props.category}
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

NewsCategory.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout>
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default NewsCategory;
