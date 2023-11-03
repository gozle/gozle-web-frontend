import React, { useEffect } from 'react';

import styles from './video-block-big.module.scss';

export const VideoBlockBigVideoPlayerContainer = () => {
  useEffect(() => {
    window.dispatchEvent(new Event('bigVideoPlayerContainerMounted'));

    return () => {
      window.dispatchEvent(new Event('bigVideoPlayerContainerUnmounted'));
    };
  }, []);

  return (
    <div
      id="big-video-container"
      className={styles.empty_player_layout_inner_container}
    />
  );
};
export default VideoBlockBigVideoPlayerContainer;
