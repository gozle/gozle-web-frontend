import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { NewsCardWrappedList } from '@/components/news/list';
import { WithPrevMoreLayout } from '@/layouts';
import {
  BreakingNewsBlock,
  PageTitledBlock,
  WrappedAdvContainerBlock,
} from '@/page-blocks';
import { NewsBaseData } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import styles from './news-wrapped-list.module.scss';

interface P {
  children?: React.ReactNode;
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
  title?: React.ReactNode;
}

export const NewsWrappedListLayout = ({
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedNews,
  title,
  ...props
}: P) => {
  let children = props.children || (
    <WithPrevMoreLayout
      minPage={minPage}
      maxPage={maxPage}
      isFetching={isFetching}
      data={data}
    >
      {reducedNews.length > 0 && (
        <NewsCardWrappedList
          news={reducedNews}
          bigCardImageSize="25vw"
          cardImageSize="(max-width: 496px) 100vw, (max-width: 785px) 50vw, (max-width: 1039px) 33vw, (max-width: 1439px) 25vw, 20vw"
        />
      )}
    </WithPrevMoreLayout>
  );

  if (title)
    children = (
      <PageTitledBlock className={styles.news_list_container} title={title}>
        {children}
      </PageTitledBlock>
    );

  return (
    <div className={className}>
      <div className={styles.page_block__central}>
        <main className={styles.media_content}>
          <div className={styles.main_content}>{children}</div>
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
};

// secondBlock
// imageSize: '(max-width: 1239px) 15vw, 10vw',
