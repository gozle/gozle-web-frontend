import React, { useContext } from 'react';

import { NoSsr } from '@/components/base';
import { Logo, PageBlockWrapper } from '@/components/common';
import { SitesButton } from '@/components/home';
import {
  AdvContainer,
  SearchFormContainer,
  ShortcutListContainer,
} from '@/containers';
import { SettingsBlock } from '@/page-blocks';
import type { Service } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './search-shortcuts-container.module.scss';

interface P {
  className?: string;
  shortcuts: Service[];
}

export const SearchShortcutsContainer = ({ className = '', shortcuts }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <PageBlockWrapper>
      <div className={styles.container + ' ' + className}>
        <SettingsBlock />
        <Logo className={styles.logo} height={40} />
        <SearchFormContainer className={styles.search_form} href="/search" />
        <NoSsr>
          <PageBlockWrapper
            className={styles.adv_container}
            pageBlockStyle={{ background: theme?.palette.background.contrast }}
          >
            <AdvContainer type="horizontal-small" />
          </PageBlockWrapper>
        </NoSsr>
        <ShortcutListContainer shortcuts={shortcuts} />
        <div className={styles.btn_container}>
          <SitesButton />
        </div>
      </div>
    </PageBlockWrapper>
  );
};
