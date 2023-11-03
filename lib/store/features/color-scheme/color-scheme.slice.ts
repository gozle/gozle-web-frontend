import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ColorSchemeReducers, ColorSchemeState } from './color-scheme.type';

let initialState = null;

export const colorSchemeSlice = createSlice<
  ColorSchemeState,
  ColorSchemeReducers
>({
  name: 'colorScheme',
  initialState,
  reducers: {
    setColorScheme: (_, action) => action.payload,
  },
  extraReducers: (builder) =>
    builder.addCase(
      HYDRATE,
      (state, action: AnyAction) => state ?? action.payload.colorScheme,
    ),
});

export const { setColorScheme } = colorSchemeSlice.actions;

export const colorSchemeReducer = colorSchemeSlice.reducer;
