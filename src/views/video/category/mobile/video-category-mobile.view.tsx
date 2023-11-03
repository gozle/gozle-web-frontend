import React from 'react';

import { VideoCardList } from '@/components/video/list';
import { WithPrevMoreLayout } from '@/layouts';
import { PageTitledBlock } from '@/page-blocks';
import { VideoCategory, VideoData } from 'lib/types';
import { GetVideoListTransformedResponse } from 'services/video-api';

import styles from './video-category-mobile.module.scss';

interface P {
  category: VideoCategory;
  className?: string;

  data?: GetVideoListTransformedResponse;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedVideos: VideoData[];
}

const VideoCategoryMobileView = ({
  category,
  className,
  data,
  isFetching,
  maxPage,
  minPage,
  reducedVideos,
}: P) => (
  <div className={className}>
    <main>
      <PageTitledBlock
        className={styles.video_list_container}
        title={category.name}
      >
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
      </PageTitledBlock>
    </main>
  </div>
);

export default VideoCategoryMobileView;
