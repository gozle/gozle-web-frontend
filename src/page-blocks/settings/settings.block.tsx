import React from 'react';

import {
  ColorSchemeSwitchContainer,
  LanguageSelectContainer,
} from '@/containers';

import styles from './settings.module.scss';

interface P {
  className?: string;
  hideColorScheme?: boolean;
  hideLanguage?: boolean;
}

export const SettingsBlock = ({
  className = '',
  hideColorScheme,
  hideLanguage,
}: P) => (
  <div className={styles.container + ' ' + className}>
    {!hideColorScheme && (
      <ColorSchemeSwitchContainer className={styles.color_scheme} />
    )}
    {!hideLanguage && <LanguageSelectContainer className={styles.language} />}
  </div>
);
