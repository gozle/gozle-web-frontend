import React from 'react';

import { VideoCardList } from '@/components/video/list';
import { WithPrevMoreLayout } from '@/layouts';
import { VideoData } from 'lib/types';
import { GetVideoListTransformedResponse } from 'services/video-api';

import styles from './video-popular-mobile.module.scss';

interface P {
  className?: string;

  data?: GetVideoListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedVideos: VideoData[];
}

const VideoPopularMobileView = ({
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedVideos,
}: P) => (
  <div className={className}>
    <main>
      <WithPrevMoreLayout
        minPage={minPage}
        maxPage={maxPage}
        isFetching={isFetching}
        data={data}
        shallow={true}
      >
        {reducedVideos.length > 0 && (
          <VideoCardList
            cardBlockClassName={styles.video_block}
            videos={reducedVideos}
            imageSize="(max-width: 768px) 75vw, 40vw"
          />
        )}
      </WithPrevMoreLayout>
    </main>
  </div>
);
export default VideoPopularMobileView;
