import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { type SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { type ReactElement } from 'react';

import { WithFooterLayout } from '@/layouts';
import SitesView from '@/views/sites/sites.view';
import { wrapper } from 'lib/store';
import { setLanguages } from 'lib/store/features/languages';
import type { Site, SiteCategory } from 'lib/types';
import {
  getLanguageList,
  getSiteCategoryList,
  getSiteList,
} from 'services/admin-api';

import type { NextPageWithLayout } from './_app';

type SP = SSRConfig & {
  categories?: SiteCategory[];
  sites?: { [key: number]: Site[] };
};

export const getStaticProps: GetStaticProps<SP> = wrapper.getStaticProps<SP>(
  (store) => async (ctx) => {
    const props: SP = await serverSideTranslations(ctx.locale as string);

    const languages = await getLanguageList();
    store.dispatch(setLanguages(languages));
    const languageId = languages.find((l) => l.code === ctx.locale)?.id;
    if (languageId) {
      const getServiceResults = await Promise.all([
        await getSiteList({ languageId }),
        await getSiteCategoryList({ languageId }),
      ]);
      const sites: { [key: string]: Site[] } = {};
      getServiceResults[0].forEach((el) => {
        if (el.categoryId) {
          if (sites[el.categoryId]) sites[el.categoryId].push(el);
          else sites[el.categoryId] = [el];
        }
      });
      props.sites = sites;
      props.categories = getServiceResults[1];
    }

    return { props };
  },
);

const Sites: NextPageWithLayout<SP> = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('sites_page_title')}</title>
      </Head>
      <SitesView
        className="page"
        sites={props.sites!}
        categories={props.categories}
      />
    </>
  );
};

Sites.getLayout = (page: ReactElement) => (
  <WithFooterLayout>{page}</WithFooterLayout>
);

export default Sites;
