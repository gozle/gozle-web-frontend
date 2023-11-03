import { useTranslation } from 'next-i18next';
import React from 'react';

import {
  formatWeatherTemp,
  getWeatherIconName,
  getWeatherIconUrl,
} from 'lib/helpers';
import { WeatherData } from 'lib/types';

import { WeatherBlockAdditionalData } from './weather-block-additional-data.component';
import { WeatherBlockForecast } from './weather-block-forecast.component';
import styles from './weather-block.module.scss';
import { HourlyWeather } from './weather-block.type';

interface P {
  city: string;
  className?: string;
  data: WeatherData;
}

export const WeatherBlock = ({ city, className = '', data }: P) => {
  const { t } = useTranslation('weather');

  const temp: HourlyWeather[] = data.hourly.time.map((el, i) => ({
    temp: Math.round(data.hourly.temperature_2m[i]),
    appTemp: Math.round(data.hourly.apparent_temperature[i]),
    time: el,
    code: data.hourly.weathercode[i],
    icon: getWeatherIconUrl(
      getWeatherIconName({
        code: data.hourly.weathercode[i],
        isDay: el > data.daily.sunrise[0] && el < data.daily.sunset[0],
      }),
    ),
    wind: data.hourly.windspeed_10m[i],
    pressure: data.hourly.pressure_msl[i],
    humidity: data.hourly.relativehumidity_2m[i],
  }));

  return (
    <section className={styles.weather_block + ' ' + className}>
      {/* <header className={styles.header}>
        <div className={styles.city_name}>{city}</div>
        <time>{tunedDayjs.unix(temp[0].time).format('LT')}</time>
      </header> */}
      <div className={styles.current_weather}>
        <WeatherBlockAdditionalData data={temp[0]} units={data.hourly_units} />
        <div className={styles.temperature}>
          <div className={styles.current_temperature}>
            <div>
              {formatWeatherTemp(
                temp[0].temp,
                data.hourly_units.temperature_2m,
              )}
            </div>
            <div
              className={styles.current_weather_icon}
              style={{
                mask: `url(${temp[0].icon}) no-repeat center`,
                WebkitMask: `url(${temp[0].icon}) no-repeat center`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </div>
          <div className={styles.apparent_temperature}>
            <span className={styles.title}>{t('apparent_temperature')}</span>
            <span className={styles.value}>
              {temp[0].appTemp
                ? formatWeatherTemp(
                    temp[0].appTemp,
                    data.hourly_units.apparent_temperature,
                  )
                : '-'}
            </span>
          </div>
        </div>
      </div>
      <WeatherBlockForecast data={temp.slice(1)} units={data.hourly_units} />
    </section>
  );
};
