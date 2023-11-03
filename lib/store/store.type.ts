import { AppStore } from './store';

export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
