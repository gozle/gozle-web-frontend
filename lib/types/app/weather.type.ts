import type { GetWeatherResponse } from 'services/news-api';

export interface WeatherData extends GetWeatherResponse {
  city: string;
}
