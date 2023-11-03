import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { ImgIconInRound } from '@/components/common';
import { Site } from 'lib/types';

import styles from './site-list-item.module.scss';

interface P {
  data: Site;
}

export const SiteListItem = (props: P) => (
  <li>
    <a
      className={styles.site_li}
      href={props.data.src}
      rel="external noopener noreferrer"
      target="_blank"
    >
      <ImgIconInRound
        className={styles.icon}
        src={props.data.icon}
        alt={props.data.src}
        next={true}
      />
      <div className={styles.content}>
        <TrimmedTypography className={styles.name} numOfLines={1}>
          {props.data.title}
        </TrimmedTypography>
        <TrimmedTypography className={styles.description} numOfLines={1}>
          {props.data.description}
        </TrimmedTypography>
      </div>
    </a>
  </li>
);
