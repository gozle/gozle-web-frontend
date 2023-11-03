import Link from 'next/link';
import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { Card, CardContent, CardHeader, CardMedia } from '@/components/common';
import { getVideoLink } from 'lib/helpers';
import type { VideoData } from 'lib/types';

import { Duration } from '../../duration';
import { VideoSrc } from '../../src';

import { VideoCardFooter } from './footer';
import styles from './video-card.module.scss';

export interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  className?: string;
  data: VideoData;
}

export const VideoCard = ({ ImageProps, className, data }: P) => (
  <Card className={className}>
    <CardMedia
      ImageProps={ImageProps}
      alt={data.title}
      className={styles.img_container}
      extraItems={
        data.duration ? <Duration value={data.duration} /> : undefined
      }
      href={getVideoLink(data.id)}
      src={data.thumbnail}
    />
    <CardHeader
      title={
        <Link href={getVideoLink(data.id)}>
          <TrimmedTypography className={styles.title} numOfLines={3}>
            {data.title}
          </TrimmedTypography>
        </Link>
      }
    />
    <CardContent>
      {data.src.icon && (
        <div className={styles.src_container}>
          <VideoSrc name={data.src.name} icon={data.src.icon} />
        </div>
      )}
      <VideoCardFooter
        className={styles.footer}
        views={data.views}
        timestamp={data.timestamp}
      />
    </CardContent>
  </Card>
);
