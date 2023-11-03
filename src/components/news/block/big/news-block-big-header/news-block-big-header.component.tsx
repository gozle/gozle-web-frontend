import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { AmountOfViews } from '@/components/common';
import { getNewsFeedLink } from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';

import { NewsSrc } from '../../../news-src';

import styles from './news-block-big-header.module.scss';

interface P {
  src: {
    icon: string;
    id?: number;
    link: string;
    name: string;
  };
  timestamp: number;
  title: string;
  views: number;
}

export const NewsBlockBigHeader = ({ src, timestamp, title, views }: P) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleSrcClick = () => {
    router.push({ pathname: getNewsFeedLink(src.id!) }, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <header>
      <div className={styles.title}>{title}</div>
      <div className={styles.src_datetime__container}>
        <NewsSrc
          className={styles.news_src}
          icon={src.icon}
          name={src.name}
          onClick={handleSrcClick}
        />
        <span className={styles.bullet}>•</span>
        <time>
          {tunedDayjs.unix(timestamp).locale(i18n.language).calendar()}
        </time>
        <span className={styles.bullet}>•</span>
        <AmountOfViews className={styles.views} views={views} />
      </div>
    </header>
  );
};
