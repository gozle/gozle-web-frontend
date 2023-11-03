import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useContext } from 'react';

import { getVideoLink } from 'lib/helpers';
import { AppTheme } from 'lib/theme';
import { VideoData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

interface P {
  data: VideoData;
}

const Header = styled('header')(
  ({ theme }: { theme?: AppTheme }) => `
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 0.25em;

  & > .title {
    display: block;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${theme?.palette.search.title};

    &:hover,
    &:focus {
      color: ${theme?.palette.search.title_hover};
    }
  }
`,
);

export const VideoResultListItemHeader = ({ data }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <Header theme={theme}>
      <Link
        href={getVideoLink(data.id)}
        className="title"
        target="_blank"
        rel="external noopener noreferrer"
      >
        {data.title}
      </Link>
    </Header>
  );
};
