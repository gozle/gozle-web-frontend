import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './weather-block-permission-request.module.scss';

interface P {
  className?: string;
}

export const WeatherBlockPermissionRequest = ({ className = '' }: P) => {
  const { t } = useTranslation('weather');

  return (
    <section className={styles.block + ' ' + className}>
      <div className={styles.text}>{t('permission_text')}</div>
    </section>
  );
};
