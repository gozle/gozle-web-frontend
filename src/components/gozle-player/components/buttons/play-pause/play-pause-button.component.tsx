import React from 'react';

import { PauseIcon, PlayIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './play-pause-button.module.scss';

type P = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  playing: boolean;
};

export const PlayPauseButton = ({ playing, onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    {playing ? <PauseIcon /> : <PlayIcon />}
  </IconButton>
);
