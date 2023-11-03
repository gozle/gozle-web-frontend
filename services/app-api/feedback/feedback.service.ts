import { appApi } from '../app-api.api';

import type { CreateFeedbackRequest } from './feedback.type';

export const feedbackApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation<void, CreateFeedbackRequest>({
      query: (body) => ({ url: 'feedback', method: 'POST', body }),
    }),
  }),
});

export const { useCreateFeedbackMutation } = feedbackApi;
