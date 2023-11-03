import Link from 'next/link';
import React, { forwardRef } from 'react';

import type { NavMenuItem } from 'lib/types';

import styles from './nav-menu-mobile.module.scss';

interface P {
  data: NavMenuItem;
  href: string;
  isActive?: boolean;
}

export const NavMenuMobileItem = forwardRef<HTMLAnchorElement, P>(
  (props, ref) => (
    <Link
      className={styles.item + ' ' + (props.isActive ? styles.active : '')}
      href={props.href}
      ref={ref}
    >
      {props.data.name}
    </Link>
  ),
);

NavMenuMobileItem.displayName = 'NavMenuMobileItem';
