import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { AppThemeContext } from 'pages/_app';

import styles from './footer.module.scss';

interface P {
  className?: string;
}

export const Footer = ({ className = '' }: P) => {
  const { t } = useTranslation();
  const theme = useContext(AppThemeContext);

  return (
    <footer
      className={styles.footer + ' ' + className}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <ul>
        <li>
          <Link href="/about-us">{t('footer_about_us')}</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/contact-us">{t('footer_contact_us')}</Link>
        </li>
      </ul>
    </footer>
  );
};
