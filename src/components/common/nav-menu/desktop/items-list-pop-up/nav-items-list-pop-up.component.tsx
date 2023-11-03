import Link from 'next/link';
import React from 'react';

import type { NavMenuItem } from 'lib/types';

import styles from './nav-items-list-pop-up.module.scss';

interface P {
  data: NavMenuItem[];
  getLink: (id: string) => string;
}

export const NavItemsListPopUp = ({ data, getLink }: P) => (
  <div className={styles.list}>
    {data.map((el) => (
      <Link className={styles.item} key={el.slug} href={getLink(el.slug)}>
        {el.name}
      </Link>
    ))}
  </div>
);
