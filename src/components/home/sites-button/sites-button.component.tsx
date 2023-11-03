import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ServicesSVG from 'public/icons/services.svg';

import styles from './sites-button.module.scss';

export const SitesButton = () => {
  const { t } = useTranslation();

  return (
    <Link className={styles.sites_btn} href="/sites">
      <span>{t('sites_title')}</span>
      <span className={styles.icon}>
        <ServicesSVG />
      </span>
    </Link>
  );
};
