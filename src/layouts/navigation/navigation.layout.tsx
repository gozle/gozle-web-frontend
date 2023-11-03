import React, { useContext } from 'react';

import { Navigation } from '@/components/base';
import { Logo } from '@/components/common';
import { SearchFormContainer } from '@/containers';
import { SettingsBlock } from '@/page-blocks';
import { routes } from 'lib/nav';
import { AppThemeContext } from 'pages/_app';

import styles from './navigation.module.scss';

interface P {
  children: JSX.Element;
  extraButtons?: React.ReactNode;
  hideColorScheme?: boolean;
  hideLanguage?: boolean;
  href?: string;
}

export const WithNavigationLayout = ({
  children,
  hideColorScheme,
  hideLanguage,
  href = '/search',
  extraButtons,
}: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <>
      <section
        className={styles.container}
        style={{ backgroundColor: theme?.palette.background.pageBlock }}
      >
        <SettingsBlock
          className={styles.settings}
          hideColorScheme={hideColorScheme}
          hideLanguage={hideLanguage}
        />
        <div className={styles.central_block}>
          <div className={styles.logo__container}>
            <Logo className={styles.logo} height={40} />
          </div>
          <div className={styles.search_navigation__container}>
            <SearchFormContainer
              className={styles.search_form}
              href={href}
              extraButtons={extraButtons}
            />
            <Navigation routes={routes} />
          </div>
        </div>
      </section>
      {children}
    </>
  );
};
