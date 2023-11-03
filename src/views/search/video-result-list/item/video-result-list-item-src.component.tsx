import styled from '@emotion/styled';
import React from 'react';

import { TrimmedTypography } from '@/components/base';
import { AmountOfViews } from '@/components/common';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { VideoData } from 'lib/types';

interface P {
  data: VideoData;
  language: string;
}

const Div = styled('div')`
  font-size: 1em;
  margin: 0.25em 0;

  & > .views-date {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    margin-bottom: 0.25em;

    & > .bullet {
      font-size: 1.25em;
      padding: 0 0.5em;
    }

    & > time {
      font-weight: 300;
      text-align: end;
    }
  }

  & > .name {
    font-weight: 300;
    font-style: normal;
  }
`;

export const VideoResultListItemSrc = ({ data, language }: P) => {
  return data.src.icon ? (
    <Div>
      <div className="views-date">
        <AmountOfViews views={data.views} />
        <span className="bullet">•</span>
        <time>{tunedDayjs(data.timestamp).locale(language).fromNow()}</time>
      </div>
      <TrimmedTypography Component="cite" className="name" numOfLines={2}>
        {data.src.name}
      </TrimmedTypography>
    </Div>
  ) : (
    <></>
  );
};
