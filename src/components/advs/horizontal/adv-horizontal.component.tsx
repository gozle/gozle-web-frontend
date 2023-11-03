import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Container16x9, Img16x9, TrimmedTypography } from '@/components/base';
import { ImgIconInRound } from '@/components/common';
import type { AdvData } from 'lib/types';

import styles from './adv-horizontal.module.scss';

interface P {
  className?: string;
  data: AdvData;
}

export const AdvHorizontal = ({ className, data }: P) => {
  const { t } = useTranslation();

  const src = data.img === 'None' ? '' : data.img;

  return (
    <section className={className}>
      <Link href={data.src.link} className={styles.horizontal} rel="external">
        <div className={styles.img_container}>
          {src ? (
            <Container16x9 className={styles.img}>
              <Image
                src={src}
                alt={data.title}
                fill
                sizes="230px"
                style={{ objectFit: 'cover' }}
              />
            </Container16x9>
          ) : (
            <Img16x9 className={styles.img} src={data.img} alt={data.title} />
          )}
        </div>
        <div className={styles.info}>
          <header className={styles.header}>
            <div className={styles.src}>
              {data.src.icon && data.src.name && (
                <ImgIconInRound
                  className={styles.src_icon}
                  src={data.src.icon}
                  alt={data.src.name}
                />
              )}
              {data.src.name && (
                <div className={styles.src_name}>{data.src.name}</div>
              )}
              <div className={styles.sign}>{t('adv_sign')}</div>
            </div>
            <div className={styles.title}>{data.title}</div>
          </header>
          <TrimmedTypography className={styles.description} numOfLines={2}>
            {data.description}
          </TrimmedTypography>
        </div>
      </Link>
    </section>
  );
};
