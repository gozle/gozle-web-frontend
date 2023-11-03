import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Container16x9, Img16x9 } from '@/components/base';
import type { AdvData } from 'lib/types';

import styles from './adv-card-simple.module.scss';

interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  className?: string;
  data: AdvData;
}

export const AdvCardSimple = ({ ImageProps, className, data }: P) => {
  const { t } = useTranslation();

  const src = data.img === 'None' ? '' : data.img;

  return (
    <section className={className}>
      <Link href={data.src.link} className={styles.card} rel="external">
        <div className={styles.img_container}>
          {src ? (
            ImageProps?.width ? (
              <Image
                className={styles.img}
                src={src}
                alt={data.title}
                width={ImageProps.width}
                height={ImageProps.width * 0.5625}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Container16x9 className={styles.img}>
                <Image
                  src={src}
                  alt={data.title}
                  fill
                  sizes={ImageProps?.sizes}
                  style={{ objectFit: 'cover' }}
                />
              </Container16x9>
            )
          ) : (
            <Img16x9 className={styles.img} src={data.img} alt={data.title} />
          )}
        </div>
        <header className={styles.header}>
          <span className={styles.title}>{data.title}</span>
          <span className={styles.sign}>{t('adv_sign')}</span>
        </header>
      </Link>
    </section>
  );
};

export default AdvCardSimple;
