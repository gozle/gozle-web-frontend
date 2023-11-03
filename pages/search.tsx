import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { type ReactElement, Suspense } from 'react';

import {
  WithFooterLayout,
  WithModalLayout,
  WithNavigationLayout,
} from '@/layouts';
import { useAppSelector } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { type WebSearchRequest, searchApi } from 'services/app-api';
import { infoApi } from 'services/info';

import { NextPageWithLayout } from './_app';

const i18nextConfig = require('../next-i18next.config.js');

const SearchDesktopView = dynamic(
  () => import('@/views/search/desktop/search-desktop.view'),
  { suspense: true },
);
const SearchMobileView = dynamic(
  () => import('@/views/search/mobile/search-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  searches: string[];
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const query: string | null =
      'q' in ctx.query && typeof ctx.query['q'] === 'string'
        ? decodeURIComponent(ctx.query['q'])
        : null;
    const page: number =
      'page' in ctx.query && typeof ctx.query['page'] === 'string'
        ? Number(ctx.query['page'])
        : 1;

    if (query) {
      const params: WebSearchRequest = { query, page };
      const state = store.getState();
      const colorScheme = state.colorScheme;
      const settings = state.settings;
      if (colorScheme) params.theme = colorScheme;
      if (ctx.locale) params.language = ctx.locale;
      store.dispatch(
        infoApi.endpoints.searchInfo.initiate({
          query,
          language: ctx.locale || 'tk',
        }),
      );
      store.dispatch(
        searchApi.endpoints.webSearch.initiate({
          ...params,
          headers: {
            'user-agent': settings.userAgent,
            'x-user-ip': settings.ip,
          },
        }),
      );
      await Promise.all([
        ...store.dispatch(searchApi.util.getRunningQueriesThunk()),
        ...store.dispatch(infoApi.util.getRunningQueriesThunk()),
      ]);
      // if (!isMobile) {
      //   store.dispatch(
      //     wikiApi.endpoints.getWikiData.initiate({
      //       query,
      //       language: ctx.locale || 'tk',
      //     }),
      //   );
      //   await Promise.all(
      //     store.dispatch(wikiApi.util.getRunningQueriesThunk()),
      //   );
      // }
    }

    const searches = ['turkmenportal', 'tmtub', 'aşgabat'];

    const props: SSP = {
      ...(await serverSideTranslations(
        ctx.locale as string,
        undefined,
        i18nextConfig,
      )),
      searches,
    };

    return { props };
  });

const Search: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation('search');

  return (
    <>
      <Head>
        <title>{t('search_page_title')}</title>
      </Head>
      <Suspense>
        {mobile ? (
          <SearchMobileView className="page" searches={props.searches} />
        ) : (
          <SearchDesktopView className="page" searches={props.searches} />
        )}
      </Suspense>
    </>
  );
};

Search.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout hideColorScheme={true}>
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default Search;
