import React from 'react';

import { BackButton } from '../../../components/buttons';
import { GozleLogo } from '../../../components/gozle-logo';

import styles from './top-controls.module.scss';

interface P {
  onBackButtonClick?: () => void;
}

export const TopControls = ({ onBackButtonClick }: P) => (
  <div className={styles.container}>
    {onBackButtonClick ? (
      <BackButton onClick={onBackButtonClick} />
    ) : (
      <GozleLogo />
    )}
  </div>
);
