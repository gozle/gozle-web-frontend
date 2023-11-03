import React from 'react';

import { Logo } from '@/components/common';

import { SettingsBlock } from '../settings';

import styles from './logo-settings.module.scss';

interface P {
  className: string;
}

export const LogoSettingsBlock = ({ className = '' }: P) => (
  <div className={styles.container + ' ' + className}>
    <SettingsBlock />
    <Logo className={styles.logo} height={40} />
  </div>
);
