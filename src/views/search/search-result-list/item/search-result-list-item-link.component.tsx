import styled from '@emotion/styled';
import React, { useContext } from 'react';

import { ImgIconInRound } from '@/components/common';
import { AppTheme } from 'lib/theme';
import { WebSearchData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

interface P {
  data: WebSearchData;
}

const A = styled('a')(
  ({ theme }: { theme?: AppTheme }) => `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: ${theme?.palette.search.src};
  font-weight: 700;
  font-size: 1.125em;
  margin: 0.25em 0;

  & > .icon {
    font-size: 0.575em;
    margin-right: 0.5em;
  }

  & > .link-href {
    width: calc(100% - 1.5em);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover,
  &:focus {
    color: ${theme?.palette.search.src_hover};
  }

  @media (min-width: 769px) {
    & > .icon {
      display: none;
    }

    & > .link-href {
      width: 100%;
    }
}
`,
);

export const SearchResultListItemLink = ({ data }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <A
      href={data.src.link}
      target="_blank"
      rel="external noopener noreferrer"
      theme={theme}
    >
      {data.src.icon && (
        <span className="icon">
          <ImgIconInRound src={data.src.icon} alt={data.src.icon} />
        </span>
      )}
      <span className="link-href">{data.src.link}</span>
    </A>
  );
};
