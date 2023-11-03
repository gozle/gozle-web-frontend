import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import styles from './pagination.module.scss';

interface P {
  activeStyles: string;
  className?: string;
  currentPage: number;
  getUrlForPage: (page: number) => string;
  lastPage: number;
  pagesAmount: number;
}

export const Pagination = ({
  className = '',
  currentPage,
  lastPage,
  pagesAmount,
  ...props
}: P) => {
  const { t } = useTranslation();

  const pagesAround = useMemo(() => Math.floor(pagesAmount / 2), [pagesAmount]);

  const prevPages = useMemo(() => {
    const length = Math.min(currentPage - 1, pagesAround);
    return Array.from({ length: length }).map(
      (_, i) => currentPage - length + i,
    );
  }, [currentPage, pagesAround]);

  const nextPages = useMemo(
    () =>
      Array.from({ length: Math.min(lastPage - currentPage, pagesAround) }).map(
        (_, i) => currentPage + i + 1,
      ),
    [lastPage, currentPage, pagesAround],
  );

  return (
    <div className={styles.pagination + ' ' + className}>
      {currentPage !== 1 && (
        <Link href={props.getUrlForPage(1)}>
          <span className={styles.to_start + ' ' + props.activeStyles}>
            {t('pagination_to_start')}
          </span>
        </Link>
      )}
      {prevPages.map((el) => (
        <Link href={props.getUrlForPage(el)} key={el}>
          <span className={styles.pagination_el + ' ' + props.activeStyles}>
            {el}
          </span>
        </Link>
      ))}
      <span className={styles.pagination_el}>{currentPage}</span>
      {nextPages.map((el) => (
        <Link href={props.getUrlForPage(el)} key={el}>
          <span className={styles.pagination_el + ' ' + props.activeStyles}>
            {el}
          </span>
        </Link>
      ))}
      {currentPage < lastPage && (
        <Link href={props.getUrlForPage(currentPage + 1)}>
          <span className={styles.to_next + ' ' + props.activeStyles}>
            {t('pagination_to_next')}
          </span>
        </Link>
      )}
    </div>
  );
};
