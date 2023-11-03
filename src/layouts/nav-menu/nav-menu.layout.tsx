import dynamic from 'next/dynamic';
import React, { Suspense, useContext } from 'react';

import { useAppSelector } from 'lib/hooks';
import type { NavMenuItem } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './nav-menu.module.scss';

const NavMenuDesktop = dynamic(
  () =>
    import('@/components/common/nav-menu/desktop/nav-menu-desktop.component'),
  { suspense: true },
);

const NavMenuMobile = dynamic(
  () => import('@/components/common/nav-menu/mobile/nav-menu-mobile.component'),
  { suspense: true },
);

interface P {
  categories: NavMenuItem[];
  category?: NavMenuItem | null;
  children: JSX.Element;
  getCategoryLink: (category: string) => string;
}

export const WithNavMenuLayout = ({ children, ...props }: P) => {
  const theme = useContext(AppThemeContext);
  const mobile = useAppSelector((state) => state.settings.mobile);
  return (
    <>
      {props.categories.length > 0 && (
        <Suspense>
          {mobile ? (
            <div
              className={styles.mobile}
              style={{ backgroundColor: theme?.palette.background.pageBlock }}
            >
              <NavMenuMobile
                active={props.category}
                data={props.categories}
                getLink={props.getCategoryLink}
              />
            </div>
          ) : (
            <div
              className={styles.outer_container}
              style={{ backgroundColor: theme?.palette.background.pageBlock }}
            >
              <div className={styles.inner_container}>
                <NavMenuDesktop
                  active={props.category}
                  data={props.categories}
                  getLink={props.getCategoryLink}
                />
              </div>
            </div>
          )}
        </Suspense>
      )}
      {children}
    </>
  );
};
