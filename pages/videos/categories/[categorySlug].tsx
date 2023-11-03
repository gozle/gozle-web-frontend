import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SSRConfig } from 'next-i18next';
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
import { NavMenuItem, VideoCategory, VideoMenuItem } from 'lib/types';
import {
  getVideoCategories,
  getVideoMenuItems,
  useGetVideoByCategoryQuery,
  videoApi,
  videoCategoryApi,
} from 'services/video-api';

import { NextPageWithLayout } from '../../_app';

const VideoCategoryDesktopView = dynamic(
  () => import('@/views/video/category/desktop/video-category-desktop.view'),
  { suspense: true },
);
const VideoCategoryMobileView = dynamic(
  () => import('@/views/video/category/mobile/video-category-mobile.view'),
  { suspense: true },
);

type SSP = SSRConfig & {
  categories: NavMenuItem[];
  category: VideoCategory;
  currentUrl: string;
  menuExtraItems: VideoMenuItem[];
};

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { categorySlug, page } = ctx.query;
    if (!categorySlug || typeof categorySlug !== 'string')
      return { notFound: true };

    const language = ctx.locale || 'tk';

    const categories = await getVideoCategories({ language });
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return { notFound: true };

    const menuExtraItems = await getVideoMenuItems({ language });

    const props: SSP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      category,
      categories,
      currentUrl: ctx.resolvedUrl,
      menuExtraItems,
    };

    store.dispatch(
      videoCategoryApi.endpoints.getVideoByCategory.initiate({
        id: category.id,
        page: typeof page === 'string' ? Number(page) : 1,
      }),
    );
    await Promise.all([
      ...store.dispatch(videoApi.util.getRunningQueriesThunk()),
    ]);

    return { props };
  });

const VideoCategory: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const router = useRouter();
  const { page } = useQueryPage(router);
  const { data, isFetching } = useGetVideoByCategoryQuery({
    id: props.category.id,
    page,
  });
  const {
    reducedData: reducedVideos,
    minPage,
    maxPage,
  } = usePaginatedData(data);

  return (
    <>
      <Head>
        <title>{props.category.name}</title>
        <meta property="og:title" content={props.category.name} />
        <meta property="og:url" content={props.currentUrl} />
      </Head>
      <section className="page">
        <WithVideoMenuLayout
          tags={props.categories}
          active={props.category}
          getLink={getVideoCategoryLink}
          menuExtraItems={props.menuExtraItems}
        >
          <Suspense>
            {mobile ? (
              <VideoCategoryMobileView
                category={props.category}
                data={data}
                isFetching={isFetching}
                minPage={minPage}
                maxPage={maxPage}
                reducedVideos={reducedVideos}
              />
            ) : (
              <VideoCategoryDesktopView
                category={props.category}
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

VideoCategory.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout href="/videos/search">
      <WithModalLayout>{page}</WithModalLayout>
    </WithNavigationLayout>
  </WithFooterLayout>
);

export default VideoCategory;
