import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Container4x3, Img4x3 } from '@/components/base';
import type { AdvData } from 'lib/types';

import styles from './adv-horizontal-small.module.scss';

interface P {
  className?: string;
  data: AdvData;
}

export const AdvHorizontalSmall = ({ className, data }: P) => {
  const { t } = useTranslation();

  const src = data.img === 'None' ? '' : data.img;

  return (
    <section className={className}>
      <Link href={data.src.link} className={styles.horizontal} rel="external">
        <div className={styles.img_container}>
          {src ? (
            <Container4x3 className={styles.img}>
              <Image
                src={src}
                alt={data.title}
                fill
                sizes="140px"
                style={{ objectFit: 'cover' }}
              />
            </Container4x3>
          ) : (
            <Img4x3 className={styles.img} src={data.img} alt={data.title} />
          )}
        </div>
        <div className={styles.info}>
          <header className={styles.header}>
            <div className={styles.src}>
              {data.src.name && (
                <div className={styles.src_name}>{data.src.name}</div>
              )}
              <div className={styles.sign}>{t('adv_sign')}</div>
            </div>
            <div className={styles.title}>{data.title}</div>
          </header>
        </div>
      </Link>
    </section>
  );
};
