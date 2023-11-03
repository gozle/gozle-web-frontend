import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { type MouseEvent } from 'react';

import type { NavMenuItem } from 'lib/types';

import styles from './nav-extra-items.module.scss';

interface P {
  active?: (NavMenuItem & { href: string }) | null;
  activeClassName?: string;
  className?: string;
  index: number;
  itemClassName?: string;
  onShowMoreItemsMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onShowMoreItemsMouseOut?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const NavExtraItems = ({
  activeClassName = '',
  className = '',
  itemClassName = '',
  ...props
}: P) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container + ' ' + className}>
      {props.active && (
        <Link
          className={itemClassName + ' ' + activeClassName}
          href={props.active.href}
        >
          {props.active.name}
        </Link>
      )}
      <div
        className={itemClassName}
        onMouseEnter={props.onShowMoreItemsMouseEnter}
        onMouseOut={props.onShowMoreItemsMouseOut}
        data-index={props.index}
      >
        {t('nav_menu_extra_items')}
      </div>
    </div>
  );
};
