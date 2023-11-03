import { sanitize } from 'isomorphic-dompurify';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { NewsExtendedData } from 'lib/types';

import { NewsBlockBigHeader } from '../news-block-big-header';
import { NewsBlockBigImage } from '../news-block-big-image';
import commonStyles from '../news-block-big.module.scss';

import styles from './news-block-big-desktop.module.scss';

interface P {
  className?: string;
  data: NewsExtendedData;
}

export const NewsBlockBigDesktop = ({ className = '', data }: P) => {
  const { t } = useTranslation('news');

  return (
    <article className={styles.news_block + ' ' + className}>
      <div className={styles.content}>
        <NewsBlockBigHeader
          title={data.title}
          src={data.src}
          timestamp={data.timestamp}
          views={data.views}
        />
        <div className={commonStyles.description}>
          {data.img && (
            <NewsBlockBigImage
              className={styles.img}
              title={data.title}
              img={data.img}
            />
          )}
          {sanitize(data.description, { ALLOWED_TAGS: [] })}
        </div>
        <div className={commonStyles.actions_read_full__container}>
          <a
            className={commonStyles.read_full}
            href={data.src.link}
            rel="external"
          >
            {t('read_full')}
          </a>
        </div>
      </div>
    </article>
  );
};
