import { useTranslation } from 'next-i18next';
import React from 'react';

import { NoSsr } from '@/components/base';
import { AmountOfViews } from '@/components/common';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';

import styles from './video-card-footer.module.scss';

interface P {
  className?: string;
  timestamp: number;
  views: number;
}

export const VideoCardFooter = ({ className = '', timestamp, views }: P) => {
  const { i18n } = useTranslation();

  return (
    <footer className={styles.footer + ' ' + className}>
      <AmountOfViews views={views} />
      <NoSsr>
        <time>{tunedDayjs(timestamp).locale(i18n.language).fromNow()}</time>
      </NoSsr>
    </footer>
  );
};
