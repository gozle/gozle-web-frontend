import React from 'react';

import { Logo } from '@/components/common';
import { ServiceList } from '@/components/home';
import { SearchFormContainer } from '@/containers';
import type { Service } from 'lib/types';

import styles from './services-search-container.module.scss';

interface P {
  services: Service[];
}

export const ServicesSearchContainer = ({ services }: P) => (
  <div className={styles.container}>
    <div className={styles.service_list}>
      <ServiceList services={services} />
    </div>
    <div className={styles.logo_search}>
      <Logo className={styles.logo} height={45} />
      <SearchFormContainer className={styles.search_form} href="/search" />
    </div>
  </div>
);
