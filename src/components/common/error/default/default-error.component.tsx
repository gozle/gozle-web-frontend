import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './default-error.module.scss';

interface P {
  className?: string;
  style?: React.CSSProperties;
  text?: string;
}

export const DefaultError = ({ className = '', style, text }: P) => {
  const { t } = useTranslation();
  return (
    <div className={styles.default_error + ' ' + className} style={style}>
      <span>{text || t('smth_went_wrong')}</span>
    </div>
  );
};
