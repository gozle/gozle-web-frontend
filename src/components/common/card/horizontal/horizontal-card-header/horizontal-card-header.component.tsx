import React from 'react';

import styles from './horizontal-card-header.module.scss';

interface P {
  className?: string;
  title: React.ReactNode;
}

export const HorizontalCardHeader = ({ className = '', title }: P) => (
  <header className={styles.header + ' ' + className}>{title}</header>
);
