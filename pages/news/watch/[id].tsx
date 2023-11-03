import { sanitize } from 'isomorphic-dompurify';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SSRConfig } from 'next-i18next';
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
import { useAppSelector } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { NewsExtendedData, NavMenuItem, NewsCategory } from 'lib/types';
import {
  getNewsCategories,
  getNewsById,
  newsApi,
  GetLatestNewsRequest,
  breakingNewsApi,
  latestNewsApi,
  popularNewsApi,
} from 'services/news-api';

import { NextPageWithLayout } from '../../_app';
import { BREAKING_NEWS_CATEGORY_SLUGS } from 'lib/constants';

const NewsDesktopView = dynamic(
  () => import('@/views/news/[id]/desktop/news-desktop.view'),
  { suspense: true },
);
const NewsMobileView = dynamic(
  () => import('@/views/news/[id]/mobile/news-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  breakingNewsCategories: NewsCategory[];
  breakingNewsCategoryId?: number;
  categories: NavMenuItem[];
  category: NavMenuItem | null;
  currentUrl: string;
  data: NewsExtendedData;
  id: string;
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { id } = ctx.query;
    if (!id || typeof id !== 'string' || !/^\d+$/.test(id))
      return { notFound: true };

    const isMobile = store.getState().settings.mobile;

    const language = ctx.locale || 'tk';

    const { status, data } = await getNewsById({
      id,
      language,
    });

    if (status !== 200 || !data) return { notFound: true };

    const categories = await getNewsCategories({ language });
    const category =
      categories.find((c) => c.slug === data.categorySlug) || null;

    const breakingNewsCategories = categories
      .filter((el) => BREAKING_NEWS_CATEGORY_SLUGS.includes(el.slug))
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      breakingNewsCategories,
      categories,
      category,
      currentUrl: ctx.resolvedUrl,
      data,
      id,
    };

    if (!isMobile && breakingNewsCategories.length) {
      store.dispatch(
        breakingNewsApi.endpoints.getBreakingNews.initiate({
          slug: breakingNewsCategories[0].slug,
          language,
        }),
      );
      props.breakingNewsCategoryId = breakingNewsCategories[0].id;
    }
    const getLatestNewsReq: GetLatestNewsRequest = { language, page: 1 };
    if (category) getLatestNewsReq.slug = category.slug;
    store.dispatch(
      latestNewsApi.endpoints.getLatestNews.initiate(getLatestNewsReq),
    );
    store.dispatch(
      popularNewsApi.endpoints.getPopularNews.initiate({ language }),
    );
    await Promise.all([
      ...store.dispatch(newsApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const News: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta property="og:title" content={props.data.title} />
        <meta property="og:url" content={props.currentUrl} />
        <meta
          property="og:description"
          content={sanitize(props.data.description, { ALLOWED_TAGS: [] })}
        />
        <meta property="og:image" content={props.data.img} />
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
                <NewsMobileView data={props.data} category={props.category} />
              ) : (
                <NewsDesktopView data={props.data} category={props.category} />
              )}
            </Suspense>
          </BreakingNewsContext.Provider>
        </WithNavMenuLayout>
      </section>
    </>
  );
};

News.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout hideLanguage={true}>
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default News;
