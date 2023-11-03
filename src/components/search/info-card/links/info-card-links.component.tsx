import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { HorizontalScrollContainer } from '@/components/common';
import { InfoData } from 'lib/types';

import styles from './info-card-links.module.scss';

interface P {
  className?: string;
  data: InfoData['links'];
}

export const InfoCardLinks = ({ className = '', data }: P) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container + ' ' + className}>
      <div className={styles.title}>{t('links')}</div>
      <div className={styles.list}>
        <HorizontalScrollContainer>
          {data.map((el) => (
            <Link
              className={styles.block}
              href={el.link}
              key={el.id}
              rel="external noopener noreferrer"
              target="_blank"
            >
              <div className={styles.icon}>
                <Image src={el.icon} alt={el.name} height={20} width={20} />
              </div>
              <div className={styles.label}>{el.name}</div>
            </Link>
          ))}
        </HorizontalScrollContainer>
      </div>
    </div>
  );
};
