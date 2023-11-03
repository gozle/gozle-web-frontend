import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { Suspense, useState } from 'react';

import { ShowMoreButton } from '@/components/common';
import { usePaginatedData } from 'lib/hooks';
import type { NewsCategory } from 'lib/types';
import { useGetLatestNewsQuery } from 'services/news-api';

import { PageTitledBlock } from '../page-titled';

import styles from './latest-news.module.scss';

const NewsHorizontalList = dynamic(
  () =>
    import('@/components/news/list/horizontal/news-horizontal-list.component'),
  { suspense: true },
);
const NewsCardList = dynamic(
  () => import('@/components/news/list/card/news-card-list.component'),
  { suspense: true },
);

interface P {
  category?: NewsCategory | null;
  className?: string;
  mobile?: boolean;
}

export const LatestNewsBlock = ({ category, className, mobile }: P) => {
  const [page, setPage] = useState<number>(1);
  const { t, i18n } = useTranslation('news');
  const { data, isFetching } = useGetLatestNewsQuery({
    language: i18n.language,
    page,
    slug: category?.slug,
  });
  const { reducedData: reducedNews } = usePaginatedData(data);

  return (
    <PageTitledBlock
      className={className}
      title={category?.name || t('all_news_title')}
    >
      <div>
        <Suspense>
          {mobile ? (
            <NewsCardList news={reducedNews} />
          ) : (
            <NewsHorizontalList news={reducedNews} />
          )}
        </Suspense>
      </div>
      {data &&
        data.data.length === data.pagination.itemsPerPage &&
        data.pagination.currentPage < data.pagination.totalPages && (
          <footer>
            <ShowMoreButton
              className={styles.show_more}
              page={data.pagination.currentPage}
              lastPage={data.pagination.totalPages}
              scroll={true}
              disabled={isFetching}
              onClick={() => setPage(data.pagination.currentPage + 1)}
            />
          </footer>
        )}
    </PageTitledBlock>
  );
};
