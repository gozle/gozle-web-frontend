import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useState } from 'react';
import Swiper from 'swiper';

import { wrapper } from 'lib/store';
import { setLanguages } from 'lib/store/features/languages';
import { getLanguageList } from 'services/admin-api';
import { shortsApi, useGetShortsQuery, videoApi } from 'services/video-api';

import { NextPageWithLayout } from './_app';
// import { ShortsSwiperMobile } from '@/components/video/shorts-swiper';

const ShortsSwiperMobile = dynamic(
  () =>
    import(
      '@/components/video/shorts-swiper/mobile/shorts-swiper-mobile.component'
    ),
  { ssr: false },
);

type SP = SSRConfig;

export const getServerSideProps: GetServerSideProps<SP> =
  wrapper.getServerSideProps<SP>((store) => async (ctx) => {
    const languages = await getLanguageList();
    store.dispatch(setLanguages(languages));

    store.dispatch(shortsApi.endpoints.getShorts.initiate(undefined));
    await Promise.all(store.dispatch(videoApi.util.getRunningQueriesThunk()));

    return {
      props: await serverSideTranslations(ctx.locale as string),
    };
  });

const Beta: NextPageWithLayout<SP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveIndexChange = (swiper: Swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const { data } = useGetShortsQuery();

  return (
    <>
      <Head>
        <title>{t('app_title')}</title>
      </Head>
      <div style={{ position: 'fixed', inset: 0 }}>
        {data && (
          <ShortsSwiperMobile
            data={data}
            onActiveIndexChange={handleActiveIndexChange}
            openedIndex={activeIndex}
          />
        )}
      </div>
    </>
  );
};

Beta.getLayout = (page: ReactElement) => page;

export default Beta;
