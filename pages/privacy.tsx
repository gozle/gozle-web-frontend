import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { WithFooterLayout } from '@/layouts';
import PrivacyView from '@/views/privacy/privacy.view';
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

const Privacy: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('privacy_page_title')}</title>
      </Head>
      <PrivacyView />
    </>
  );
};

Privacy.getLayout = (page: ReactElement) => (
  <WithFooterLayout>{page}</WithFooterLayout>
);

export default Privacy;
