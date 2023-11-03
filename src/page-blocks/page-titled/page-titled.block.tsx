import React from 'react';

import styles from './page-titled.module.scss';

interface P {
  children: React.ReactNode;
  className?: string;
  title: React.ReactNode;
}

export const PageTitledBlock = ({ children, className, title }: P) => (
  <section className={className}>
    <header className={styles.header}>
      <div>{title}</div>
    </header>
    {children}
  </section>
);
