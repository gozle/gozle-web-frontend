import React from 'react';

import styles from './card.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: P) => (
  <article className={styles.card + ' ' + className}>{children}</article>
);
