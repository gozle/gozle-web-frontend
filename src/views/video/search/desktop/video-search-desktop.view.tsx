import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Pagination } from '@/components/base';
import {
  HorizontalScrollContainer,
  PageBlockWrapper,
} from '@/components/common';
import { VideoChannelListItem } from '@/components/video/channel';
import { VideoHorizontalCardList } from '@/components/video/list';
import { getVideoChannelLink } from 'lib/helpers';
import { useAppSelector } from 'lib/hooks';
import {
  GetVideoChannelsTransformedResponse,
  GetVideoListTransformedResponse,
} from 'services/video-api';

import styles from './video-search-desktop.module.scss';

interface P {
  channels?: GetVideoChannelsTransformedResponse;
  className?: string;

  data?: GetVideoListTransformedResponse;
  page: number;
  query: string;
}

const VideoSearchDesktopView = ({
  channels,
  className,
  data,
  page,
  query,
}: P) => {
  const { t } = useTranslation('video');
  const router = useRouter();
  const colorScheme = useAppSelector((state) => state.colorScheme);

  const getUrlForPage = (page: number) =>
    `${router.pathname}?q=${encodeURIComponent(query)}&page=${page}`;

  return (
    <section className={className}>
      <div className={styles.block_central}>
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
            <>
              <div className={styles.header + ' ' + styles.videos_header}>
                {t('videos')}
              </div>
              <VideoHorizontalCardList videos={data.data} size="lg" />
            </>
          )}
          <footer>
            {data && data.pagination.totalPages > 1 && (
              <Pagination
                className={styles.pagination}
                currentPage={page}
                lastPage={data.pagination.totalPages || 1}
                pagesAmount={7}
                activeStyles={
                  styles.pagination_active +
                  ' ' +
                  (colorScheme === 'dark' ? styles.dark : '')
                }
                getUrlForPage={getUrlForPage}
              />
            )}
          </footer>
        </main>
        {/* <section className={styles.additional_content}></section> */}
      </div>
    </section>
  );
};

export default VideoSearchDesktopView;
