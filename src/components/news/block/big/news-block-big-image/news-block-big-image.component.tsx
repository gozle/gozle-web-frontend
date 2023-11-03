import React, { useState } from 'react';

import { MuiModalWrapper } from '@/components/common';
import ZoomSVG from 'public/icons/search.svg';

import styles from './news-block-big-image.module.scss';

interface P {
  className?: string;
  img: string;
  title: string;
}

export const NewsBlockBigImage = ({ className = '', title, img }: P) => {
  const [imgFS, setImgFS] = useState<boolean>(false);

  const handleImageClick = () => setImgFS(true);
  const handleClose = () => setImgFS(false);

  return (
    <>
      <div className={styles.img + ' ' + className} onClick={handleImageClick}>
        <img src={img} alt={title} />
        <span className={styles.scale_icon}>
          <ZoomSVG />
        </span>
      </div>
      <MuiModalWrapper open={imgFS} onClose={handleClose}>
        <div className={styles.img_fs_container}>
          <img className={styles.img_fs} src={img} alt={title} />
        </div>
      </MuiModalWrapper>
    </>
  );
};
