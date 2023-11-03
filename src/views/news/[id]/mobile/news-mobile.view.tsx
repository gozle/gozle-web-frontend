import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { NewsBlockBigMobile } from '@/components/news/block';
import {
  LatestNewsBlock,
  PopularNewsBlock,
  WrappedAdvContainerBlock,
} from '@/page-blocks';
import { NewsCategory, NewsExtendedData } from 'lib/types';

import styles from './news-mobile.module.scss';

interface P {
  category?: NewsCategory | null;
  className?: string;
  data: NewsExtendedData;
}

const NewsMobileView = ({ className, category, data }: P) => (
  <div className={className}>
    <main>
      <PageBlockWrapper withPaddings={true}>
        <NewsBlockBigMobile data={data} />
      </PageBlockWrapper>
      <WrappedAdvContainerBlock
        className={styles.adv_mobile}
        type="horizontal-small"
      />
      <PopularNewsBlock className="page-margins-2" />
      <LatestNewsBlock
        className="page-margins-2"
        category={category}
        mobile={true}
      />
    </main>
  </div>
);

export default NewsMobileView;
