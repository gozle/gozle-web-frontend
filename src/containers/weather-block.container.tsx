import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import { DefaultError } from '@/components/common';
import { WeatherBlock, WeatherBlockPermissionRequest } from '@/components/home';
import { WeatherBlockSkeleton } from '@/components/skeletons';
import { useAppSelector } from 'lib/hooks';
import { useGetWeatherQuery } from 'services/news-api';

interface P {
  className?: string;
}

export const WeatherBlockContainer = ({ className }: P) => {
  const { i18n } = useTranslation();
  const coords = useAppSelector((state) => state.coords);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // const { isLoading, data } = useGetClosestCityQuery(coords ?? skipToken);
  const { data: weather, error } = useGetWeatherQuery(
    coords ? { ...coords, language: i18n.language } : skipToken,
  );

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (typeof window === 'undefined' || !coords || !isMounted)
    return <WeatherBlockPermissionRequest />;

  return weather ? (
    <WeatherBlock className={className} city={weather.city} data={weather} />
  ) : error ? (
    <DefaultError style={{ height: '150px' }} />
  ) : (
    <WeatherBlockSkeleton className={className} />
  );
};
