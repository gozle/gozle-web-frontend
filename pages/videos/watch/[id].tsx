import { sanitize } from 'isomorphic-dompurify';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { type ReactElement, Suspense, useContext } from 'react';

import {
  WithFooterLayout,
  WithNavigationLayout,
  WithModalLayout,
  WithVideoMenuLayout,
} from '@/layouts';
import { EmbededPlayerContext } from '@/layouts/embeded-player';
import { getVideoCategoryLink } from 'lib/helpers';
import { useAppSelector } from 'lib/hooks';
import { wrapper } from 'lib/store';
import type { VideoExtendedData, VideoMenuItem } from 'lib/types';
import {
  getVideoMenuItems,
  mainVideoApi,
  useGetVideoByChannelQuery,
  videoApi,
  videoChannelApi,
} from 'services/video-api';

import type { NextPageWithLayout } from '../../_app';

type SSP = SSRConfig & {
  channelId: number;
  currentUrl: string;
  data: VideoExtendedData;
  id: string;
  menuExtraItems: VideoMenuItem[];
};

const VideoDesktopView = dynamic(
  () => import('@/views/video/[id]/desktop/video-desktop.view'),
  { suspense: true },
);
const VideoMobileView = dynamic(
  () => import('@/views/video/[id]/mobile/video-mobile.view'),
  { suspense: true },
);

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { id } = ctx.query;
    if (!id || typeof id !== 'string' || !/^[0-9]+$/.test(id))
      return { notFound: true };

    store.dispatch(mainVideoApi.endpoints.getVideoById.initiate({ id }));
    await store.dispatch(
      mainVideoApi.util.getRunningQueryThunk('getVideoById', { id }),
    );
    const data = mainVideoApi.endpoints.getVideoById.select({ id })(
      store.getState(),
    );

    if (!data || !data.data) return { notFound: true };

    store.dispatch(
      videoChannelApi.endpoints.getVideoByChannel.initiate({
        id: data.data.src.id!,
        page: 1,
        sort: 'random',
        order: 'asc',
      }),
    );
    await Promise.all([
      ...store.dispatch(videoApi.util.getRunningQueriesThunk()),
    ]);

    const language = ctx.locale || 'tk';
    const menuExtraItems = await getVideoMenuItems({ language });

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      id,
      data: data.data,
      currentUrl: ctx.resolvedUrl,
      menuExtraItems,
      channelId: data.data.src.id!,
    };

    return { props };
  });

const VideoWatch: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { data: videos } = useGetVideoByChannelQuery({
    id: props.channelId,
    page: 1,
    sort: 'random',
    order: 'asc',
  });

  const { wideScreen } = useContext(EmbededPlayerContext);

  const children = (
    <Suspense>
      {mobile ? (
        <VideoMobileView data={props.data} videos={videos} />
      ) : (
        <VideoDesktopView
          data={props.data}
          videos={videos}
          wideScreen={wideScreen}
        />
      )}
    </Suspense>
  );

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
        <meta property="og:image" content={props.data.thumbnail} />
      </Head>
      <section className="page">
        {wideScreen && !mobile ? (
          <>{children}</>
        ) : (
          <WithVideoMenuLayout
            getLink={getVideoCategoryLink}
            menuExtraItems={props.menuExtraItems}
          >
            {children}
          </WithVideoMenuLayout>
        )}
      </section>
    </>
  );
};

VideoWatch.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoWatch;
