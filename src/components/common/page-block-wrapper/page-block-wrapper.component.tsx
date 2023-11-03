import styled from '@emotion/styled';
import React, { useContext } from 'react';

import { AppThemeContext } from 'pages/_app';

interface P {
  children: JSX.Element | JSX.Element[];
  className?: string;
  pageBlockStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  withPaddings?: boolean;
}

const Root = styled('div')`
  padding: 0.25em 0;
  box-sizing: border-box;

  & > div {
    height: 100%;
    border-radius: 0.5em;

    &.with-paddings {
      padding: 1em;
    }
  }

  @media (min-width: 769px) {
    padding: 0.25em;
  }
`;

export const PageBlockWrapper = ({
  children,
  className,
  pageBlockStyle,
  style,
  withPaddings,
}: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <Root theme={theme} className={className} style={style}>
      <div
        className={withPaddings ? 'with-paddings' : ''}
        style={{
          backgroundColor: theme?.palette.background.pageBlock,
          ...pageBlockStyle,
        }}
      >
        {children}
      </div>
    </Root>
  );
};
