import React, { useContext } from 'react';

import { PlayPauseButton } from '../../../components/buttons';
import { ShortsPlayerContext } from '../../shorts-player.context';

import styles from './central-controls.module.scss';

export const CentralControls = () => {
  const { playing, setPlaying } = useContext(ShortsPlayerContext);

  const handlePlayPauseButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPlaying((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {!playing && (
        <PlayPauseButton
          onClick={handlePlayPauseButtonClick}
          playing={playing}
        />
      )}
    </div>
  );
};
