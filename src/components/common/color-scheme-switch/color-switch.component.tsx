import React from 'react';

import { DarkThemeIcon, LightThemeIcon } from '@/icons';

import styles from './color-switch.module.scss';

interface P {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorSwitch = ({ checked, onChange }: P) => (
  <div className={styles.container}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    {checked ? <LightThemeIcon /> : <DarkThemeIcon />}
  </div>
);
