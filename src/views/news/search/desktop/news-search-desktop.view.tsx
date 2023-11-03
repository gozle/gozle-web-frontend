import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { NewsHorizontalList } from '@/components/news/list';
import { WithPrevMoreLayout } from '@/layouts';
import { BreakingNewsBlock, WrappedAdvContainerBlock } from '@/page-blocks';
import { NewsBaseData } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import styles from './news-search-desktop.module.scss';

interface P {
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsSearchDesktopView = ({
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedNews,
}: P) => (
  <div className={className}>
    <div className={styles.page_block__central}>
      <main className={styles.media_content}>
        <div className={styles.main_content}>
          <WithPrevMoreLayout
            minPage={minPage}
            maxPage={maxPage}
            isFetching={isFetching}
            data={data}
          >
            {reducedNews.length > 0 && (
              <NewsHorizontalList news={reducedNews} />
            )}
          </WithPrevMoreLayout>
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
export default NewsSearchDesktopView;
