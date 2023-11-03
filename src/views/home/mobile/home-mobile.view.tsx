import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import {
  LatestNewsBlock,
  BreakingNewsBlock,
  PopularNewsBlock,
  PopularNewsFeedBlock,
} from '@/page-blocks';
import type { Service } from 'lib/types';

import { SearchShortcutsContainer } from './search-shortcuts-container';

interface P {
  className?: string;
  shortcuts: Service[];
}

const HomeMobileView = ({ className, shortcuts }: P) => (
  <section className={className}>
    <SearchShortcutsContainer shortcuts={shortcuts} />
    <main>
      <PageBlockWrapper withPaddings={true}>
        <BreakingNewsBlock />
      </PageBlockWrapper>
      <PopularNewsFeedBlock className="page-margins-1" />
      <PopularNewsBlock className="page-margins-2" />
      <LatestNewsBlock className="page-margins-2" mobile={true} />
    </main>
  </section>
);

export default HomeMobileView;
