import React from 'react';

import styles from './vertical-list.module.scss';

type P<T> = {
  className?: string;
  data: T[];
  render: (data: T) => React.ReactNode;
};

export const VerticalList = <T extends unknown>({
  className = '',
  data,
  render,
}: P<T>) => (
  <ul className={styles.list + ' ' + className}>
    {data.map((el, i) => (
      <li key={i} className={styles.list_item}>
        {render(el)}
      </li>
    ))}
  </ul>
);
