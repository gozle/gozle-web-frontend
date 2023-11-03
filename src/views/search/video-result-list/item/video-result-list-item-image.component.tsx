import styled from '@emotion/styled';
import React from 'react';

import { Duration } from '@/components/video/duration';
import { getVideoLink } from 'lib/helpers';
import { VideoData } from 'lib/types';

interface P {
  data: VideoData;
}

const Root = styled('a')`
  display: flex;

  border-radius: 0.5em;
  overflow: hidden;

  position: relative;

  & > img {
    aspect-ratio: 16/9;
    width: 100%;
    object-fit: cover;
  }
`;

export const VideoResultListItemImage = ({ data }: P) => (
  <Root
    href={getVideoLink(data.id)}
    target="_blank"
    rel="external noopener noreferrer"
  >
    <img src={data.thumbnail} alt={data.title} />
    {data.duration && <Duration value={data.duration} />}
  </Root>
);
