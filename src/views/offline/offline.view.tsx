import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import styles from './offline.module.scss';

interface P {
  className?: string;
}

const OfflineView = ({ className = '' }: P) => {
  const { t } = useTranslation();

  return (
    <section className={styles.offline_page + ' ' + className}>
      <h1>{t('no_internet_connection')}</h1>
      <h2>{t('check_internet_connection')}</h2>
    </section>
  );
};

export default OfflineView;
