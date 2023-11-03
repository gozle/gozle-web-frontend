import { Trans, useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { ContactUsFormContainer } from '@/containers';
import { LogoSettingsBlock } from '@/page-blocks';
import { AppThemeContext } from 'pages/_app';

import styles from './contact-us.module.scss';

const ContactUsView = () => {
  const { t } = useTranslation();
  const theme = useContext(AppThemeContext);

  return (
    <section
      className={styles.contact_us_page}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <LogoSettingsBlock className={styles.logo_language_switch} />
      <div className={styles.form__container}>
        <header className={styles.header}>
          <h1 className={styles.page_title}>
            {t('contact_us_page_title_text')}
          </h1>
          <Trans i18nKey="contact_us_page_description" t={t}>
            <h3 className={styles.page_description}>
              Fill out the form to contact us\n
            </h3>
            <h4 className={styles.page_description_ps}>
              *Enter your email to receive a response
            </h4>
          </Trans>
        </header>
        <ContactUsFormContainer />
      </div>
    </section>
  );
};

export default ContactUsView;
