import React from 'react';

import styles from './card-content.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: P) => (
  <div className={styles.content + ' ' + className}>{children}</div>
);
