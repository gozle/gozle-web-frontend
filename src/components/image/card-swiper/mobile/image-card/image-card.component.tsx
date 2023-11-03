import CropIcon from '@mui/icons-material/Crop';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'next-i18next';
import React, { useContext, useState } from 'react';

import { ImageEditor } from '@/components/base';
import { MuiModalWrapper } from '@/components/common';
import { ImgFullData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import { ImageCardButton } from './button';
import styles from './image-card.module.scss';

interface P {
  data: ImgFullData;
}

export const ImageCard = ({ data }: P) => {
  const theme = useContext(AppThemeContext);
  const { t } = useTranslation('image');
  const [open, setOpen] = useState<boolean>(false);

  const handleDownloadClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let link = document.createElement('a');

    document.body.appendChild(link); // for Firefox

    link.setAttribute('href', data.link);
    link.setAttribute('download', new Date().toLocaleDateString());
    link.click();

    document.body.removeChild(link);
  };

  return (
    <article className={styles.container}>
      <div className={styles.img}>
        <img src={data.link} alt={data.description} />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <a
            className={styles.description}
            href={data.src.link}
            rel="external"
            style={
              {
                '--title-color': theme?.palette.search.title,
                '--title-color-hover': theme?.palette.search.title_hover,
              } as React.CSSProperties
            }
          >
            <div>{data.description}</div>
          </a>
        </header>
        <a
          className={styles.src}
          href={data.src.link}
          rel="external"
          style={
            {
              '--src-color': theme?.palette.search.src,
              '--src-color-hover': theme?.palette.search.src_hover,
            } as React.CSSProperties
          }
        >
          {/* <div className={styles.src_icon}>
            <img src={data.src.icon} alt={data.src.name} />
          </div> */}
          <div className={styles.src_name}>{data.src.name}</div>
        </a>
        <div className={styles.btns}>
          <ImageCardButton
            title={t('download')}
            icon={<DownloadIcon />}
            onClick={handleDownloadClick}
          />
          <ImageCardButton
            title={t('crop')}
            icon={<CropIcon />}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <MuiModalWrapper open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '1em 0', height: '100%', background: 'black' }}>
          <ImageEditor src={data.link} />
        </div>
      </MuiModalWrapper>
    </article>
  );
};
