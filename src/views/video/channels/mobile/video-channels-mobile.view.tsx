import React from 'react';

import { VideoChannelList } from '@/components/video/channel';
import { WithPrevMoreLayout } from '@/layouts';
import { VideoChannelData } from 'lib/types';
import { GetVideoChannelsTransformedResponse } from 'services/video-api';

import styles from './video-channels-mobile.module.scss';

interface P {
  className?: string;

  data?: GetVideoChannelsTransformedResponse;
  getLink: (id: number) => string;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  reducedChannels: VideoChannelData[];
}

const VideoChannelsMobileView = ({
  className,
  data,
  getLink,
  isFetching,
  maxPage,
  minPage,
  reducedChannels,
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
        {reducedChannels.length > 0 && (
          <VideoChannelList
            channelBlockClassName={styles.channel_block}
            channels={reducedChannels}
            getLink={getLink}
          />
        )}
      </WithPrevMoreLayout>
    </main>
  </div>
);

export default VideoChannelsMobileView;
