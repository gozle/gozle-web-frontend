import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { adminApi } from 'services/admin-api';
import { appApi } from 'services/app-api';
import { cityApi } from 'services/city';
import { imageApi } from 'services/image';
import { infoApi } from 'services/info';
import { newsApi } from 'services/news-api';
import { reverseImageApi } from 'services/reverse-image';
import { videoApi } from 'services/video-api';

import { colorSchemeReducer } from './features/color-scheme';
import { coordsReducer } from './features/coords';
import { languagesReducer } from './features/languages';
import { settingsReducer } from './features/settings';
import { videoSettingsReducer } from './features/video-settings';

const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [adminApi.reducerPath]: adminApi.reducer,
      [appApi.reducerPath]: appApi.reducer,
      [cityApi.reducerPath]: cityApi.reducer,
      [imageApi.reducerPath]: imageApi.reducer,
      [infoApi.reducerPath]: infoApi.reducer,
      [newsApi.reducerPath]: newsApi.reducer,
      [reverseImageApi.reducerPath]: reverseImageApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
      colorScheme: colorSchemeReducer,
      coords: coordsReducer,
      languages: languagesReducer,
      settings: settingsReducer,
      videoSettings: videoSettingsReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        adminApi.middleware,
        appApi.middleware,
        cityApi.middleware,
        imageApi.middleware,
        newsApi.middleware,
        reverseImageApi.middleware,
        infoApi.middleware,
        videoApi.middleware,
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
