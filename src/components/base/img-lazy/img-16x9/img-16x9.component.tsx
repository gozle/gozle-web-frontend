import React from 'react';

import styles from './img-16x9.module.scss';

interface P {
  alt?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
  position?: 'top' | 'center' | 'bottom';
  src: string;
}

export const Img16x9 = ({
  alt = '',
  className = '',
  objectFit = 'cover',
  position = 'top',
  src,
}: P) => (
  <div className={styles.img_16x9 + ' ' + className}>
    {src && (
      <img
        loading="lazy"
        src={src}
        alt={alt}
        style={{ objectFit, objectPosition: position }}
      />
    )}
  </div>
);
