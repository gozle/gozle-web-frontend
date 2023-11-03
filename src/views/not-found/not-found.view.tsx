import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { Logo } from '@/components/common';
import { AppThemeContext } from 'pages/_app';

import styles from './not-found.module.scss';

const NotFoundView = () => {
  const { t } = useTranslation();
  const theme = useContext(AppThemeContext);
  const router = useRouter();

  return (
    <section
      className={styles.not_found_page}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <div className={styles.central_block}>
        <Logo className={styles.logo} height={72} />
        <div className={styles.error_code}>404</div>
        <div className={styles.page_title}>
          {t('not_found_page_title_text')}
        </div>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/')}
        >
          {t('not_found_page_to_home')}
        </Button>
      </div>
    </section>
  );
};

export default NotFoundView;
