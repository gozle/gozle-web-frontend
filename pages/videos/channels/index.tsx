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
  WithVideoMenuLayout,
} from '@/layouts';
import { getVideoCategoryLink, getVideoChannelLink } from 'lib/helpers';
import { useAppSelector, usePaginatedData, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { VideoMenuItem } from 'lib/types';
import {
  getVideoMenuItems,
  useGetVideoChannelsQuery,
  videoApi,
  videoChannelApi,
} from 'services/video-api';

import { NextPageWithLayout } from '../../_app';

const VideoChannelsDesktopView = dynamic(
  () => import('@/views/video/channels/desktop/video-channels-desktop.view'),
  { suspense: true },
);
const VideoChannelsMobileView = dynamic(
  () => import('@/views/video/channels/mobile/video-channels-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  menuExtraItems: VideoMenuItem[];
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const language = ctx.locale || 'tk';
    const page: number =
      'page' in ctx.query && typeof ctx.query['page'] === 'string'
        ? Number(ctx.query['page'])
        : 1;

    const menuExtraItems = await getVideoMenuItems({ language });

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      menuExtraItems,
    };

    store.dispatch(
      videoChannelApi.endpoints.getVideoChannels.initiate({ page }),
    );
    await Promise.all([
      ...store.dispatch(videoApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const VideoChannels: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation('video');

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { data, isFetching } = useGetVideoChannelsQuery({ page });
  const {
    reducedData: reducedChannels,
    minPage,
    maxPage,
  } = usePaginatedData(data);

  return (
    <>
      <Head>
        <title>{t('videos_page_title')}</title>
      </Head>
      <section className="page">
        <WithVideoMenuLayout
          getLink={getVideoCategoryLink}
          menuExtraItems={props.menuExtraItems}
        >
          <Suspense>
            {mobile ? (
              <VideoChannelsMobileView
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedChannels={reducedChannels}
                getLink={getVideoChannelLink}
              />
            ) : (
              <VideoChannelsDesktopView
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedChannels={reducedChannels}
                getLink={getVideoChannelLink}
              />
            )}
          </Suspense>
        </WithVideoMenuLayout>
      </section>
    </>
  );
};

VideoChannels.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoChannels;
