import React from 'react';

import styles from './img-4x3.module.scss';

interface P {
  alt?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
  position?: 'top' | 'center' | 'bottom';
  src: string;
}

export const Img4x3 = ({
  alt = '',
  className = '',
  objectFit = 'cover',
  position = 'top',
  src,
}: P) => (
  <div className={styles.img_4x3 + ' ' + className}>
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
