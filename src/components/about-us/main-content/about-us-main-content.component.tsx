import { LazyMotion, m, domAnimation } from 'framer-motion';
import { Trans, useTranslation } from 'next-i18next';
import React from 'react';

import { Logo } from '@/components/common';

import styles from './about-us-main-content.module.scss';

export const AboutUsMainContent = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.main_content}>
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* <Logo className={styles.logo} height={80} /> */}
          <Trans i18nKey="about_us_page_description" t={t}>
            <p className={styles.page_description}>
              Gözle, adamlary höwesleri bilen baglanyşdyrýan media we
              tehnologiýa kompaniýasydyr.Halaýan zatlaryňyzyň hemmesi şu ýerde -
              maliýe we söwda, oýunlar we täzelikler - subut edilen önümler,
              mazmun we tehnologiýa bilen öz gününi ýakýar.Hyzmatdaşlar üçin
              telekeçiligi ösdürmek we mahabat, gözleg we metbugat arkaly has
              manyly baglanyşyk gurmak üçin doly platforma hödürleýäris.
            </p>
          </Trans>
        </m.div>
      </LazyMotion>
    </div>
  );
};
