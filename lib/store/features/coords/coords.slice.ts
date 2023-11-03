import { createSlice } from '@reduxjs/toolkit';

import { CoordsReducers, CoordsState } from './coords.type';

const initialState = null;

export const coordsSlice = createSlice<CoordsState, CoordsReducers>({
  name: 'coords',
  initialState,
  reducers: {
    updateCoords: (_, action) => action.payload,
    resetCoords: () => initialState,
  },
});

export const { updateCoords, resetCoords } = coordsSlice.actions;

export const coordsReducer = coordsSlice.reducer;
