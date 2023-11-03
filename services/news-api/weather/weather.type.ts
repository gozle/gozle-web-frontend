export type GetWeatherRequest = { lat: number; lon: number; language: string };
export type GetWeatherResponse = {
  hourly_units: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    apparent_temperature: string;
    pressure_msl: string;
    precipitation: string;
    weathercode: string;
    windspeed_10m: string;
  };
  hourly: {
    [P in keyof GetWeatherResponse['hourly_units']]: number[];
  };
  daily_units: { time: string; sunrise: string; sunset: string };
  daily: {
    [P in keyof GetWeatherResponse['daily_units']]: number[];
  };
};
