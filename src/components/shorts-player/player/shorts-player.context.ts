import { createContext, Dispatch, SetStateAction } from 'react';

export interface IShortsPlayerContext {
  buffering: boolean;
  containerHeight: number;
  containerWidth: number;
  muted: boolean;
  playing: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  volume: number;
}

const defaultContextValue: IShortsPlayerContext = {
  buffering: false,
  containerHeight: 0,
  containerWidth: 0,
  muted: false,
  playing: false,
  setMuted: () => {},
  setPlaying: () => {},
  volume: 1,
};

export const ShortsPlayerContext = createContext(defaultContextValue);
