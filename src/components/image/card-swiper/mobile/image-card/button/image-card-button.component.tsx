import React, { useContext } from 'react';

import { AppThemeContext } from 'pages/_app';

import styles from './image-card-button.module.scss';

interface P {
  icon: JSX.Element;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  title: string;
}

export const ImageCardButton = ({ icon, onClick, title }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.icon}
        style={{ background: theme?.palette.background.contrast }}
      >
        {icon}
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
