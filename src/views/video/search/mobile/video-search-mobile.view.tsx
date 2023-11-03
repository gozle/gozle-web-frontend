import { useTranslation } from 'next-i18next';
import React from 'react';

import {
  HorizontalScrollContainer,
  PageBlockWrapper,
} from '@/components/common';
import { VideoChannelListItem } from '@/components/video/channel';
import { VideoHorizontalCardList } from '@/components/video/list';
import { WithPrevMoreLayout } from '@/layouts';
import { getVideoChannelLink } from 'lib/helpers';
import { usePaginatedData } from 'lib/hooks';
import {
  GetVideoChannelsTransformedResponse,
  GetVideoListTransformedResponse,
} from 'services/video-api';

import styles from './video-search-mobile.module.scss';

interface P {
  channels?: GetVideoChannelsTransformedResponse;
  className?: string;

  data?: GetVideoListTransformedResponse;
  isFetching: boolean;
  query: string;
}

const VideoSearchMobileView = ({
  channels,
  className,
  query,
  data,
  isFetching,
}: P) => {
  const { t } = useTranslation('video');

  const {
    reducedData: reducedVideos,
    minPage,
    maxPage,
  } = usePaginatedData(data, query);

  return (
    <section className={className}>
      <main className={styles.main_content}>
        {channels && (
          <>
            <div className={styles.header}>{t('channels')}</div>
            <HorizontalScrollContainer>
              {channels.data.map((el, i) => (
                <PageBlockWrapper className={styles.channel} key={i}>
                  <VideoChannelListItem
                    data={el}
                    getLink={getVideoChannelLink}
                  />
                </PageBlockWrapper>
              ))}
            </HorizontalScrollContainer>
          </>
        )}
        {data && (
          <div className={styles.header + ' ' + styles.videos_header}>
            {t('videos')}
          </div>
        )}
        <WithPrevMoreLayout
          minPage={minPage}
          maxPage={maxPage}
          isFetching={isFetching}
          data={data}
        >
          {reducedVideos.length > 0 && (
            <VideoHorizontalCardList videos={reducedVideos} />
          )}
        </WithPrevMoreLayout>
      </main>
    </section>
  );
};

export default VideoSearchMobileView;
