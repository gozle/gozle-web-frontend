import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useAppSelector } from 'lib/hooks';
import SearchSVG from 'public/icons/search.svg';

import styles from './people-searches.module.scss';

interface P {
  className?: string;
  getLink: (query: string) => string;
  searches: string[];
}

export const PeopleSearches = ({ className = '', getLink, searches }: P) => {
  const { t } = useTranslation('search');
  const theme = useAppSelector((state) => state.colorScheme);
  return (
    <div className={styles.people_searches__container + ' ' + className}>
      <div className={styles.people_searches__title}>
        {t('people_searches')}
      </div>
      <ul className={styles.people_searches}>
        {searches.map((el) => (
          <Link key={el} href={getLink(el)}>
            <div className={theme === 'dark' ? styles.dark : undefined}>
              <span className={styles.icon}>
                <SearchSVG />
              </span>
              <span>{el}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
