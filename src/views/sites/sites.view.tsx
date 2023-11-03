import React, { useContext } from 'react';

import { LogoSettingsBlock, SitesBlock } from '@/page-blocks';
import { Site, SiteCategory } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './sites.module.scss';

interface P {
  categories?: SiteCategory[];
  className?: string;
  sites?: { [key: number]: Site[] };
}

const SitesView = ({ categories, className = '', sites }: P) => {
  const theme = useContext(AppThemeContext);

  return (
    <section
      className={styles.sites_page + ' ' + className}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <LogoSettingsBlock className={styles.logo_language_switch} />
      <main className={styles.media_content}>
        {categories && sites && (
          <SitesBlock
            className={styles.useful_sites_block}
            sites={sites}
            categories={categories!}
          />
        )}
      </main>
    </section>
  );
};

export default SitesView;
