import React from 'react';

import { PageBlockWrapper, VerticalList } from '@/components/common';
import { NewsHorizontal } from '@/components/news/block';
import type { NewsBaseData } from 'lib/types';

interface P {
  className?: string;
  news: NewsBaseData[];
}

export const NewsHorizontalList = ({ className = '', news }: P) => (
  <VerticalList
    className={className}
    data={news}
    render={(data) => (
      <PageBlockWrapper>
        <NewsHorizontal data={data} isPopular={data.is_popular} />
      </PageBlockWrapper>
    )}
  />
);

export default NewsHorizontalList;
