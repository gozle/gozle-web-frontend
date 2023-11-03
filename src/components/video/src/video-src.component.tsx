import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { ImgIconInRound } from '@/components/common';

import styles from './video-src.module.scss';

interface P {
  className?: string;
  icon?: string | null;
  iconSize?: 'large' | 'medium';
  name: string;
  onClick?: () => void;
  reverse?: boolean;
}

export const VideoSrc = ({
  className = '',
  icon,
  iconSize = 'medium',
  name,
  onClick,
  reverse,
}: P) => (
  <div
    className={
      (reverse ? styles.video_src_reverse : styles.video_src) + ' ' + className
    }
    style={{ cursor: onClick ? 'pointer' : undefined }}
    onClick={onClick}
  >
    {icon && (
      <ImgIconInRound
        className={
          styles.icon + (iconSize === 'large' ? ' ' + styles.icon_large : '')
        }
        src={icon}
        alt={name}
        paddings={false}
      />
    )}
    <TrimmedTypography Component="cite" className={styles.name} numOfLines={2}>
      {name}
    </TrimmedTypography>
  </div>
);
