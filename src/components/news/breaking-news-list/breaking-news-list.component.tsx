import React from 'react';

import { type NewsBaseData } from 'lib/types';

import styles from './breaking-news-list.module.scss';
import { BreakingNewsListItem } from './item';

interface P {
  breakingNews: NewsBaseData[];
  small?: boolean;
}

export const BreakingNewsList = ({ breakingNews, small }: P) => {
  return (
    <ul className={styles.breaking_news_list}>
      {breakingNews.map((data) => (
        <BreakingNewsListItem key={data.id} data={data} small={small} />
      ))}
    </ul>
  );
};
