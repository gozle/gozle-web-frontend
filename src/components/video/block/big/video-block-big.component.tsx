import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';

import { AmountOfViews } from '@/components/common';
import { PageTitledBlock } from '@/page-blocks';
import { getVideoChannelLink } from 'lib/helpers';
import type { VideoData, VideoExtendedData } from 'lib/types';

import { VideoHorizontalCardList } from '../../list';
import { VideoSrc } from '../../src';

import VideoBlockBigVideoPlayerContainer from './video-block-big-video-player-container.component';
import styles from './video-block-big.module.scss';

// const VideoBlockBigVideoPlayerContainer = dynamic(
//   () => import('./video-block-big-video-player-container.component'),
//   { ssr: false },
// );

interface P {
  className?: string;
  data: VideoExtendedData;
  videos?: VideoData[];
  wideScreen?: boolean;
}

export const VideoBlockBig = ({
  className = '',
  data,
  videos,
  wideScreen,
}: P) => {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setOpen(true);
  };

  const handleTooltipClose = () => setOpen(false);

  const handleFullDescriptionToggle = () => {
    if (ref.current) ref.current.checked = !ref.current.checked;
  };

  const handleSrcClick = () => {
    router.push({ pathname: getVideoChannelLink(data.src.id!) }, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <article className={styles.video_block + ' ' + className}>
      <div
        className={
          styles.empty_player_layout +
          (wideScreen ? ' ' + styles.widescreen : '')
        }
      >
        <VideoBlockBigVideoPlayerContainer />
      </div>
      <div className={styles.content}>
        <div
          className={
            styles.main_content + (wideScreen ? ' ' + styles.widescreen : '')
          }
        >
          <header>
            <div className={styles.title}>{data.title}</div>
          </header>
          <div className={styles.src_container}>
            {data.src.icon && (
              <>
                <VideoSrc
                  name={data.src.name}
                  icon={data.src.icon}
                  iconSize="large"
                  onClick={handleSrcClick}
                />
                <span className={styles.bullet}>•</span>
              </>
            )}
            <AmountOfViews views={data.views} />
          </div>
          <div className={styles.description}>
            <input ref={ref} style={{ display: 'none' }} type="checkbox" />
            {data.description.length > 100 ? (
              <>
                <div className={styles.shortDescription}>
                  <span>{data.description.slice(0, 150)}...</span>
                  <span
                    className={styles.showFullDescription}
                    onClick={handleFullDescriptionToggle}
                  >
                    {t('show_full_description')}
                  </span>
                </div>
                <div className={styles.fullDescription}>
                  <span>{data.description}</span>
                  <br />
                  <br />
                  <span
                    className={styles.hideFullDescription}
                    onClick={handleFullDescriptionToggle}
                  >
                    {t('hide_full_description')}
                  </span>
                </div>
              </>
            ) : (
              data.description
            )}
          </div>
          <Box sx={{ ml: 'auto' }}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                open={open}
                onClose={handleTooltipClose}
                title={
                  <Typography variant="body1" component="div">
                    {t('coppied')}
                  </Typography>
                }
                placement="top"
                enterTouchDelay={0}
                disableFocusListener
                disableHoverListener
              >
                <IconButton onClick={handleCopyClick}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          </Box>
        </div>
        {wideScreen && (
          <div className={styles.see_also}>
            {videos && (
              <PageTitledBlock title={t('see_also')}>
                <VideoHorizontalCardList videos={videos} />
              </PageTitledBlock>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
