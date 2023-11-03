import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useContext } from 'react';

import { ImgIconInRound } from '@/components/common';
import { AppTheme } from 'lib/theme';
import { WebSearchData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

interface P {
  data: WebSearchData;
}

const Header = styled('header')(
  ({ theme }: { theme?: AppTheme }) => `
  & > .icon {
    display: none;
  }

  & > .title {
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.25em;
    color: ${theme?.palette.search.title};

    &:hover,
    &:focus {
      color: ${theme?.palette.search.title_hover};
    }
  }

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: flex-end;

    & > .title {
      display: block;
      white-space: nowrap;
      -webkit-line-clamp: 1;
      margin-right: auto;
    }

    & > .icon {
      display: flex;
      position: absolute;
      top: 0;
      left: -4.5em;
      font-size: 0.75em;
    }
  }  
`,
);

export const SearchResultListItemHeader = ({ data }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <Header theme={theme}>
      {data.src.icon && (
        <span className="icon">
          <ImgIconInRound src={data.src.icon} alt={data.src.icon} />
        </span>
      )}
      <Link
        href={data.src.link}
        className="title"
        target="_blank"
        rel="external noopener noreferrer"
      >
        {data.title}
      </Link>
    </Header>
  );
};
