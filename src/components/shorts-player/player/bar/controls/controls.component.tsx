import React from 'react';

import styles from './controls.module.scss';
import { TopControls } from './top-controls';

export const Controls = () => (
  <div className={styles.controls}>
    <TopControls />
  </div>
);
Controls.displayName = 'Controls';
