import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';

interface P {
  className?: string;
  views: number;
}

const Root = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > svg {
    font-size: 1.25em;
  }

  & > .views {
    margin-left: 0.25em;
  }
`;

export const AmountOfViews = ({ className, views }: P) => (
  <Root className={className}>
    <VisibilityIcon />
    <span className="views">{views}</span>
  </Root>
);
