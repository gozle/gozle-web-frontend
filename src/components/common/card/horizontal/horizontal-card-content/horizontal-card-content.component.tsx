import React from 'react';

import styles from './horizontal-card-content.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
}

export const HorizontalCardContent = ({ children, className = '' }: P) => (
  <div className={styles.content + ' ' + className}>{children}</div>
);
