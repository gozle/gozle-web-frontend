export const getWeatherIconName = (data: {
  code: number;
  isDay: boolean;
}): string => {
  const weatherMap: Record<number, [string, string]> = {
    0: ['sun', 'moon'],
    1: ['variable_sun', 'variable_halfmoon'],
    2: ['variable_sun', 'variable_halfmoon'],
    3: ['cloud', 'cloud'],
    45: ['fog_sun', 'fog_halfmoon'],
    48: ['fog_sun', 'fog_halfmoon'],
    51: ['mistyrain_sun', 'mistyrain_fullmoon'],
    53: ['mistyrain_sun', 'mistyrain_fullmoon'],
    55: ['mistyrain', 'mistyrain'],
    56: ['mistyrain_sun', 'mistyrain_fullmoon'],
    57: ['mistyrain', 'mistyrain'],
    61: ['downpour_sun', 'downpour_halfmoon'],
    63: ['downpour_sun', 'downpour_halfmoon'],
    65: ['rain', 'rain'],
    66: ['downpour_sun', 'downpour_halfmoon'],
    67: ['rain', 'rain'],
    71: ['snow_sun', 'snow_halfmoon'],
    73: ['snow_sun', 'snow_halfmoon'],
    75: ['snow', 'snow'],
    77: ['snowflake', 'snowflake'],
    80: ['downpour_sun', 'downpour_halfmoon'],
    81: ['downpour_sun', 'downpour_halfmoon'],
    82: ['rain', 'rain'],
    85: ['snow_sun', 'snow_halfmoon'],
    86: ['snow', 'snow'],
    95: ['storm_sun', 'storm_halfmoon'],
    96: ['hail_sun', 'hail_halfmoon'],
    99: ['hail', 'hail'],
  };
  return weatherMap[data.code][data.isDay ? 0 : 1];
};

export const getWeatherIconUrl = (name: string) => `/icons/weather/${name}.svg`;

/*

0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/

export const formatWeatherTemp = (temp: number, units: string): string =>
  `${temp > 0 ? '+' : ''}${temp}${units}`;
