import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Container16x9 } from '@/components/base';
import DefaultImg from 'public/images/default_16x9.jpg';

import styles from './card-media.module.scss';

interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  alt: string;
  className?: string;
  extraItems?: React.ReactNode;
  href?: string;
  src: string;
}

export const CardMedia = ({
  ImageProps,
  alt,
  className = '',
  extraItems,
  href,
  src,
}: P) => {
  const presentedSrc =
    !src || src.indexOf('None') === 0 || src.indexOf('Unknown') === 0
      ? DefaultImg
      : src;

  const img = ImageProps?.width ? (
    <Image
      src={presentedSrc}
      alt={alt}
      width={ImageProps.width}
      height={ImageProps.width * 0.5625}
      style={{ objectFit: 'cover' }}
    />
  ) : (
    <Container16x9>
      <Image
        src={presentedSrc}
        alt={alt}
        fill
        sizes={ImageProps?.sizes}
        style={{ objectFit: 'cover' }}
      />
    </Container16x9>
  );

  return (
    <div className={styles.container + ' ' + className}>
      {href ? (
        <Link href={href} tabIndex={-1}>
          {img}
        </Link>
      ) : (
        img
      )}
      {extraItems}
    </div>
  );
};
