import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { ShortcutList } from '@/components/home';
import { useAppSelector } from 'lib/hooks';
import type { Service } from 'lib/types';
import { useGetWeatherQuery } from 'services/news-api';

interface P {
  shortcuts: Service[];
}

export const ShortcutListContainer = ({ shortcuts }: P) => {
  const { i18n } = useTranslation();

  const coords = useAppSelector((state) => state.coords);

  const { data: weather } = useGetWeatherQuery(
    coords ? { ...coords, language: i18n.language } : skipToken,
  );

  return <ShortcutList shortcuts={shortcuts} weather={weather} />;
};
