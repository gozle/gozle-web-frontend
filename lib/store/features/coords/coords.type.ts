import { PayloadAction } from '@reduxjs/toolkit';

export type Coords = { lat: number; lon: number };
export type CoordsState = Coords | null;
export type CoordsReducers = {
  resetCoords: (state: CoordsState) => CoordsState;
  updateCoords: (
    state: CoordsState,
    action: PayloadAction<Coords>,
  ) => CoordsState;
};
