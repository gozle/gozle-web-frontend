import React, { useState } from 'react';

import {
  HorizontalScrollContainer,
  MuiModalWrapper,
} from '@/components/common';
import { InfoData } from 'lib/types';

import styles from './info-card-images.module.scss';

interface P {
  className?: string;
  data: InfoData['images'];
  iframe?: InfoData['iframe'];
}

export const InfoCardImages = ({ className = '', data, iframe }: P) => {
  const [imgFS, setImgFS] = useState<number>(-1);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const index = event.currentTarget.getAttribute('data-index');
    if (index) setImgFS(+index);
  };
  const handleClose = () => setImgFS(-1);

  return (
    <div className={styles.images + ' ' + className}>
      <HorizontalScrollContainer>
        {iframe && (
          <div
            className={styles.img}
            dangerouslySetInnerHTML={{ __html: iframe }}
            key="iframe"
          />
        )}

        {data.map((el, i) => (
          <div className={styles.img} key={el.id}>
            <img
              src={el.url}
              alt={el.url}
              onClick={handleImageClick}
              data-index={i}
            />
          </div>
        ))}
      </HorizontalScrollContainer>
      <MuiModalWrapper open={imgFS !== -1} onClose={handleClose}>
        <div className={styles.img_fs_container}>
          <img
            className={styles.img_fs}
            src={imgFS === -1 ? '' : data[imgFS].url}
            alt={imgFS === -1 ? '' : data[imgFS].url}
          />
        </div>
      </MuiModalWrapper>
    </div>
  );
};
