import React from 'react';

import { PageBlockWrapper, WrapList } from '@/components/common';
import type { NewsBaseData } from 'lib/types';

import { NewsCard } from '../../block';

import styles from './news-card-list.module.scss';

interface P {
  className?: string;
  news: NewsBaseData[];
}

export const NewsCardList = ({ className = '', news }: P) => (
  <WrapList
    className={className}
    itemClassName={styles.list_item}
    data={news}
    render={(data: NewsBaseData) => (
      <PageBlockWrapper className={styles.wrapper}>
        <NewsCard
          data={data}
          ImageProps={{ sizes: '(max-width: 520px) 75vw, 33vw' }}
        />
      </PageBlockWrapper>
    )}
  />
);

export default NewsCardList;
