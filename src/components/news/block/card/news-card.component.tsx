import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { NoSsr, TrimmedTypography } from '@/components/base';
import {
  AmountOfViews,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from '@/components/common';
import { getNewsLink } from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { NewsBaseData } from 'lib/types';

import { NewsSrc } from '../../news-src';

import styles from './news-card.module.scss';

export interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  className?: string;
  data: NewsBaseData;
}

export const NewsCard = ({ ImageProps, className = '', data }: P) => {
  const { i18n } = useTranslation();
  const href = getNewsLink(data.id);

  return (
    <Card className={className}>
      <CardMedia
        className={styles.img_container}
        src={data.img}
        alt={data.title}
        href={href}
        ImageProps={ImageProps}
      />
      <CardHeader
        title={
          <Link href={href}>
            <TrimmedTypography className={styles.title} numOfLines={3}>
              {data.title}
            </TrimmedTypography>
          </Link>
        }
      />
      <CardContent>
        <footer className={styles.footer}>
          <div className={styles.src_views}>
            <NewsSrc
              className={styles.src}
              icon={data.src.icon}
              name={data.src.name}
            />
            <span className={styles.bullet}>•</span>
            <AmountOfViews className={styles.views} views={data.views} />
          </div>
          <NoSsr>
            <time>
              {tunedDayjs.unix(data.timestamp).locale(i18n.language).fromNow()}
            </time>
          </NoSsr>
        </footer>
      </CardContent>
    </Card>
  );
};
