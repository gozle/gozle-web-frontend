import type Hls from 'hls.js';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/file';

import { Loader } from '../components/loader';
import { useResizeObserver, useTouchscreen } from '../hooks';

import { Bar } from './bar';
import { MobileControls } from './mobile-controls';
import {
  ShortsPlayerContext,
  IShortsPlayerContext,
} from './shorts-player.context';
import styles from './shorts-player.module.scss';

type P = {
  className?: string;
  forcePlaying: boolean;
  onBackButtonClick?: () => void;
  onEnded?: () => void;
  url: string;
};

export const ShortsPlayer = ({
  className = '',
  forcePlaying,
  onBackButtonClick,
  onEnded,
  url,
}: P) => {
  const [buffering, setBuffering] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const { width } = useResizeObserver(containerRef);

  const touchscreen = useTouchscreen();

  const handleEnded = () => onEnded?.();

  const handleReady = () => {
    setReady(true);
    if (playerRef.current) {
      hlsRef.current = playerRef.current.getInternalPlayer('hls') as Hls;
    }
  };

  useEffect(() => {
    playerRef.current?.seekTo(0);
    setPlaying(forcePlaying);
  }, [forcePlaying]);

  const contextValue: IShortsPlayerContext = {
    buffering,
    containerHeight: containerRef.current?.getBoundingClientRect().height || 0,
    containerWidth: containerRef.current?.getBoundingClientRect().width || 0,
    muted,
    playing,
    setMuted,
    setPlaying,
    volume: 1,
  };

  return (
    <div className={styles.container + ' ' + className} ref={containerRef}>
      <ShortsPlayerContext.Provider value={contextValue}>
        <div className={styles.player_container}>
          <ReactPlayer
            config={{ hlsOptions: { liveSyncDurationCount: 9 } }}
            height="100%"
            muted={muted}
            onBuffer={() => setBuffering(true)}
            onBufferEnd={() => setBuffering(false)}
            onEnded={handleEnded}
            onPause={() => setPlaying(false)}
            onReady={handleReady}
            playing={playing}
            playsinline
            ref={playerRef}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            url={url}
            width="100%"
          />
        </div>
        {ready ? (
          touchscreen ? (
            <MobileControls onBackButtonClick={onBackButtonClick} />
          ) : (
            <Bar />
          )
        ) : (
          <></>
        )}
        {buffering && (
          <div className={styles.loader_container}>
            <Loader />
          </div>
        )}
      </ShortsPlayerContext.Provider>
    </div>
  );
};

export default ShortsPlayer;
