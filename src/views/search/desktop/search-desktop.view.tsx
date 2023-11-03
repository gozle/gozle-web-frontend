import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef } from 'react';

import { Pagination } from '@/components/base';
import { PageBlockWrapper } from '@/components/common';
import { InfoCard, PeopleSearches, Suggestion } from '@/components/search';
import { getSearchLink } from 'lib/helpers';
import { useAppSelector, useQueryPage } from 'lib/hooks';
import { useWebSearchQuery } from 'services/app-api';
import { useSearchInfoQuery } from 'services/info';

import {
  collapseImage,
  toggleFullDescriptionListener,
} from '../search-result-list';

import styles from './search-desktop.module.scss';

interface P {
  className?: string;
  searches: string[];
}

const SearchDesktopView = ({ className, searches }: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation('search');
  const router = useRouter();
  const { query, page } = useQueryPage(router);
  const colorScheme = useAppSelector((state) => state.colorScheme);
  const ip = useAppSelector((state) => state.settings.ip);
  const userAgent = useAppSelector((state) => state.settings.userAgent);

  const { data } = useWebSearchQuery({
    headers: { 'user-agent': userAgent, 'x-user-ip': ip },
    query,
    page,
    language: i18n.language,
    theme: colorScheme || undefined,
  });

  // const { data: infoData } = useSearchInfoQuery({
  //   query,
  //   language: i18n.language,
  // });

  const getUrlForPage = (page: number) =>
    `${router.pathname}?q=${encodeURIComponent(query)}&page=${page}`;

  const suggestion = useMemo(
    () =>
      data?.suggestion
        ? {
            suggestion: data.suggestion,
            href: `${router.pathname}?q=${encodeURIComponent(
              data.suggestion.replace(/(<([^>]+)>)/gi, ''),
            )}`,
          }
        : null,
    [data, router.pathname],
  );

  useEffect(() => {
    const current = ref.current;
    if (data && current) {
      let elements = current.querySelectorAll('.show-full-description');
      elements.forEach((el) =>
        el.addEventListener('click', toggleFullDescriptionListener),
      );
      elements = current.querySelectorAll('.hide-full-description');
      elements.forEach((el) =>
        el.addEventListener('click', toggleFullDescriptionListener),
      );
      elements = current.querySelectorAll('.image');
      elements.forEach((el) => collapseImage(el));
    }
  }, [data]);

  return (
    <section className={styles.container + ' ' + className}>
      <div className={styles.block_central}>
        <main className={styles.main_content}>
          <header className={styles.header}>
            {/* {data && (
              <div className={styles.search_results_summary}>
                {t('results_summary', {
                  amount: data.total,
                  time: (data.time / 1000).toFixed(4),
                })}
              </div>
            )} */}
            {suggestion && <Suggestion {...suggestion} />}
          </header>
          {data && (
            <div ref={ref} dangerouslySetInnerHTML={{ __html: data.html }} />
          )}
          <footer>
            <PeopleSearches searches={searches} getLink={getSearchLink} />
            {data && data.last_page > 1 && (
              <Pagination
                className={styles.pagination}
                currentPage={page}
                lastPage={data.last_page || 1}
                pagesAmount={7}
                activeStyles={
                  styles.pagination_active +
                  ' ' +
                  (colorScheme === 'dark' ? styles.dark : '')
                }
                getUrlForPage={getUrlForPage}
              />
            )}
          </footer>
        </main>
        <section className={styles.additional_content}>
          {/* {infoData && (
            <PageBlockWrapper withPaddings={true}>
              <InfoCard data={infoData} />
            </PageBlockWrapper>
          )} */}
        </section>
      </div>
    </section>
  );
};

export default SearchDesktopView;
