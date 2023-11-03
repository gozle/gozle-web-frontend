import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { DefaultError } from '@/components/common';
import { NewsFeedList } from '@/components/news/feed/list';
import { NewsFeedListSkeleton } from '@/components/skeletons';
import { getNewsFeedLink } from 'lib/helpers';
import { useGetNewsPopularFeedsQuery } from 'services/news-api';

export const PopularNewsFeedListContainer = () => {
  const router = useRouter();

  const { i18n } = useTranslation();
  const { data, error } = useGetNewsPopularFeedsQuery({ lang: i18n.language });

  const handleClick = (event: React.MouseEvent) => {
    const id = event.currentTarget.getAttribute('data-id');
    if (id)
      router.push({ pathname: getNewsFeedLink(id) }, undefined, {
        scroll: false,
        shallow: true,
      });
  };

  if (data) return <NewsFeedList feeds={data} onClick={handleClick} />;
  else if (error) return <DefaultError style={{ height: 200 }} />;
  else return <NewsFeedListSkeleton />;
};
