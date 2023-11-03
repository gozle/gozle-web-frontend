import { css } from '@emotion/react';
import React from 'react';

import { WebSearchData } from 'lib/types';

import { SearchResultListItemDescription } from './search-result-list-item-description.component';
import { SearchResultListItemHeader } from './search-result-list-item-header.component';
import { SearchResultListItemImage } from './search-result-list-item-image.component';
import { SearchResultListItemLink } from './search-result-list-item-link.component';

interface P {
  className?: string;
  data: WebSearchData;
}

const styles = css`
  position: relative;

  width: 100%;

  @media (min-width: 769px) {
    font-size: 0.875em;
    flex-direction: row;
  }
`;

export const SearchResultListItem = ({ className = '', data, ...props }: P) => (
  <div className={className + (data.image ? ' with-image' : '')} css={styles}>
    <SearchResultListItemHeader data={data} />
    <SearchResultListItemLink data={data} />
    <SearchResultListItemDescription data={data} />
  </div>
);
