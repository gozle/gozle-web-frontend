import React from 'react';

import { PageBlockWrapper, VerticalList } from '@/components/common';
import type { VideoData } from 'lib/types';

import { VideoHorizontalCard } from '../../block';

interface P {
  className?: string;
  size?: 'sm' | 'lg';
  videos: VideoData[];
}

export const VideoHorizontalCardList = ({
  className,
  size = 'sm',
  videos,
}: P) => (
  <VerticalList
    className={className}
    data={videos}
    render={(data) => (
      <PageBlockWrapper>
        <VideoHorizontalCard
          ImageProps={size === 'lg' ? { width: 240 } : undefined}
          data={data}
        />
      </PageBlockWrapper>
    )}
  />
);
