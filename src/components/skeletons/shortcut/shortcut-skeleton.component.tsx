import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './shortcut-skeleton.module.scss';

export const ShortcutSkeleton = () => (
  <div className={styles.shortcut_skeleton}>
    <ContentLoader
      speed={1}
      height={108}
      width={108}
      viewBox="0 0 108 108"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="29.25" cy="29.25" r="20.25" />
      <rect x="9" y="55" rx="7" ry="7" width="90" height="14" />
      <rect x="9" y="73" rx="6" ry="6" width="90" height="12" />
      <rect x="9" y="87" rx="6" ry="6" width="90" height="12" />
    </ContentLoader>
  </div>
);
