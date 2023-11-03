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
import { NavMenuItem, NewsCategory, NewsFeed } from 'lib/types';
import {
  breakingNewsApi,
  getNewsCategories,
  newsApi,
  newsFeedApi,
  useGetNewsByFeedQuery,
} from 'services/news-api';

import { NextPageWithLayout } from '../../_app';
import { BREAKING_NEWS_CATEGORY_SLUGS } from 'lib/constants';

const NewsFeedDesktopView = dynamic(
  () => import('@/views/news/feed/desktop/news-feed-desktop.view'),
  { suspense: true },
);
const NewsFeedMobileView = dynamic(
  () => import('@/views/news/feed/mobile/news-feed-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  breakingNewsCategories: NewsCategory[];
  categories: NavMenuItem[];
  categoryId?: number;
  currentUrl: string;
  feed?: NewsFeed;
  id: string;
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { id, page } = ctx.query;
    if (!id || typeof id !== 'string' || !/^\d+$/.test(id))
      return { notFound: true };

    const language = ctx.locale || 'tk';

    const categories = await getNewsCategories({ language });
    const breakingNewsCategories = categories
      .filter((el) => BREAKING_NEWS_CATEGORY_SLUGS.includes(el.slug))
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    let feed: NewsFeed | undefined = undefined;
    store.dispatch(
      newsFeedApi.endpoints.getNewsPopularFeeds.initiate({ lang: language }),
    );
    await store.dispatch(
      newsFeedApi.util.getRunningQueryThunk('getNewsPopularFeeds', {
        lang: language,
      }),
    );
    const feedsState = newsFeedApi.endpoints.getNewsPopularFeeds.select({
      lang: language,
    })(store.getState());
    if (feedsState && feedsState.data)
      feed = feedsState.data.find((el) => el.id === +id);
    if (!feed) return { notFound: true };

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      breakingNewsCategories,
      categories,
      currentUrl: ctx.resolvedUrl,
      feed,
      id,
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
      newsFeedApi.endpoints.getNewsByFeed.initiate({
        id,
        lang: language,
        page: typeof page === 'string' ? Number(page) : 1,
      }),
    );
    await Promise.all([
      ...store.dispatch(newsApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const NewsFeeds: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { i18n, t } = useTranslation('news');
  const { data, isFetching } = useGetNewsByFeedQuery({
    lang: i18n.language,
    page,
    id: props.id,
  });

  const {
    reducedData: reducedNews,
    minPage,
    maxPage,
  } = usePaginatedData(data, props.id);

  return (
    <>
      <Head>
        <title>{props.feed?.name || t('news_page_title')}</title>
        {props.feed && (
          <>
            <meta property="og:title" content={props.feed.name} />
            <meta property="og:url" content={props.currentUrl} />
            <meta property="og:image" content={props.feed.icon} />
          </>
        )}
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
                <NewsFeedMobileView
                  minPage={minPage}
                  maxPage={maxPage}
                  data={data}
                  isFetching={isFetching}
                  reducedNews={reducedNews}
                />
              ) : (
                <NewsFeedDesktopView
                  feed={props.feed}
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

NewsFeeds.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout hideLanguage={true}>
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default NewsFeeds;
