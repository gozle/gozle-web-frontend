import { PayloadAction } from '@reduxjs/toolkit';

export type ColorScheme = 'dark' | 'light';
export type ColorSchemeState = ColorScheme | null;
export type ColorSchemeReducers = {
  setColorScheme: (
    state: ColorSchemeState,
    action: PayloadAction<ColorSchemeState>,
  ) => ColorSchemeState;
};
