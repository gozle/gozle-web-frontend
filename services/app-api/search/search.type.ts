import type { ColorScheme } from 'lib/store/features/color-scheme';
import type { WebSearchData } from 'lib/types';

export type WebSearchRequest = {
  headers?: Record<string, string>;
  language?: string;
  page: number;
  query: string;
  theme?: ColorScheme;
};

export type WebSearchResponse = {
  html: string;
  page: number;
  suggestion?: string;
  time: number;
  last_page: number;
};
