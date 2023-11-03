import React from 'react';

import { NewsBaseData, NewsCategory } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import { NewsWrappedListLayout } from '../../layouts/news-wrapped-list/news-wrapped-list.layout';

interface P {
  category: NewsCategory;
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsCategoryDesktopView = ({ category, ...props }: P) => (
  <NewsWrappedListLayout {...props} title={category.name} />
);

export default NewsCategoryDesktopView;
