import React from 'react';

import styles from './16x9.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
}

export const Container16x9 = ({ children, className = '' }: P) => (
  <div className={styles.c_16x9 + ' ' + className}>{children}</div>
);
