import React from 'react';

import { NewsCardList } from '@/components/news/list';
import { WithPrevMoreLayout } from '@/layouts';
import { WrappedAdvContainerBlock } from '@/page-blocks';
import { NewsBaseData } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import styles from './news-feed-mobile.module.scss';

interface P {
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsFeedMobileView = ({
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedNews,
}: P) => (
  <div className={className}>
    <main>
      <WrappedAdvContainerBlock
        className={styles.adv_mobile}
        type="horizontal-small"
      />
      <WithPrevMoreLayout
        minPage={minPage}
        maxPage={maxPage}
        isFetching={isFetching}
        data={data}
      >
        {reducedNews.length > 0 && <NewsCardList news={reducedNews} />}
      </WithPrevMoreLayout>
    </main>
  </div>
);

export default NewsFeedMobileView;
