import { useTranslation } from 'next-i18next';
import React from 'react';

import { NewsCardSwiper } from '@/components/news/card-swiper';
import { useTouchscreen } from 'lib/hooks';
import { useGetPopularNewsQuery } from 'services/news-api';

import { PageTitledBlock } from '../page-titled';

import styles from './popular-news.module.scss';

interface P {
  className?: string;
}

export const PopularNewsBlock = ({ className }: P) => {
  const { t, i18n } = useTranslation('news');
  const { data: popularNews } = useGetPopularNewsQuery({
    language: i18n.language,
  });

  const touchscreen = useTouchscreen();

  return popularNews?.data.length ? (
    <PageTitledBlock className={className} title={t('popular_news_title')}>
      <NewsCardSwiper
        className={
          styles.swiper + ' ' + (touchscreen ? styles.touchscreen : '')
        }
        news={popularNews?.data}
        imageSize={264}
      />
    </PageTitledBlock>
  ) : (
    <></>
  );
};
