import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { WithFooterLayout } from '@/layouts';
import AboutUsView from '@/views/about-us/about-us.view';
import { getBlogPostLink } from 'lib/helpers';
import { wrapper } from 'lib/store';
import { setLanguages } from 'lib/store/features/languages';
import type { BlogPost } from 'lib/types';
import { getBlogPostList, getLanguageList } from 'services/admin-api';

import { NextPageWithLayout } from './_app';

type SP = SSRConfig & { blogPosts: BlogPost[] };

export const getStaticProps: GetStaticProps<SP> = wrapper.getStaticProps<SP>(
  (store) => async (ctx) => {
    const props: SP = {
      ...(await serverSideTranslations(ctx.locale as string)),
      blogPosts: [],
    };

    const languages = await getLanguageList();
    store.dispatch(setLanguages(languages));
    const languageId = languages.find((l) => l.code === ctx.locale)?.id;
    if (languageId)
      props.blogPosts = await getBlogPostList({
        languageId,
        pagination: { page: 1, amount: 5 },
      });

    return {
      props,
    };
  },
);

const AboutUs: NextPageWithLayout<SP> = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('about_us_page_title')}</title>
      </Head>
      <AboutUsView
        className="page"
        blogPosts={props.blogPosts}
        getLink={getBlogPostLink}
      />
    </>
  );
};

AboutUs.getLayout = (page: ReactElement) => (
  <WithFooterLayout>{page}</WithFooterLayout>
);

export default AboutUs;
