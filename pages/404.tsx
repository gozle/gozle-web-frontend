import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { WithFooterLayout } from '@/layouts';
import NotFoundView from '@/views/not-found/not-found.view';

import { NextPageWithLayout } from './_app';

type SP = SSRConfig;

export const getStaticProps: GetStaticProps<SP> = async (context) => ({
  props: await serverSideTranslations(context.locale as string),
});

const NotFound: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('not_found_page_title')}</title>
      </Head>
      <NotFoundView />
    </>
  );
};

NotFound.getLayout = (page: ReactElement) => (
  <WithFooterLayout>{page}</WithFooterLayout>
);

export default NotFound;
