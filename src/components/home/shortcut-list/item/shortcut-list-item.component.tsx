import Image from 'next/image';
import React from 'react';

import { TrimmedTypography } from '@/components/base';
import type { Service } from 'lib/types';

import styles from './shortcut-list-item.module.scss';

interface P {
  className?: string;
  data: Service;
}

const defaultBackground = 'rgba(255,170,153,0.2)';

export const ShortcutListItem = ({ className = '', data }: P) => (
  <a
    className={styles.shortcut_li + ' ' + className}
    href={data.src}
    rel="external"
    style={{ backgroundColor: data.color || defaultBackground }}
  >
    <div className={styles.icon}>
      <Image src={data.icon} alt={data.src} height={40} width={40} />
    </div>
    <TrimmedTypography className={styles.title} numOfLines={1}>
      {data.title}
    </TrimmedTypography>
    <TrimmedTypography className={styles.description} numOfLines={2}>
      {data.description}
    </TrimmedTypography>
  </a>
);
