import { type AnyAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { Language } from 'services/admin-api';

import type { LanguagesReducers, LanguagesState } from './languages.type';

const initialState: Language[] = [];

export const languagesSlice = createSlice<LanguagesState, LanguagesReducers>({
  name: 'languages',
  initialState,
  reducers: {
    setLanguages: (_, action) => action.payload,
  },
  extraReducers: (builder) =>
    builder.addCase(HYDRATE, (state, action: AnyAction) =>
      state.length ? state : action.payload.languages,
    ),
});

export const { setLanguages } = languagesSlice.actions;

export const languagesReducer = languagesSlice.reducer;
