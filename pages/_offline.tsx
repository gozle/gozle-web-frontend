import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { WithFooterLayout, WithNavigationLayout } from '@/layouts';
import OfflineView from '@/views/offline/offline.view';
import { wrapper } from 'lib/store';
import { setLanguages } from 'lib/store/features/languages';
import { getLanguageList } from 'services/admin-api';

import { NextPageWithLayout } from './_app';

type SP = SSRConfig;

export const getStaticProps: GetStaticProps<SP> = wrapper.getStaticProps<SP>(
  (store) => async (context) => {
    const languages = await getLanguageList();
    store.dispatch(setLanguages(languages));
    return {
      props: await serverSideTranslations(context.locale as string),
    };
  },
);

const Offline: NextPageWithLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('app_title')}</title>
      </Head>
      <OfflineView className="page" />
    </>
  );
};

Offline.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithNavigationLayout hideColorScheme={true}>{page}</WithNavigationLayout>
  </WithFooterLayout>
);

export default Offline;
