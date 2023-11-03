import React from 'react';

import { InfoData } from 'lib/types';

import styles from './info-card-contacts.module.scss';

interface P {
  className?: string;
  data: InfoData['contacts'];
}

export const InfoCardContacts = ({ className = '', data }: P) => (
  <div className={styles.container + ' ' + className}>
    {data.map((el) => (
      <div className={styles.row} key={el.id}>
        <div className={styles.label}>{el.name}</div>
        <div className={styles.value}>{el.info}</div>
      </div>
    ))}
  </div>
);
