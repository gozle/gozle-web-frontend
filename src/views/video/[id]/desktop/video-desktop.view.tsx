import { useTranslation } from 'next-i18next';
import React from 'react';

import { PageBlockWrapper } from '@/components/common';
import { VideoBlockBig } from '@/components/video/block';
import { VideoHorizontalCardList } from '@/components/video/list';
import { PageTitledBlock } from '@/page-blocks';
import type { VideoExtendedData } from 'lib/types';
import type { GetVideoListTransformedResponse } from 'services/video-api';

import styles from './video-desktop.module.scss';

interface P {
  className?: string;
  data: VideoExtendedData;

  videos?: GetVideoListTransformedResponse;
  wideScreen: boolean;
}

const VideoDesktopView = ({ className, data, videos, wideScreen }: P) => {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className={styles.page_block__central}>
        <main className={styles.media_content}>
          <div
            className={
              styles.main_content + (wideScreen ? ' ' + styles.widescreen : '')
            }
          >
            <PageBlockWrapper>
              <VideoBlockBig
                data={data}
                videos={videos?.data}
                wideScreen={wideScreen}
              />
            </PageBlockWrapper>
          </div>
          {!wideScreen && (
            <div className={styles.sidebar_content}>
              {videos && (
                <PageTitledBlock
                  className={styles.see_also}
                  title={t('see_also')}
                >
                  <VideoHorizontalCardList videos={videos.data} />
                </PageTitledBlock>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VideoDesktopView;
