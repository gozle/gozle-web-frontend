import { Url } from 'url';

import Link from 'next/link';
import React from 'react';

import { TrimmedTypography } from '@/components/base';
import type { VideoChannelData } from 'lib/types';

import styles from './video-channel-list.module.scss';

interface P {
  data: VideoChannelData;
  getLink: (id: number) => string | Url;
}

export const VideoChannelListItem = ({ data, getLink }: P) => (
  <Link href={getLink(data.id)}>
    <div className={styles.container}>
      <div className={styles.avatar_container}>
        {data.avatar && (
          <img src={data.avatar} alt={data.name} height={60} width={60} />
        )}
      </div>
      <TrimmedTypography className={styles.name} numOfLines={2}>
        {data.name}
      </TrimmedTypography>
    </div>
  </Link>
);
