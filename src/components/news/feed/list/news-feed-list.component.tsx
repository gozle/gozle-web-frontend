import React from 'react';

import { HorizontalScrollContainer } from '@/components/common';
import type { NewsFeed } from 'lib/types';

import { NewsFeedListItem } from './item';
import styles from './news-feed-list.module.scss';

interface P {
  feeds: NewsFeed[];
  onClick?: (event: React.MouseEvent) => void;
}

export const NewsFeedList = ({ feeds, onClick }: P) => (
  <HorizontalScrollContainer>
    {feeds.map((data) => (
      <NewsFeedListItem
        key={data.id}
        className={styles.feed + ' ' + styles.paddings}
        data={data}
        onClick={onClick}
      />
    ))}
  </HorizontalScrollContainer>
);
