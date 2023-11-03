import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement, Suspense } from 'react';

import { WithFooterLayout, WithGeolocationLayout } from '@/layouts';
import { BreakingNewsContext } from '@/page-blocks';
import { useAppSelector } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { NewsCategory, Service, Site, SiteCategory } from 'lib/types';
import {
  getServiceList,
  getSiteList,
  getSiteCategoryList,
} from 'services/admin-api';
import {
  breakingNewsApi,
  getNewsCategories,
  latestNewsApi,
  newsApi,
  newsFeedApi,
  popularNewsApi,
} from 'services/news-api';

import { NextPageWithLayout } from './_app';
import { BREAKING_NEWS_CATEGORY_SLUGS } from 'lib/constants';

const HomeDesktopView = dynamic(
  () => import('../src/views/home/desktop/home-desktop.view'),
  { suspense: true },
);
const HomeMobileView = dynamic(
  () => import('../src/views/home/mobile/home-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  breakingNewsCategories: NewsCategory[];
  breakingNewsCategory?: number;
  services: Service[];
  siteCategories?: SiteCategory[];
  sites?: { [key: number]: Site[] };
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const language = ctx.locale || 'tk';

    const breakingNewsCategories = (await getNewsCategories({ language }))
      .filter((el) => BREAKING_NEWS_CATEGORY_SLUGS.includes(el.slug))
      .sort((a, b) => (a.id > b.id ? 1 : -1));

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      breakingNewsCategories,
      services: [],
    };

    if (breakingNewsCategories.length) {
      store.dispatch(
        breakingNewsApi.endpoints.getBreakingNews.initiate({
          slug: breakingNewsCategories[0].slug,
          language,
        }),
      );
      props.breakingNewsCategory = breakingNewsCategories[0].id;
    }
    store.dispatch(
      latestNewsApi.endpoints.getLatestNews.initiate({ language, page: 1 }),
    );
    store.dispatch(
      popularNewsApi.endpoints.getPopularNews.initiate({ language }),
    );
    store.dispatch(
      newsFeedApi.endpoints.getNewsPopularFeeds.initiate({ lang: language }),
    );

    await Promise.all(store.dispatch(newsApi.util.getRunningQueriesThunk()));

    const languages = store.getState().languages;
    const languageId = languages.find((l) => l.code === ctx.locale)?.id;
    if (languageId) {
      props.services = await getServiceList({ languageId });

      if (!store.getState().settings.mobile) {
        const getServiceResults = await Promise.all([
          getSiteList({ languageId }),
          getSiteCategoryList({ languageId }),
        ]);

        const sites: { [key: string]: Site[] } = {};
        getServiceResults[0].forEach((el) => {
          if (el.categoryId) {
            if (sites[el.categoryId]) sites[el.categoryId].push(el);
            else sites[el.categoryId] = [el];
          }
        });
        props.sites = sites;
        props.siteCategories = getServiceResults[1];
      }
    }

    return { props };
  });

const Home: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('home_page_title')}</title>
      </Head>
      <BreakingNewsContext.Provider
        value={{
          categories: props.breakingNewsCategories,
          categoryId: props.breakingNewsCategory,
        }}
      >
        <Suspense>
          {mobile ? (
            <HomeMobileView className="page" shortcuts={props.services} />
          ) : (
            <HomeDesktopView
              className="page"
              services={props.services}
              sites={props.sites}
              siteCategories={props.siteCategories}
            />
          )}
        </Suspense>
      </BreakingNewsContext.Provider>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <WithGeolocationLayout>
    <WithFooterLayout>{page}</WithFooterLayout>
  </WithGeolocationLayout>
);

export default Home;
