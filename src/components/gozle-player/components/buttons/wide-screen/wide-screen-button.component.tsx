import React from 'react';

import { NormalScreenIcon, WideScreenIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './wide-screen-button.module.scss';

type P = {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  wideScreen: boolean;
};

export const WideScreenButton = ({
  className = '',
  onClick,
  wideScreen,
}: P) => (
  <IconButton className={styles.button + ' ' + className} onClick={onClick}>
    {wideScreen ? <NormalScreenIcon /> : <WideScreenIcon />}
  </IconButton>
);
