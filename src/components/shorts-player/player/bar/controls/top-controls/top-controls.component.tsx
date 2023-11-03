import React, { useContext } from 'react';

import { PlayPauseButton, VolumeButton } from '../../../../components/buttons';
import { ShortsPlayerContext } from '../../../shorts-player.context';

import styles from './top-controls.module.scss';

export const TopControls = () => {
  const { muted, playing, setMuted, setPlaying, volume } =
    useContext(ShortsPlayerContext);

  const handlePlayPauseButtonClick = () => setPlaying((prev) => !prev);

  const handleVolumeButtonClick = () => setMuted((prev) => !prev);

  return (
    <div className={styles.container}>
      <PlayPauseButton onClick={handlePlayPauseButtonClick} playing={playing} />
      <VolumeButton
        muted={muted}
        onClick={handleVolumeButtonClick}
        volume={volume}
      />
    </div>
  );
};
