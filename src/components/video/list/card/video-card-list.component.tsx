import React from 'react';

import { PageBlockWrapper, VerticalList, WrapList } from '@/components/common';
import type { VideoData } from 'lib/types';

import { VideoCard } from '../../block';

interface P {
  cardBlockClassName?: string;
  className?: string;
  imageSize: string;
  vertical?: boolean;
  videos: VideoData[];
}

export const VideoCardList = ({
  cardBlockClassName,
  className = '',
  imageSize,
  vertical,
  videos,
}: P) => {
  const render = (data: VideoData) => (
    <PageBlockWrapper style={{ height: '100%' }}>
      <VideoCard data={data} ImageProps={{ sizes: imageSize }} />
    </PageBlockWrapper>
  );

  return vertical ? (
    <VerticalList className={className} data={videos} render={render} />
  ) : (
    <WrapList
      className={className}
      itemClassName={cardBlockClassName}
      data={videos}
      render={render}
    />
  );
};
