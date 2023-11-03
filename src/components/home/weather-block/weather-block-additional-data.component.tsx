import React from 'react';

import { WeatherData } from 'lib/types';
import HumiditySVG from 'public/icons/humidity.svg';
import PressureSVG from 'public/icons/pressure.svg';
import WindSVG from 'public/icons/wind.svg';

import styles from './weather-block.module.scss';
import { HourlyWeather } from './weather-block.type';

interface P {
  data: HourlyWeather;
  units: WeatherData['hourly_units'];
}

export const WeatherBlockAdditionalData = ({ data, units }: P) => (
  <div className={styles.additional_data}>
    <div>
      <span className={styles.title}>
        <PressureSVG />
      </span>
      <span className={styles.value}>
        {data.pressure ?? '-'} {units.pressure_msl}
      </span>
    </div>
    <div>
      <span className={styles.title}>
        <WindSVG />
      </span>
      <span className={styles.value}>
        {data.wind ?? '-'} {units.windspeed_10m}
      </span>
    </div>
    <div>
      <span className={styles.title}>
        <HumiditySVG />
      </span>
      <span className={styles.value}>
        {data.humidity ?? '-'}
        {units.relativehumidity_2m}
      </span>
    </div>
  </div>
);
