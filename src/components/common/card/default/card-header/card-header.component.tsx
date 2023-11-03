import React from 'react';

import styles from './card-header.module.scss';

interface P {
  className?: string;
  title: React.ReactNode;
}

export const CardHeader = ({ className = '', title }: P) => (
  <header className={styles.header + ' ' + className}>{title}</header>
);
