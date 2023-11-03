import React from 'react';

import { HorizontalScrollContainer } from '@/components/common';
import type { Service, WeatherData } from 'lib/types';

import { ShortcutListItem } from './item';
import styles from './shortcut-list.module.scss';
import { WeatherShortcut } from './weather-shortcut';

interface P {
  shortcuts: Service[];
  weather?: WeatherData;
}

export const ShortcutList = ({ shortcuts, weather }: P) => (
  <HorizontalScrollContainer>
    {weather && (
      <WeatherShortcut className={styles.shortcut_list_item} data={weather} />
    )}
    {shortcuts.map((data) => (
      <ShortcutListItem
        key={data.id}
        className={styles.shortcut_list_item}
        data={data}
      />
    ))}
  </HorizontalScrollContainer>
);
