import { Trans, useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { LogoSettingsBlock } from '@/page-blocks';
import { AppThemeContext } from 'pages/_app';

import styles from './privacy.module.scss';

const PrivacyView = () => {
  const { t } = useTranslation();
  const theme = useContext(AppThemeContext);

  return (
    <section
      className={styles.privacy_page}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <LogoSettingsBlock className={styles.logo_language_switch} />
      <main className={styles.media_content}>
        <h1 className={styles.page_title}>{t('privacy_page_title_text')}</h1>
        <Trans i18nKey="privacy_page__description" t={t}>
          <p className={styles.page__description}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            quibusdam sed sit harum aliquam explicabo tempora, sint, atque eius
            officia repellendus vitae obcaecati tempore ducimus perspiciatis
            natus temporibus qui cupiditate!
          </p>
        </Trans>
      </main>
    </section>
  );
};

export default PrivacyView;
