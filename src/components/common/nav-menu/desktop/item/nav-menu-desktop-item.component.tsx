import Link from 'next/link';
import React, { type CSSProperties, useContext } from 'react';

import type { NavMenuItem } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './nav-menu-desktop-item.module.scss';

interface P {
  activeClassName?: string;
  data: NavMenuItem;
  extraItems?: JSX.Element;
  href: string;
  isActive?: boolean;
  itemClassName?: string;
  style?: CSSProperties;
}

export const NavMenuDesktopItem = ({
  itemClassName = '',
  activeClassName = '',
  ...props
}: P) => {
  const theme = useContext(AppThemeContext);

  return (
    <div
      className={styles.container}
      style={
        {
          ...props.style,
          '--background': theme?.palette.background.pageBlock,
        } as React.CSSProperties
      }
    >
      <Link
        className={
          itemClassName + ' ' + (props.isActive ? activeClassName : '')
        }
        href={props.href}
      >
        {props.data.name}
      </Link>
      {props.extraItems}
    </div>
  );
};
