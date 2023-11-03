import { PayloadAction } from '@reduxjs/toolkit';

export type VideoSettingsState = { wideScreen: boolean };
export type VideoSettingsReducers = {
  setWideScreen: (
    state: VideoSettingsState,
    action: PayloadAction<boolean>,
  ) => VideoSettingsState;
};
