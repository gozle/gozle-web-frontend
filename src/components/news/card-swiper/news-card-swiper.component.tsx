import React from 'react';

import {
  HorizontalScrollContainer,
  PageBlockWrapper,
} from '@/components/common';
import type { NewsBaseData } from 'lib/types';

import { NewsCard } from '../block';

import styles from './news-card-swiper.module.scss';

interface P {
  className?: string;
  imageSize: number;
  news: NewsBaseData[];
}

export const NewsCardSwiper = ({ className = '', imageSize, news }: P) => (
  <div className={styles.container + ' ' + className}>
    <HorizontalScrollContainer>
      {news.map((data) => (
        <PageBlockWrapper
          key={data.id}
          className={styles.paddings + ' ' + styles.news_block}
          style={{ width: `calc(${imageSize}px + 1em)` }}
        >
          <NewsCard
            data={data}
            ImageProps={{
              sizes: `(max-width: calc((${imageSize}px + 1em) * 2)) 75vw, (max-width: calc((${imageSize}px + 1em) * 3)) 33vw, 25vw`,
            }}
          />
        </PageBlockWrapper>
      ))}
    </HorizontalScrollContainer>
  </div>
);

export default NewsCardSwiper;
