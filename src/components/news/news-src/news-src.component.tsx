import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { ImgIconInRound } from '@/components/common';

import styles from './news-src.module.scss';

interface P {
  className?: string;
  icon: string;
  name: string;
  onClick?: () => void;
  reverse?: boolean;
}

export const NewsSrc = ({
  className = '',
  icon,
  name,
  onClick,
  reverse,
}: P) => (
  <div
    className={
      (reverse ? styles.news_src_reverse : styles.news_src) + ' ' + className
    }
    style={{ cursor: onClick ? 'pointer' : undefined }}
    onClick={onClick}
  >
    <ImgIconInRound className={styles.icon} src={icon} alt={name} next={true} />
    <TrimmedTypography Component="cite" className={styles.name} numOfLines={2}>
      {name}
    </TrimmedTypography>
  </div>
);
