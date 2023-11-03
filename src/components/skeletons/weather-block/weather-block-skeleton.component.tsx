import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './weather-block-skeleton.module.scss';

interface P {
  className?: string;
}

export const WeatherBlockSkeleton = ({ className = '' }: P) => (
  <div className={styles.container + ' ' + className}>
    <ContentLoader
      uniqueKey="weather-block-skeleton"
      speed={1}
      height={170}
      width={268}
      viewBox="0 0 268 170"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="2" rx="13" ry="13" width="90" height="26" />
      <rect x="102" y="5" rx="10" ry="10" width="50" height="20" />
      <circle cx="10.5" cy="52.5" r="10.5" />
      <rect x="28" y="44.5" rx="8" ry="8" width="80" height="16" />
      <circle cx="10.5" cy="77.5" r="10.5" />
      <rect x="28" y="69.5" rx="8" ry="8" width="80" height="16" />
      <circle cx="10.5" cy="102.5" r="10.5" />
      <rect x="28" y="94.5" rx="8" ry="8" width="80" height="16" />
      <rect x="125" y="45" rx="17" ry="17" width="80" height="34" />
      <circle cx="237" cy="62" r="24" />
      <rect x="118" y="95.5" rx="7" ry="7" width="150" height="14" />
      <rect x="0" y="121" rx="0.5" ry="0.5" width="268" height="1" />
      <rect x="0" y="132" rx="7" ry="7" width="35" height="14" />
      <rect x="0" y="150" rx="8" ry="8" width="40" height="16" />
      <circle cx="56" cy="158" r="12" />
      <rect x="100" y="132" rx="7" ry="7" width="35" height="14" />
      <rect x="100" y="150" rx="8" ry="8" width="40" height="16" />
      <circle cx="156" cy="158" r="12" />
      <rect x="200" y="132" rx="7" ry="7" width="35" height="14" />
      <rect x="200" y="150" rx="8" ry="8" width="40" height="16" />
      <circle cx="256" cy="158" r="12" />
    </ContentLoader>
  </div>
);
