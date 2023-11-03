import React from 'react';

import { formatWeatherTemp } from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import { WeatherData } from 'lib/types';

import styles from './weather-block.module.scss';
import { HourlyWeather } from './weather-block.type';

interface P {
  data: HourlyWeather[];
  units: WeatherData['hourly_units'];
}

export const WeatherBlockForecast = ({ data, units }: P) => (
  <div className={styles.forecast__container}>
    {data.map((el, i) => (
      <div key={i}>
        <time className={styles.title}>
          {tunedDayjs.unix(el.time).format('LT')}
        </time>
        <div className={styles.forecast_temperature}>
          <div>{formatWeatherTemp(el.temp, units.temperature_2m)}</div>
          <div
            className={styles.forecast_weather_icon}
            style={{
              mask: `url(${el.icon}) no-repeat center`,
              WebkitMask: `url(${el.icon}) no-repeat center`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
        </div>
      </div>
    ))}
  </div>
);
