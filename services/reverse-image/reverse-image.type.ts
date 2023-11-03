import { ImgFullData } from 'lib/types';

export type ReverseImageSearchRequest = Record<
  string,
  string | number | File | undefined
> & {
  image?: File;
  safe?: string;
  url?: string;
  page: number | string;
  size: number | string;
};

export type ReverseImageResponseItem = {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    adult: boolean;
    alt: string;
    height: number;
    page_title: string;
    src: string;
    width: number;
  };
};

export type ReverseImageSearchResponse = {
  hits: {
    hits: ReverseImageResponseItem[];
  };
};
export type ReverseImageSearchTransformedResponse = {
  data: (ImgFullData & { page: number })[];
  url?: string;
};
