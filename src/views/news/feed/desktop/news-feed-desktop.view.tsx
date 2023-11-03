import React from 'react';

import { NewsSrc } from '@/components/news/news-src';
import { NewsBaseData, NewsFeed } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import { NewsWrappedListLayout } from '../../layouts/news-wrapped-list';

interface P {
  className?: string;
  data?: GetNewsListTransformedResponse;
  feed?: NewsFeed;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsFeedDesktopView = ({ feed, ...props }: P) => (
  <NewsWrappedListLayout
    {...props}
    title={feed ? <NewsSrc icon={feed.icon} name={feed.name} /> : undefined}
  />
);

export default NewsFeedDesktopView;
