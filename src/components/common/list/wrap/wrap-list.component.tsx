import React from 'react';

import styles from './wrap-list.module.scss';

type P<T> = {
  className?: string;
  data: T[];
  itemClassName?: string;
  render: (data: T) => React.ReactNode;
};

export const WrapList = <T extends unknown>({
  className = '',
  itemClassName,
  data,
  render,
}: P<T>) => (
  <ul className={styles.list + ' ' + className}>
    {data.map((el, i) => (
      <li key={i} className={itemClassName}>
        {render(el)}
      </li>
    ))}
  </ul>
);
