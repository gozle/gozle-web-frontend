import Link from 'next/link';
import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { ImgIconInRound } from '@/components/common';
import { getNewsLink } from 'lib/helpers';
import { type NewsBaseData } from 'lib/types';

import styles from './breaking-news-list-item.module.scss';

interface P {
  data: NewsBaseData;
  small?: boolean;
}

export const BreakingNewsListItem = ({ data, small }: P) => (
  <li>
    <Link className={styles.item} href={getNewsLink(data.id)}>
      <ImgIconInRound
        className={styles.icon}
        src={data.src.icon}
        alt={data.title}
      />
      <TrimmedTypography numOfLines={small ? 2 : 1} className={styles.title}>
        {data.title}
      </TrimmedTypography>
    </Link>
  </li>
);
