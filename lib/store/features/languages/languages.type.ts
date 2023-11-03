import type { PayloadAction } from '@reduxjs/toolkit';

import type { Language } from 'services/admin-api';

export type LanguagesState = Language[];
export type LanguagesReducers = {
  setLanguages: (
    state: LanguagesState,
    action: PayloadAction<LanguagesState>,
  ) => LanguagesState;
};
