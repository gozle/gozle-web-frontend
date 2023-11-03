import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, Suspense } from 'react';

import {
  WithFooterLayout,
  WithNavigationLayout,
  WithModalLayout,
  WithVideoMenuLayout,
} from '@/layouts';
import { getVideoCategoryLink } from 'lib/helpers';
import { useAppSelector, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import type { NavMenuItem, VideoMenuItem } from 'lib/types';
import {
  getVideoCategories,
  getVideoMenuItems,
  searchVideoApi,
  useGetVideoChannelsQuery,
  useSearchVideoQuery,
  videoApi,
  videoChannelApi,
} from 'services/video-api';

import { NextPageWithLayout } from '../_app';

const VideoSearchDesktopView = dynamic(
  () => import('@/views/video/search/desktop/video-search-desktop.view'),
  { suspense: true },
);
const VideoSearchMobileView = dynamic(
  () => import('@/views/video/search/mobile/video-search-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  categories: NavMenuItem[];
  menuExtraItems: VideoMenuItem[];
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const language = ctx.locale || 'tk';
    const query: string | null =
      'q' in ctx.query && typeof ctx.query['q'] === 'string'
        ? ctx.query['q']
        : '';
    const page: number =
      'page' in ctx.query && typeof ctx.query['page'] === 'string'
        ? Number(ctx.query['page'])
        : 1;

    const categories = await getVideoCategories({ language });
    const menuExtraItems = await getVideoMenuItems({ language });

    if (query) {
      store.dispatch(
        searchVideoApi.endpoints.searchVideo.initiate({
          query,
          page,
          amount: 5,
        }),
      );
      store.dispatch(
        videoChannelApi.endpoints.getVideoChannels.initiate({
          query,
          page: 1,
          amount: 5,
        }),
      );
      await Promise.all(store.dispatch(videoApi.util.getRunningQueriesThunk()));
    }

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      categories,
      menuExtraItems,
    };

    return { props };
  });

const VideoSearch: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation('video');

  const router = useRouter();
  const { query, page } = useQueryPage(router);
  const { data, isFetching } = useSearchVideoQuery(
    { query, page, amount: 5 },
    { skip: !query },
  );
  const { data: channels, isFetching: isFetchingChannels } =
    useGetVideoChannelsQuery({ query, page: 1, amount: 5 }, { skip: !query });

  return (
    <>
      <Head>
        <title>{t('videos_page_title')}</title>
      </Head>
      <section className="page">
        <WithVideoMenuLayout
          tags={props.categories}
          getLink={getVideoCategoryLink}
          menuExtraItems={props.menuExtraItems}
        >
          <Suspense>
            {mobile ? (
              <VideoSearchMobileView
                channels={channels}
                data={data}
                isFetching={isFetching || isFetchingChannels}
                query={query}
              />
            ) : (
              <VideoSearchDesktopView
                channels={channels}
                data={data}
                page={page}
                query={query}
              />
            )}
          </Suspense>
        </WithVideoMenuLayout>
      </section>
    </>
  );
};

VideoSearch.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search" hideLanguage={true}>
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoSearch;
