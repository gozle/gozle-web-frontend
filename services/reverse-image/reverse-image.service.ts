import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { IMAGE_BASE_URL } from 'lib/constants';

import {
  ReverseImageSearchRequest,
  ReverseImageSearchResponse,
  ReverseImageSearchTransformedResponse,
} from './reverse-image.type';

export const reverseImageApi = createApi({
  reducerPath: 'reverseImageApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: IMAGE_BASE_URL })),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    reverseImageSearch: builder.mutation<
      ReverseImageSearchTransformedResponse,
      ReverseImageSearchRequest
    >({
      query: (body) => {
        const fd = new FormData();
        for (let key in body) {
          let val = body[key];
          if (val) fd.append(key, typeof val === 'number' ? String(val) : val);
        }
        return { url: 'image_ai', method: 'POST', body: fd };
      },
      transformResponse: (
        res: ReverseImageSearchResponse,
        _,
        req,
      ): ReverseImageSearchTransformedResponse => ({
        data: res
          ? res.hits.hits.map((el) => ({
              id: el._id,
              width: el._source.width,
              height: el._source.height,
              link: el._source.src,
              description: el._source.page_title,
              alt: el._source.alt,
              adult: el._source.adult,
              src: {
                icon: '',
                name: el._source.page_title,
                link: el._source.src,
              },
              page: 1,
            }))
          : [],
        url: req.url,
      }),
    }),
  }),
});

export const { useReverseImageSearchMutation } = reverseImageApi;
