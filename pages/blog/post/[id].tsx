import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { type SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import React, { ReactElement } from 'react';

import { WithFooterLayout } from '@/layouts';
import { BlogPostView } from '@/views/blog-post/blog-post.view';
import { wrapper } from 'lib/store';
import { setLanguages } from 'lib/store/features/languages';
import type { BlogPost } from 'lib/types';
import {
  getBlogPostList,
  getBlogPostOne,
  getLanguageList,
} from 'services/admin-api';

import { NextPageWithLayout } from '../../_app';

type SP = SSRConfig & {
  data: BlogPost;
  id?: string;
  mdxSource: MDXRemoteSerializeResult;
};

export const getStaticPaths: GetStaticPaths<{
  id: string;
  locale?: string;
}> = async ({ locales }) => {
  const blogPosts = await getBlogPostList({
    pagination: { page: 1, amount: 5 },
  });

  const paths: { locale?: string; params: { id: string } }[] = [];

  blogPosts.forEach((el) => {
    if (locales?.length)
      locales.forEach((l) =>
        paths.push({ params: { id: String(el.id) }, locale: l }),
      );
    else paths.push({ params: { id: String(el.id) } });
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<SP> = wrapper.getStaticProps<SP>(
  (store) => async (ctx) => {
    if (
      !ctx.params ||
      !('id' in ctx.params) ||
      !ctx.params.id ||
      typeof ctx.params.id !== 'string' ||
      !/^[0-9]+$/.test(ctx.params.id)
    )
      return { notFound: true };
    else {
      const languages = await getLanguageList();
      store.dispatch(setLanguages(languages));
      const languageId = languages.find((l) => l.code === ctx.locale)?.id;
      if (languageId) {
        const blog = await getBlogPostOne({ id: ctx.params.id, languageId });

        return {
          props: {
            ...(await serverSideTranslations(ctx.locale as string)),
            data: blog,
            mdxSource: await serialize(blog.text),
          },
        };
      } else return { notFound: true };
    }
  },
);

const BlogPost: NextPageWithLayout<SP> = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{props.data?.title || t('blog_post_page_title')}</title>
        {props.data && (
          <>
            <meta property="og:title" content={props.data.title} />
            <meta property="og:description" content={props.data.text} />
            <meta property="og:image" content={props.data.image} />
          </>
        )}
      </Head>
      <section className="page">
        {props.data && (
          <BlogPostView data={props.data} mdxSource={props.mdxSource} />
        )}
      </section>
    </>
  );
};

BlogPost.getLayout = (page: ReactElement) => (
  <WithFooterLayout>{page}</WithFooterLayout>
);

export default BlogPost;
