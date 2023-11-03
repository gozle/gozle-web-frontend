import { useTranslation } from 'next-i18next';
import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { PopularNewsFeedListContainer } from '@/containers';
import NewsSVG from 'public/icons/news.svg';

import styles from './popular-news-feed.module.scss';

interface P {
  className?: string;
}

export const PopularNewsFeedBlock = ({ className }: P) => {
  const { t } = useTranslation('news');

  return (
    <section className={className}>
      <PageBlockWrapper className={styles.container} withPaddings={true}>
        <header className={styles.header}>
          <div className={styles.icon}>
            <NewsSVG />
          </div>
          <div className={styles.title}>{t('popular_feeds')}</div>
        </header>
        <div className={styles.feed_list}>
          <PopularNewsFeedListContainer />
        </div>
      </PageBlockWrapper>
    </section>
  );
};
