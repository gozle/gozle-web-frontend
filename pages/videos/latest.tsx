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
import { getVideoCategoryLink } from 'lib/helpers';
import { useAppSelector, usePaginatedData, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { NavMenuItem, VideoMenuItem } from 'lib/types';
import {
  getVideoCategories,
  getVideoMenuItems,
  latestVideoApi,
  useGetLatestVideoQuery,
  videoApi,
} from 'services/video-api';

import { NextPageWithLayout } from '../_app';

const VideoLatestDesktopView = dynamic(
  () => import('@/views/video/latest/desktop/video-latest-desktop.view'),
  { suspense: true },
);
const VideoLatestMobileView = dynamic(
  () => import('@/views/video/latest/mobile/video-latest-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  categories: NavMenuItem[];
  menuExtraItems: VideoMenuItem[];
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const language = ctx.locale || 'tk';
    const page: number =
      'page' in ctx.query && typeof ctx.query['page'] === 'string'
        ? Number(ctx.query['page'])
        : 1;

    const categories = await getVideoCategories({ language });
    const menuExtraItems = await getVideoMenuItems({ language });

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      categories,
      menuExtraItems,
    };

    store.dispatch(latestVideoApi.endpoints.getLatestVideo.initiate({ page }));
    await Promise.all([
      ...store.dispatch(videoApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const VideoLatest: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const { t } = useTranslation('video');

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { data, isFetching } = useGetLatestVideoQuery({ page });
  const {
    reducedData: reducedVideos,
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
          tags={props.categories}
          getLink={getVideoCategoryLink}
          menuExtraItems={props.menuExtraItems}
        >
          <Suspense>
            {mobile ? (
              <VideoLatestMobileView
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedVideos={reducedVideos}
              />
            ) : (
              <VideoLatestDesktopView
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

VideoLatest.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoLatest;
