import { useTranslation } from 'next-i18next';
import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { VideoBlockBig } from '@/components/video/block';
import { VideoHorizontalCardList } from '@/components/video/list';
import { PageTitledBlock } from '@/page-blocks';
import type { VideoExtendedData } from 'lib/types';
import type { GetVideoListTransformedResponse } from 'services/video-api';

import styles from './video-mobile.module.scss';

interface P {
  className?: string;
  data: VideoExtendedData;

  videos?: GetVideoListTransformedResponse;
}

const VideoMobileView = ({ className, data, videos }: P) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <main>
        <PageBlockWrapper>
          <VideoBlockBig data={data} />
        </PageBlockWrapper>
        {videos && (
          <PageTitledBlock className={styles.see_also} title={t('see_also')}>
            <VideoHorizontalCardList videos={videos.data} />
          </PageTitledBlock>
        )}
      </main>
    </div>
  );
};

export default VideoMobileView;
