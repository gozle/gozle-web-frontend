import { ImgFullData, PaginatedResponse } from 'lib/types';

export type ImageSearchRequest = {
  query: string;
  page: number;
};

export type ImageSearchResponse = PaginatedResponse<ImgFullData> & {
  suggestion?: string;
  time: number;
  query: string;
};
