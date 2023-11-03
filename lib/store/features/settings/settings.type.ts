import { PayloadAction } from '@reduxjs/toolkit';

export type Settings = { ip: string; mobile: boolean; userAgent: string };
export type SettingsState = Settings;
export type SettingsReducers = {
  setIp: (state: SettingsState, action: PayloadAction<string>) => SettingsState;
  setMobile: (
    state: SettingsState,
    action: PayloadAction<boolean>,
  ) => SettingsState;
  setUserAgent: (
    state: SettingsState,
    action: PayloadAction<string>,
  ) => SettingsState;
};
