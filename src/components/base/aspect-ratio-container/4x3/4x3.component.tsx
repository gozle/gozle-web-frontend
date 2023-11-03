import React from 'react';

import styles from './4x3.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
}

export const Container4x3 = ({ children, className = '' }: P) => (
  <div className={styles.c_4x3 + ' ' + className}>{children}</div>
);
