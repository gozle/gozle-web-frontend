import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';

import { HorizontalScrollContainer } from '@/components/common';
import { useQueryPage } from 'lib/hooks';
import type { NavRoute } from 'lib/nav';

import { NavLink } from '../nav-link.component';

import styles from './navigation.module.scss';

interface P {
  routes: NavRoute[];
}

export const Navigation = ({ routes }: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { query } = useQueryPage(router);

  useEffect(() => {
    const current = ref.current;
    if (current) current.scrollIntoView({ inline: 'center', block: 'center' });
  }, []);

  return (
    <HorizontalScrollContainer>
      {routes.map((route) => (
        <NavLink
          className={styles.link}
          href={`${route.href}?q=${query}`}
          key={route.i18n}
          pattern={route.pattern}
        >
          {(isActive) => (
            <div className={isActive ? styles.active : undefined}>
              {t(route.i18n)}
            </div>
          )}
        </NavLink>
      ))}
    </HorizontalScrollContainer>
  );
};
