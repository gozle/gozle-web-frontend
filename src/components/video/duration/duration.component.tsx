import styled from '@emotion/styled';
import React from 'react';

import { secondsToTime } from 'lib/helpers';

interface P {
  value: number;
}

const Root = styled('span')`
  position: absolute;
  font-size: 0.875em;
  bottom: 0;
  right: 0;
  padding: 0.25em 0.5em;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 0.5em;
`;

export const Duration = ({ value }: P) => <Root>{secondsToTime(value)}</Root>;
