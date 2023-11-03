import React from 'react';

import { NewsBaseData } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import { NewsWrappedListLayout } from '../../layouts/news-wrapped-list';

interface P {
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsHomeDesktopView = (props: P) => <NewsWrappedListLayout {...props} />;

export default NewsHomeDesktopView;
