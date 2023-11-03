import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useContext } from 'react';

import { ImgFullData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './image-content.module.scss';

interface P {
  data: ImgFullData;
}

export const ImageContent = ({ data }: P) => {
  const theme = useContext(AppThemeContext);
  const { t } = useTranslation('image');

  const handleDownloadClick = () => {
    let link = document.createElement('a');

    document.body.appendChild(link); // for Firefox

    link.setAttribute('href', data.link);
    link.setAttribute('download', new Date().toLocaleDateString());
    link.click();

    document.body.removeChild(link);
  };

  return (
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
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadClick}
        >
          {t('open')}
        </Button>
      </div>
    </div>
  );
};
