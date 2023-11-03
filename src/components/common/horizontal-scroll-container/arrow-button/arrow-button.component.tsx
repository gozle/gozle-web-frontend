import React from 'react';

import { KeyboardArrowRightIcon } from '@/icons';

import styles from './arrow-button.module.scss';

interface P {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  variant: 'right' | 'left';
}

export const ArrowButton = ({ className = '', onClick, style, variant }: P) => (
  <button
    className={styles.arrow_btn + ' ' + className}
    style={style}
    onClick={onClick}
  >
    {variant === 'right' ? (
      <KeyboardArrowRightIcon />
    ) : (
      <KeyboardArrowRightIcon style={{ transform: 'rotate(180deg)' }} />
    )}
  </button>
);
