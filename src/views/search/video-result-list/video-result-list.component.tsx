import styled from '@emotion/styled';
import React, { useContext } from 'react';

import { PageBlockWrapper } from '@/components/common';
import { VideoData } from 'lib/types';

import { TranslationContext } from '../translation.context';

import { VideoResultListItem } from './item';

interface P {
  data: VideoData[];
  language: string;
}

const Root = styled('div')`
  & > div:first-of-type {
    font-size: 1.25em;
    margin-bottom: 0.75em;
  }

  & > div:last-of-type {
    width: 100%;

    & > div + div {
      margin-top: 1em;
    }
  }
`;

export const VideoResultList = ({ data, language }: P) => {
  const translations = useContext(TranslationContext);

  return (
    <PageBlockWrapper withPaddings={true}>
      <Root>
        <div>{translations['videos']}</div>
        <div>
          {data.map((result, i) => (
            <VideoResultListItem key={i} data={result} language={language} />
          ))}
        </div>
      </Root>
    </PageBlockWrapper>
  );
};
