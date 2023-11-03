import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { NoSsr, TrimmedTypography } from '@/components/base';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import { BlogPost } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './blog-post-list.module.scss';

interface P {
  blogPosts: BlogPost[];
  className?: string;
  getLink: (id: number | string) => string;
}

export const BlogPostList = ({ blogPosts, className = '', getLink }: P) => {
  const { t, i18n } = useTranslation();
  const theme = useContext(AppThemeContext);

  return (
    <section className={styles.container + ' ' + className}>
      <div className={styles.title}>{t('blog_posts')}</div>
      <ul className={styles.list}>
        {blogPosts.map((el) => (
          <li
            key={el.id}
            className={styles.item}
            style={{ backgroundColor: theme?.palette.background.contrast }}
          >
            <div className={styles.img_container}>
              {
                <Link href={getLink(el.id)}>
                  <Image
                    src={el.image}
                    alt={el.title}
                    width={160}
                    height={90}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              }
            </div>
            <div className={styles.content}>
              <Link href={getLink(el.id)}>
                <TrimmedTypography numOfLines={3} className={styles.item_title}>
                  {el.title}
                </TrimmedTypography>
              </Link>
              <NoSsr>
                <time className={styles.item_date}>
                  {tunedDayjs(new Date(el.createdDate))
                    .locale(i18n.language)
                    .fromNow()}
                </time>
              </NoSsr>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
