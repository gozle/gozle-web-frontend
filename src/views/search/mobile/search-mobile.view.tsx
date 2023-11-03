import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  PageBlockWrapper,
  ShowMoreButton,
  ShowPrevButton,
} from '@/components/common';
import { PeopleSearches, Suggestion } from '@/components/search';
import { getSearchLink } from 'lib/helpers';
import { useAppSelector, useQueryPage } from 'lib/hooks';
import { useWebSearchQuery } from 'services/app-api';

import {
  collapseImage,
  toggleFullDescriptionListener,
} from '../search-result-list';

import styles from './search-mobile.module.scss';

interface P {
  className?: string;
  searches: string[];
}

const SearchMobileView = ({ className, searches }: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { query, page } = useQueryPage(router);

  const { t, i18n } = useTranslation('search');

  const colorScheme = useAppSelector((state) => state.colorScheme);
  const ip = useAppSelector((state) => state.settings.ip);
  const userAgent = useAppSelector((state) => state.settings.userAgent);

  const { data, isFetching } = useWebSearchQuery({
    headers: { 'user-agent': userAgent, 'x-user-ip': ip },
    query,
    page,
    language: i18n.language,
    theme: colorScheme || undefined,
  });
  const [pagesHtml, setPagesHtml] = useState<
    { html: string; page: number; suggestion?: string }[]
  >(data ? [data] : []);

  useEffect(() => {
    if (query) setPagesHtml([]);
  }, [query]);

  useEffect(() => {
    if (data && data.page && data.html) {
      setPagesHtml((prev) =>
        [...prev.filter((el) => el.page !== data.page), data].sort((a, b) =>
          a.page > b.page ? 1 : -1,
        ),
      );
    }
  }, [data]);

  useEffect(() => {
    const current = ref.current;
    if (pagesHtml && current) {
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
  }, [pagesHtml]);

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

  const { minPage, maxPage } = useMemo(() => {
    let minPage = pagesHtml.length ? pagesHtml[0].page : 1;
    let maxPage = pagesHtml.length ? pagesHtml[0].page : 1;
    pagesHtml.forEach((el) => {
      if (el.page < minPage) minPage = el.page;
      if (el.page > maxPage) maxPage = el.page;
    });
    return { minPage, maxPage };
  }, [pagesHtml]);

  return (
    <section className={className}>
      <main ref={ref}>
        <header className={styles.header}>
          {suggestion && (
            <Suggestion className={styles.suggestion} {...suggestion} />
          )}
          {minPage > 1 && (
            <ShowPrevButton
              className={styles.show_prev}
              page={minPage}
              disabled={isFetching}
            />
          )}
        </header>
        {pagesHtml.length > 0 &&
          pagesHtml.map((el) =>
            el.page !== 1 ? (
              <div key={el.page} className={styles.page}>
                <div className={styles.page_title}>
                  {t('page_title', { page: el.page })}
                </div>
                <div dangerouslySetInnerHTML={{ __html: el.html }} />
              </div>
            ) : (
              <div
                key={el.page}
                dangerouslySetInnerHTML={{ __html: el.html }}
              />
            ),
          )}
        <footer>
          <PageBlockWrapper withPaddings={true}>
            <PeopleSearches
              className={styles.people_searches}
              searches={searches}
              getLink={getSearchLink}
            />
          </PageBlockWrapper>
          {data && maxPage < data.last_page && (
            <footer>
              <ShowMoreButton
                className={styles.show_more}
                page={maxPage}
                lastPage={data.last_page}
                scroll={true}
                disabled={isFetching}
              />
            </footer>
          )}
        </footer>
      </main>
    </section>
  );
};

export default SearchMobileView;
