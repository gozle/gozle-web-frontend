import { Coords } from 'lib/store/features/coords';

export type GetCityResponse = {
  name: string;
  lat: number;
  lon: number;
};
export type GetCityRequest = Coords;
