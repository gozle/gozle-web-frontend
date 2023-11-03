import { useTranslation } from 'next-i18next';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { GozlePlayer } from '@/components/gozle-player/player';
import { VideoEmbededPlayer } from '@/components/video/embeded-player';

import { EmbededPlayerContext } from './embeded-player.layout';
import styles from './video-player-closure.module.scss';
import { count } from 'services/app-api';

// Замыкание плеера в DOM чтобы он не перерендерился при переходе между страницами
export const VideoPlayerClosure = () => {
  const { t } = useTranslation('player');

  const {
    ad,
    adShowed,
    data,
    firstPlay,
    onFirstPlay,
    onSkipAd,
    playNext,
    reset,
    toggleWideScreen,
    videoId,
    wideScreen,
  } = useContext(EmbededPlayerContext);

  // Контейнер для видео на странице видео (/videos/watch/[id])
  const [videoContainer, setVideoContainer] = useState<HTMLElement | null>(
    null,
  );

  // Замыкание для того чтобы сделать плеер reparantable
  const childContainer = useRef<HTMLElement | null>(null);

  const handleVideoClose = () => reset?.();
  const handleVideoEnded = () => playNext?.();
  const handleReady = useCallback(() => count(), []);

  // Обработка события рендера контейнера для видео на странице видео
  useEffect(() => {
    const mountListener = () =>
      setVideoContainer(document.getElementById('big-video-container'));
    const unmountListener = () => setVideoContainer(null);

    window.addEventListener('bigVideoPlayerContainerMounted', mountListener);
    window.addEventListener(
      'bigVideoPlayerContainerUnmounted',
      unmountListener,
    );

    return () => {
      window.removeEventListener(
        'bigVideoPlayerContainerMounted',
        mountListener,
      );
      window.removeEventListener(
        'bigVideoPlayerContainerUnmounted',
        unmountListener,
      );
    };
  }, []);

  // Создание замыкания
  useEffect(() => {
    childContainer.current = document.createElement('div');
  }, []);

  if (data) {
    const isAd = !adShowed && ad;

    const videoPlayer = (
      <GozlePlayer
        className={wideScreen ? styles.container : ''}
        firstPlay={firstPlay}
        i18n={{
          advertisement: t('advertisement'),
          auto: t('auto'),
          normal: t('normal'),
          ok: t('ok'),
          playbackRate: t('playback_rate'),
          playbackSettings: t('playback_settings'),
          quality: t('quality'),
          rate: t('rate'),
          skip: t('skip'),
        }}
        landingUrl={isAd ? ad.landingUrl : undefined}
        onEnded={handleVideoEnded}
        onReady={handleReady}
        onSkip={onSkipAd}
        onFirstPlay={onFirstPlay}
        skipoffset={isAd ? 5 : undefined}
        thumbnail={data.thumbnail}
        title={isAd ? ad.title : undefined}
        toggleWideScreen={toggleWideScreen}
        type={isAd ? 'ad' : 'video'}
        url={isAd ? ad.videoUrl : data.m3u8}
        videoType={'application/vnd.apple.mpegurl'}
        wideScreen={wideScreen}
      />
    );

    if (childContainer.current)
      return (
        <>
          {createPortal(videoPlayer, childContainer.current)}
          <VideoEmbededPlayer
            onClose={handleVideoClose}
            videoElement={childContainer.current}
            videoContainer={videoContainer}
            videoId={videoId}
          />
        </>
      );
    else return <></>;
  } else return <></>;
};

export default VideoPlayerClosure;
