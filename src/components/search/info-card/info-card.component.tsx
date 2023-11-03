import React from 'react';

import { InfoData } from 'lib/types';

import { InfoCardContacts } from './contacts';
import { InfoCardImages } from './images';
import styles from './info-card.module.scss';
import { InfoCardLinks } from './links';

interface P {
  className?: string;
  data: InfoData;
}

export const InfoCard = ({ className = '', data }: P) => {
  return (
    <article className={styles.container + ' ' + className}>
      {data.logo && (
        <div className={styles.logo}>
          <img src={data.logo} alt={data.title} />
        </div>
      )}
      <div className={styles.title}>{data.title}</div>
      {/* {data.subtitle && <div className={styles.subtitle}>{data.subtitle}</div>} */}
      {data.images.length > 0 && (
        <InfoCardImages
          className={styles.images}
          data={data.images}
          iframe={data.iframe}
        />
      )}
      <div className={styles.description}>{data.description}</div>
      {data.contacts.length > 0 && (
        <InfoCardContacts className={styles.contacts} data={data.contacts} />
      )}
      {data.links.length > 0 && (
        <InfoCardLinks className={styles.links} data={data.links} />
      )}
    </article>
  );
};
