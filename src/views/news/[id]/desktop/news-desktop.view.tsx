import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { NewsBlockBigDesktop } from '@/components/news/block';
import {
  LatestNewsBlock,
  BreakingNewsBlock,
  PopularNewsBlock,
  WrappedAdvContainerBlock,
} from '@/page-blocks';
import { NewsCategory, NewsExtendedData } from 'lib/types';

import styles from './news-desktop.module.scss';

interface P {
  category?: NewsCategory | null;
  className?: string;
  data: NewsExtendedData;
}

const NewsDesktopView = ({ className, category, data }: P) => (
  <div className={className}>
    <div className={styles.page_block__central}>
      <main className={styles.media_content}>
        <div className={styles.main_content}>
          <PageBlockWrapper withPaddings={true}>
            <NewsBlockBigDesktop data={data} />
          </PageBlockWrapper>
          <PopularNewsBlock className="page-margins-1" />
          <WrappedAdvContainerBlock type="horizontal" />
          <LatestNewsBlock className="page-margins-1" category={category} />
        </div>
        <div className={styles.sidebar_content}>
          <PageBlockWrapper withPaddings={true}>
            <BreakingNewsBlock />
          </PageBlockWrapper>
          <WrappedAdvContainerBlock
            type="card-simple"
            ImageProps={{ sizes: '(max-width: 1439px) 25vw, 20vw' }}
          />
        </div>
      </main>
    </div>
  </div>
);
export default NewsDesktopView;
