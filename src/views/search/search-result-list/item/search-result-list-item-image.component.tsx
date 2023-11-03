import React from 'react';

import { WebSearchData } from 'lib/types';

interface P {
  data: WebSearchData;
}

export const SearchResultListItemImage = ({ data }: P) => (
  <img
    className="image"
    src={data.image}
    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
    alt={data.title}
  />
);
