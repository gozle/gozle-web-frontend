import React from 'react';

import { ShowMoreButton, ShowPrevButton } from '@/components/common';
import { PaginatedResponse } from 'lib/types';

import styles from './prev-more.module.scss';

interface P {
  children: React.ReactNode;
  data?: PaginatedResponse<unknown> | null;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  shallow?: boolean;
}

export const WithPrevMoreLayout = ({
  children,
  data,
  isFetching,
  maxPage,
  minPage,
  shallow,
}: P) => {
  return (
    <>
      {minPage > 1 && (
        <ShowPrevButton
          className={styles.show_prev}
          page={minPage}
          disabled={isFetching}
          shallow={shallow}
        />
      )}
      {children}
      {data &&
        data.data.length === data.pagination.itemsPerPage &&
        maxPage < data.pagination.totalPages && (
          <footer>
            <ShowMoreButton
              className={styles.show_more}
              page={maxPage}
              lastPage={data.pagination.totalPages}
              scroll={true}
              disabled={isFetching}
              shallow={shallow}
            />
          </footer>
        )}
    </>
  );
};
