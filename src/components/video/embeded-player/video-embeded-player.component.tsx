import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

import { Reparentable } from '@/components/base/reparenting';

import styles from './video-embeded-player.module.scss';

interface P {
  onClose: () => void;
  videoContainer: HTMLElement | null;
  videoElement: HTMLElement;
  videoId: string | null;
}

export const VideoEmbededPlayer = React.forwardRef<{ mounted: boolean }, P>(
  ({ onClose, videoContainer, videoElement, videoId }, ref) => {
    const [touchscreen, setTouchscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();

    // Задает флаг, обозначающий наличие <video /> в DOM
    useEffect(() => {
      if (videoContainer || !touchscreen) {
        setMounted(true);
      }

      return () => {
        setMounted(false);
      };
    }, [videoContainer, touchscreen]);

    // Проброс флага наличия <video /> в DOM вышестоящему узлу
    useImperativeHandle(ref, () => ({ mounted }), [mounted]);

    // Проверка на touchscreen
    useEffect(() => {
      if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0)
        setTouchscreen(true);
    }, []);

    return videoContainer ? (
      createPortal(
        <div className={styles.big_player_container}>
          <Reparentable>{videoElement}</Reparentable>
        </div>,
        videoContainer,
      )
    ) : touchscreen ? (
      <></>
    ) : router.pathname !== '/videos/watch/[id]' ? (
      <div className={styles.embeded_player_container}>
        <div className={styles.buttons_container}>
          <IconButton
            size="large"
            onClick={() =>
              router.replace({
                pathname: '/videos/watch/[id]'.replace(
                  '[id]',
                  String(videoId || 0),
                ),
              })
            }
            sx={{ color: 'white' }}
          >
            <OpenInNewIcon />
          </IconButton>
          <IconButton size="large" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </div>
        <Reparentable>{videoElement}</Reparentable>
      </div>
    ) : (
      <></>
    );
  },
);

VideoEmbededPlayer.displayName = 'VideoEmbededPlayer';
