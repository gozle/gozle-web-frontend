import React, { useState } from 'react';

import { Tabs, Tab } from '@/components/base';
import { SiteList } from '@/components/home';
import { Site, SiteCategory } from 'lib/types';

import styles from './sites.module.scss';

interface P {
  categories: SiteCategory[];
  className?: string;
  sites: { [key: string]: Site[] };
}

export const SitesBlock = ({ categories, className, sites }: P) => {
  const [category, setCategory] = useState<string>(
    categories.length ? String(categories[0].id) : '',
  );

  const tabs: Tab[] = categories.map((c) => ({
    id: c.id,
    title: c.name,
  }));

  const handleCategoryClick = (id: string) => {
    if (categories.find((c) => c.id === +id)) setCategory(id);
  };

  return (
    <section className={className}>
      <header className={styles.header}>
        <Tabs active={+category} tabs={tabs} onTabClick={handleCategoryClick} />
      </header>
      <SiteList sites={category in sites ? sites[category] : []} />
    </section>
  );
};
