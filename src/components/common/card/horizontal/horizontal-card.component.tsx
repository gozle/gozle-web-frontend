import React from 'react';

import styles from './horizontal-card.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
  media: React.ReactNode;
}

export const HorizontalCard = ({ children, className = '', media }: P) => (
  <article className={styles.card + ' ' + className}>
    {media}
    <div className={styles.content}>{children}</div>
  </article>
);
