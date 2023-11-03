import { sanitize } from 'isomorphic-dompurify';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { AppThemeContext } from 'pages/_app';

import styles from './suggestion.module.scss';

interface P {
  className?: string;
  href: string;
  suggestion: string;
}

export const Suggestion = ({ className = '', href, suggestion }: P) => {
  const { t } = useTranslation('search');
  const theme = useContext(AppThemeContext);
  return (
    <div className={styles.suggestion + ' ' + className}>
      <span className={styles.suggestion_title}>{t('results_suggestion')}</span>
      <Link href={href}>
        <span
          style={{ color: theme?.palette.search.title }}
          className={styles.suggestion_value}
          dangerouslySetInnerHTML={{
            __html: sanitize(suggestion, { ALLOWED_TAGS: ['b', 'i'] }),
          }}
        />
      </Link>
    </div>
  );
};
