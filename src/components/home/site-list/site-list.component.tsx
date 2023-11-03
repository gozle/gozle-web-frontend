import React from 'react';

import { Site } from 'lib/types';

import { SiteListItem } from './item';
import styles from './site-list.module.scss';

interface P {
  sites: Site[];
}

export const SiteList = (props: P) => (
  <ul className={styles.site_list}>
    {props.sites.map((data) => (
      <SiteListItem key={data.id} data={data} />
    ))}
  </ul>
);
