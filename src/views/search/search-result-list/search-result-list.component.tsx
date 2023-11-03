import { css } from '@emotion/react';
import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { WebSearchData } from 'lib/types';

import { SearchResultListItem } from './item';

interface P {
  className?: string;
  data: WebSearchData[];
}

const styles = css`
  width: 100%;
`;

export const SearchResultList = ({ className, data, ...props }: P) => (
  <div className={className} css={styles}>
    {data.map((result, i) => (
      <PageBlockWrapper key={i} withPaddings={true}>
        <SearchResultListItem key={i} data={result} />
      </PageBlockWrapper>
    ))}
  </div>
);
