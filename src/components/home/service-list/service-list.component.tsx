import React from 'react';

import type { Service } from 'lib/types';

import { ServiceListItem } from './item';
import styles from './service-list.module.scss';

interface P {
  services: Service[];
}

export const ServiceList = (props: P) => (
  <ul className={styles.list}>
    {props.services.map((data) => (
      <ServiceListItem key={data.id} data={data} />
    ))}
  </ul>
);
