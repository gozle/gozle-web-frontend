import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { Service } from 'lib/types';

import styles from './service-list-item.module.scss';

interface P {
  data: Service;
}

export const ServiceListItem = ({ data }: P) => (
  <li>
    <Link className={styles.item} href={data.src} rel="external">
      <div className={styles.icon}>
        <Image src={data.icon} alt={data.src} height={30} width={30} />
      </div>
      <div className={styles.title}>{data.title}</div>
    </Link>
  </li>
);
