import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';

import { Container16x9, NoSsr } from '@/components/base';
import { LogoSettingsBlock } from '@/page-blocks';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import { BlogPost } from 'lib/types';

import styles from './blog-post.module.scss';

interface P {
  data: BlogPost;
  mdxSource: MDXRemoteSerializeResult;
}

export const BlogPostView = ({ data, mdxSource }: P) => {
  const { i18n } = useTranslation();

  return (
    <>
      <LogoSettingsBlock className={styles.logo_language_switch} />
      <section className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{data.title}</h2>
          <div>
            <MDXRemote {...mdxSource} />
          </div>
          <NoSsr>
            <time className={styles.time}>
              {tunedDayjs(new Date(data.createdDate))
                .locale(i18n.language)
                .fromNow()}
            </time>
          </NoSsr>
        </div>
        <div className={styles.img_container}>
          <Container16x9>
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </Container16x9>
        </div>
      </section>
    </>
  );
};
