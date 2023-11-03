import React, { useContext } from 'react';

import { ShortsPlayerContext } from '../shorts-player.context';

import { BottomControls } from './bottom-controls';
import { CentralControls } from './central-controls';
import styles from './mobile-controls.module.scss';
import { TopControls } from './top-controls';

interface P {
  onBackButtonClick?: () => void;
}

export const MobileControls = ({ onBackButtonClick }: P) => {
  const { buffering, setPlaying } = useContext(ShortsPlayerContext);

  return (
    <div
      className={styles.bar_container}
      onClick={() => setPlaying((prev) => !prev)}
      tabIndex={0}
    >
      <div className={styles.bar_inner_container}>
        <div className={styles.top_bar}>
          <TopControls onBackButtonClick={onBackButtonClick} />
        </div>
        {!buffering && (
          <div className={styles.cental_bar}>
            <CentralControls />
          </div>
        )}
        <div className={styles.bottom_bar}>
          <BottomControls />
        </div>
      </div>
    </div>
  );
};
