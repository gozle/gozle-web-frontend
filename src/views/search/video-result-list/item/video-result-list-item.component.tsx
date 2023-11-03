import { css } from '@emotion/react';
import React from 'react';

import { VideoData } from 'lib/types';

import { VideoResultListItemHeader } from './video-result-list-item-header.component';
import { VideoResultListItemImage } from './video-result-list-item-image.component';
import { VideoResultListItemSrc } from './video-result-list-item-src.component';

interface P {
  className?: string;
  data: VideoData;
  language: string;
}

const styles = css`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  font-size: 0.875em;
  width: 100%;

  & > div:first-of-type {
    display: flex;
    margin: 0 1em 0 0;
    max-width: 40%;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;

    width: 100%;
    max-width: calc(60% - 1em);
  }

  @media (min-width: 769px) {
    & > div:first-of-type {
      max-width: 20%;
    }
    & > div:last-of-type {
      max-width: calc(80% - 1em);
    }
  }
`;

export const VideoResultListItem = ({ className = '', data, language }: P) => (
  <div className={className} css={styles}>
    <div>
      <VideoResultListItemImage data={data} />
    </div>
    <div>
      <VideoResultListItemHeader data={data} />
      <VideoResultListItemSrc data={data} language={language} />
    </div>
  </div>
);
