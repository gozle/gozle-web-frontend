import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { getVideoLink } from 'lib/helpers';
import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { setWideScreen } from 'lib/store/features/video-settings';
import type { VideoAd, VideoData, VideoExtendedData } from 'lib/types';
import {
  useGetVideoByChannelQuery,
  useGetVideoByIdQuery,
} from 'services/video-api';
import { useGetVideoAdQuery } from 'services/video-api/video-ad';

import VideoPlayerClosure from './video-player-closure.component';

// const VideoPlayerClosure = dynamic(
//   () => import('./video-player-closure.component'),
//   { ssr: false },
// );

const WIDE_SCREEN_COOKIE = 'VIDEO__WIDE_SCREEN';

interface P {
  children: JSX.Element;
}

interface IEmbededPlayerContext {
  ad?: VideoAd | null;
  adShowed: boolean;
  data?: VideoExtendedData | null;
  firstPlay: boolean;
  onFirstPlayClick: () => void;
  onSkipAd?: () => void;
  playNext?: () => void;
  reset: () => void;
  toggleWideScreen: () => void;
  videoId: string;
  videos?: VideoData[];
  wideScreen: boolean;
}

export const EmbededPlayerContext = React.createContext<IEmbededPlayerContext>({
  adShowed: false,
  firstPlay: false,
  onFirstPlayClick: () => {},
  reset: () => {},
  toggleWideScreen: () => {},
  videoId: '',
  wideScreen: false,
});

export const WithEmbededPlayerLayout = ({ children }: P) => {
  const wideScreen = useAppSelector((s) => s.videoSettings.wideScreen);

  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [firstPlay, setFirstPlay] = useState(false);
  const [adShowed, setAdShowed] = useState(false);
  const [videoId, setVideoId] = useState(
    router.pathname === '/videos/watch/[id]' &&
      'id' in router.query &&
      typeof router.query['id'] === 'string'
      ? router.query['id']
      : '',
  );

  const [_, setCookie] = useCookies([WIDE_SCREEN_COOKIE]);

  const { currentData: data } = useGetVideoByIdQuery(
    { id: videoId || '' },
    { skip: !videoId },
  );

  const language = i18n.language;

  const { data: ad, isError } = useGetVideoAdQuery(
    { language },
    { skip: !mounted },
  );

  const { data: videos } = useGetVideoByChannelQuery(
    {
      id: data?.src.id!,
      page: 1,
      sort: 'random',
      order: 'asc',
    },
    { skip: !data },
  );

  useEffect(() => {
    if (
      router.pathname === '/videos/watch/[id]' &&
      'id' in router.query &&
      typeof router.query['id'] === 'string'
    )
      setVideoId(router.query['id']);
  }, [router]);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    setCookie(WIDE_SCREEN_COOKIE, wideScreen ? '1' : '0', {
      path: '/',
      maxAge: 31536000,
    });
  }, [wideScreen, setCookie]);

  const playNext = () => {
    if (videos && videos.data && videos.data.length > 0) {
      let nextVideoId = videos.data[0].id;
      if (String(nextVideoId) === videoId) {
        let i = 0;
        while (++i < videos.data.length && String(nextVideoId) === videoId) {
          nextVideoId = videos.data[i].id;

          i++;
        }
      }
      if (nextVideoId !== videoId) {
        if (router.pathname === '/videos/watch/[id]')
          router.push(getVideoLink(nextVideoId));
        else setVideoId(String(nextVideoId));
      }
    }
  };

  const reset = () => setVideoId('');

  const toggleWideScreen = () => {
    dispatch(setWideScreen(!wideScreen));
  };
  const handleSkipAd = () => setAdShowed(true);
  const handleFirstPlayClick = () => setFirstPlay(true);

  useEffect(() => {
    if (isError) setAdShowed(true);
  }, [isError]);

  return (
    <EmbededPlayerContext.Provider
      value={{
        ad,
        adShowed,
        data,
        firstPlay,
        onFirstPlayClick: handleFirstPlayClick,
        onSkipAd: handleSkipAd,
        playNext,
        reset,
        toggleWideScreen,
        videoId,
        videos: videos?.data,
        wideScreen: wideScreen,
      }}
    >
      <>
        {children}
        <VideoPlayerClosure />
      </>
    </EmbededPlayerContext.Provider>
  );
};
