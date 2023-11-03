import Image from 'next/image';
import React, { useContext } from 'react';

import { PageBlockWrapper } from '@/components/common';
import type { NewsFeed } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './news-feed-list-item.module.scss';

interface P {
  className?: string;
  data: NewsFeed;
  onClick?: (event: React.MouseEvent) => void;
}

export const NewsFeedListItem = ({ className = '', data, onClick }: P) => {
  const theme = useContext(AppThemeContext);

  return (
    <div
      className={styles.list_item_container + ' ' + className}
      style={{ cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
      data-id={data.id}
    >
      <PageBlockWrapper
        className={styles.list_item_wrapper}
        withPaddings={true}
        pageBlockStyle={{
          backgroundColor: theme?.palette.background.contrast,
        }}
      >
        <div className={styles.list_item}>
          <Image
            className={styles.feed_icon}
            src={data.icon}
            alt={data.name}
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
          />
          <div className={styles.feed_name}>{data.name}</div>
        </div>
      </PageBlockWrapper>
    </div>
  );
};
