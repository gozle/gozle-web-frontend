import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { NoSsr, TrimmedTypography } from '@/components/base';
import {
  AmountOfViews,
  CardMedia,
  HorizontalCard,
  HorizontalCardContent,
  HorizontalCardHeader,
} from '@/components/common';
import { getVideoLink } from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { VideoData } from 'lib/types';

import { Duration } from '../../duration';
import { VideoSrc } from '../../src';

import styles from './video-horizontal-card.module.scss';

interface P {
  ImageProps?: { width: number };
  className?: string;
  data: VideoData;
}

export const VideoHorizontalCard = ({ ImageProps, className, data }: P) => {
  const { i18n } = useTranslation();
  const src = data.thumbnail.indexOf('None') === 0 ? '' : data.thumbnail;

  const width = ImageProps?.width || 180;
  const small = width < 240;

  return (
    <HorizontalCard
      className={className}
      media={
        <CardMedia
          ImageProps={{ width }}
          alt={data.title}
          className={styles.img_container}
          extraItems={
            data.duration ? <Duration value={data.duration} /> : undefined
          }
          href={getVideoLink(data.id)}
          src={src}
        />
      }
    >
      <HorizontalCardHeader
        title={
          <Link href={getVideoLink(data.id)}>
            <TrimmedTypography className={styles.title} numOfLines={2}>
              {data.title}
            </TrimmedTypography>
          </Link>
        }
      />
      <HorizontalCardContent>
        <div className={styles.views_date + (small ? ' ' + styles.small : '')}>
          <AmountOfViews views={data.views} />
          <span className={styles.bullet}>•</span>
          <NoSsr>
            <time>
              {tunedDayjs(data.timestamp).locale(i18n.language).fromNow()}
            </time>
          </NoSsr>
        </div>
        <div
          className={styles.src_container + (small ? ' ' + styles.small : '')}
        >
          <VideoSrc
            name={data.src.name}
            icon={small ? undefined : data.src.icon}
          />
        </div>
      </HorizontalCardContent>
    </HorizontalCard>
  );
};
