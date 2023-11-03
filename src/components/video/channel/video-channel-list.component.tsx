import { Url } from 'url';

import { PageBlockWrapper } from '@/components/common';
import { VideoChannelData } from 'lib/types';

import { VideoChannelListItem } from './video-channel-list-item.component';
import styles from './video-channel-list.module.scss';

interface P {
  channelBlockClassName?: string;
  channels: VideoChannelData[];
  getLink: (id: number) => string | Url;
}

export const VideoChannelList = ({
  channelBlockClassName,
  channels,
  getLink,
}: P) => (
  <div className={styles.list}>
    {channels.map((el, i) => (
      <PageBlockWrapper
        key={i}
        className={channelBlockClassName}
        pageBlockStyle={{ overflow: 'hidden' }}
      >
        <VideoChannelListItem data={el} getLink={getLink} />
      </PageBlockWrapper>
    ))}
  </div>
);
