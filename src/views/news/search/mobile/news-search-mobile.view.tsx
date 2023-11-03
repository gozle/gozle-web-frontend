import CampaignIcon from '@mui/icons-material/Campaign';
import { Drawer, Fab } from '@mui/material';
import React, { useState } from 'react';

import { PageBlockWrapper } from '@/components/common';
import { NewsCardList } from '@/components/news/list';
import { WithPrevMoreLayout } from '@/layouts';
import { BreakingNewsBlock, WrappedAdvContainerBlock } from '@/page-blocks';
import { NewsBaseData } from 'lib/types';
import { GetNewsListTransformedResponse } from 'services/news-api';

import styles from './news-search-mobile.module.scss';

interface P {
  className?: string;
  data?: GetNewsListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedNews: NewsBaseData[];
}

const NewsSearchMobileView = ({
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedNews,
}: P) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={className}>
      <main>
        <WrappedAdvContainerBlock
          className={styles.adv_mobile}
          type="horizontal-small"
        />
        <WithPrevMoreLayout
          minPage={minPage}
          maxPage={maxPage}
          isFetching={isFetching}
          data={data}
        >
          {reducedNews.length > 0 && <NewsCardList news={reducedNews} />}
        </WithPrevMoreLayout>
      </main>
      <Fab
        size="medium"
        sx={{
          position: 'fixed',
          right: (theme) => theme.spacing(2),
          bottom: (theme) => theme.spacing(2),
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.common.black,
          color: (theme) => theme.palette.background.default,
        }}
        onClick={() => setOpen(true)}
      >
        <CampaignIcon />
      </Fab>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <PageBlockWrapper withPaddings={true}>
          <BreakingNewsBlock />
        </PageBlockWrapper>
      </Drawer>
    </div>
  );
};

export default NewsSearchMobileView;
