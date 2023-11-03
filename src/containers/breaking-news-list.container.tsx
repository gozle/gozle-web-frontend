import { useTranslation } from 'next-i18next';
import React from 'react';

import { DefaultError } from '@/components/common';
import { BreakingNewsList } from '@/components/news/breaking-news-list';
import { BreakingNewsListSkeleton } from '@/components/skeletons';
import { useGetBreakingNewsQuery } from 'services/news-api';

interface P {
  slug: string;
  small?: boolean;
}

export const BreakingNewsListContainer = ({ slug, small }: P) => {
  const { i18n } = useTranslation();
  const { data: breakingNews, error } = useGetBreakingNewsQuery({
    slug,
    language: i18n.language,
  });

  if (breakingNews)
    return <BreakingNewsList breakingNews={breakingNews.data} small={small} />;
  else if (error) return <DefaultError style={{ height: 200 }} />;
  else return <BreakingNewsListSkeleton />;
};
