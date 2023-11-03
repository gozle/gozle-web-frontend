import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { SettingsReducers, SettingsState } from './settings.type';

let initialState: SettingsState = { ip: '', mobile: false, userAgent: '' };

export const settingsSlice = createSlice<SettingsState, SettingsReducers>({
  name: 'settings',
  initialState,
  reducers: {
    setIp: (state, action) => ({ ...state, ip: action.payload }),
    setMobile: (state, action) => ({ ...state, mobile: action.payload }),
    setUserAgent: (state, action) => ({ ...state, userAgent: action.payload }),
  },
  extraReducers: (builder) =>
    builder.addCase(
      HYDRATE,
      (state, action: AnyAction) => action.payload.settings ?? state,
    ),
});

export const { setIp, setMobile, setUserAgent } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
