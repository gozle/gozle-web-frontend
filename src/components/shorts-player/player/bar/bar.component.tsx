import React, { useContext } from 'react';

import { ShortsPlayerContext } from '../shorts-player.context';

import styles from './bar.module.scss';
import { Controls } from './controls';

export const Bar = () => {
  const { setMuted, setPlaying } = useContext(ShortsPlayerContext);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        setPlaying((prev) => !prev);
        break;
      case 'KeyM':
        setMuted((prev) => !prev);
        break;
    }
  };

  return (
    <div
      className={styles.bar_container}
      onClick={() => setPlaying((prev) => !prev)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.bar} onClick={(e) => e.stopPropagation()}>
        <Controls />
      </div>
    </div>
  );
};
