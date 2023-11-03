import Script from 'next/script';
import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { WeatherBlockContainer } from '@/containers';
import {
  LatestNewsBlock,
  BreakingNewsBlock,
  PopularNewsBlock,
  PopularNewsFeedBlock,
  SettingsBlock,
  SitesBlock,
  WrappedAdvContainerBlock,
} from '@/page-blocks';
import type { Service, Site, SiteCategory } from 'lib/types';

import styles from './home-desktop.module.scss';
import { ServicesSearchContainer } from './services-search-container';

interface P {
  className?: string;
  services: Service[];
  siteCategories?: SiteCategory[];
  sites?: { [key: string]: Site[] };
}

const HomeDesktopView = ({ className, services, sites, siteCategories }: P) => (
  <section className={className}>
    <header className={styles.header}>
      <SettingsBlock />
    </header>
    <div className={styles.central_block}>
      <ServicesSearchContainer services={services} />
      <WrappedAdvContainerBlock type="horizontal" />
      <main className={styles.media_content}>
        <div className={styles.main_content}>
          <PageBlockWrapper withPaddings={true}>
            <BreakingNewsBlock />
          </PageBlockWrapper>
          <PopularNewsFeedBlock className="page-margins-1" />
          <PopularNewsBlock className="page-margins-1" />
          <LatestNewsBlock className="page-margins-1" />
        </div>
        <div className={styles.sidebar_content}>
          <PageBlockWrapper withPaddings={true}>
            <WeatherBlockContainer />
          </PageBlockWrapper>
          {sites && siteCategories && (
            <PageBlockWrapper withPaddings={true}>
              <SitesBlock sites={sites} categories={siteCategories} />
            </PageBlockWrapper>
          )}
        </div>
      </main>
    </div>
  </section>
);

export default HomeDesktopView;
