import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, Suspense } from 'react';

import {
  WithFooterLayout,
  WithNavigationLayout,
  WithModalLayout,
  WithVideoMenuLayout,
} from '@/layouts';
import { getVideoCategoryLink } from 'lib/helpers';
import { useAppSelector, usePaginatedData, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { VideoChannelData, VideoMenuItem } from 'lib/types';
import {
  getVideoChannelById,
  getVideoMenuItems,
  useGetVideoByChannelQuery,
  videoApi,
  videoChannelApi,
} from 'services/video-api';

import { NextPageWithLayout } from '../../_app';

type SSP = SSRConfig & {
  currentUrl: string;
  data: VideoChannelData;
  id: string;
  menuExtraItems: VideoMenuItem[];
};

const VideoChannelDesktopView = dynamic(
  () => import('@/views/video/channel/desktop/video-channel-desktop.view'),
  { suspense: true },
);
const VideoChannelMobileView = dynamic(
  () => import('@/views/video/channel/mobile/video-channel-mobile.view'),
  { suspense: true },
);

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { id, page } = ctx.query;
    if (!id || typeof id !== 'string' || !/^[0-9]+$/.test(id))
      return { notFound: true };

    const { status, data } = await getVideoChannelById({ id });

    if (status !== 200 || !data) return { notFound: true };

    store.dispatch(
      videoChannelApi.endpoints.getVideoByChannel.initiate({
        id: data.id,
        page: typeof page === 'string' ? Number(page) : 1,
        amount: 8,
        sort: 'date',
        order: 'desc',
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
      data,
      currentUrl: ctx.resolvedUrl,
      menuExtraItems,
    };

    return { props };
  });

const VideoChannel: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { data, isFetching } = useGetVideoByChannelQuery({
    id: props.data.id,
    page,
    amount: 8,
    sort: 'date',
    order: 'desc',
  });

  const {
    reducedData: reducedVideos,
    minPage,
    maxPage,
  } = usePaginatedData(data);

  return (
    <>
      <Head>
        <title>{props.data.name}</title>
        <meta property="og:title" content={props.data.name} />
        <meta property="og:url" content={props.currentUrl} />
        {props.data.avatar && (
          <meta property="og:image" content={props.data.avatar} />
        )}
      </Head>
      <section className="page">
        <WithVideoMenuLayout
          getLink={getVideoCategoryLink}
          menuExtraItems={props.menuExtraItems}
        >
          <Suspense>
            {mobile ? (
              <VideoChannelMobileView
                channel={props.data}
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedVideos={reducedVideos}
              />
            ) : (
              <VideoChannelDesktopView
                channel={props.data}
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedVideos={reducedVideos}
              />
            )}
          </Suspense>
        </WithVideoMenuLayout>
      </section>
    </>
  );
};

VideoChannel.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoChannel;
