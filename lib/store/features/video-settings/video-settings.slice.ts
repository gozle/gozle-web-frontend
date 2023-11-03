import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import {
  VideoSettingsReducers,
  VideoSettingsState,
} from './video-settings.type';

let initialState = { wideScreen: false };

export const videoSettingsSlice = createSlice<
  VideoSettingsState,
  VideoSettingsReducers
>({
  name: 'videoSettings',
  initialState,
  reducers: {
    setWideScreen: (state, action) => ({
      ...state,
      wideScreen: action.payload,
    }),
  },
  extraReducers: (builder) =>
    builder.addCase(
      HYDRATE,
      (state, action: AnyAction) => action.payload.videoSettings ?? state,
    ),
});

export const { setWideScreen } = videoSettingsSlice.actions;

export const videoSettingsReducer = videoSettingsSlice.reducer;
