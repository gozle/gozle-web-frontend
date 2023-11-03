import { useTranslation } from 'next-i18next';
import React from 'react';

import {
  formatWeatherTemp,
  getWeatherIconName,
  getWeatherIconUrl,
} from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { WeatherData } from 'lib/types';

import styles from './weather-shortcut.module.scss';
import type { HourlyWeather } from './weather-shortcut.type';

interface P {
  className?: string;
  data: WeatherData;
}

export const WeatherShortcut = ({ className = '', data }: P) => {
  const { t } = useTranslation('weather');

  const temp: HourlyWeather[] = data.hourly.time.map((el, i) => ({
    temp: Math.round(data.hourly.temperature_2m[i]),
    time: el,
    code: data.hourly.weathercode[i],
    icon: getWeatherIconUrl(
      getWeatherIconName({
        code: data.hourly.weathercode[i],
        isDay: el > data.daily.sunrise[0] && el < data.daily.sunset[0],
      }),
    ),
  }));

  return (
    <div className={styles.weather_shortcut + ' ' + className}>
      <header>
        <div className={styles.title}>{t('weather')}</div>
        <div className={styles.forecast}>
          {temp.slice(1, 3).map((el, i) => (
            <div key={i}>
              <time>{tunedDayjs.unix(el.time).format('LT')}</time>
              <span>: </span>
              <span>
                {formatWeatherTemp(el.temp, data.hourly_units.temperature_2m)}
              </span>
            </div>
          ))}
        </div>
      </header>
      <div className={styles.current_weather}>
        <div
          className={styles.icon}
          style={{
            mask: `url(${temp[0].icon}) no-repeat center`,
            WebkitMask: `url(${temp[0].icon}) no-repeat center`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
        <div className={styles.current_temperature}>
          {formatWeatherTemp(temp[0].temp, data.hourly_units.temperature_2m)}
        </div>
      </div>
    </div>
  );
};
