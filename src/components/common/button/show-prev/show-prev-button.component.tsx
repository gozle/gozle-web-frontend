import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { PageBlockWrapper } from '../../page-block-wrapper';

import styles from './show-prev-button.module.scss';

interface P {
  className?: string;
  disabled?: boolean;
  page: number;
  shallow?: boolean;
}

export const ShowPrevButton = ({
  className = '',
  disabled,
  page,
  shallow,
}: P) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    if (page > 1)
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: page - 1 },
        },
        undefined,
        { scroll: false, shallow },
      );
  };

  return (
    <div className={styles.container + ' ' + className}>
      <PageBlockWrapper>
        <button
          className={styles.button}
          onClick={handleClick}
          disabled={disabled}
        >
          {t('show_previous')}
        </button>
      </PageBlockWrapper>
    </div>
  );
};
