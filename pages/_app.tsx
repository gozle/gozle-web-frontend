import { CacheProvider, EmotionCache } from '@emotion/react';
import type { NextPage } from 'next';
import App, { AppContext, type AppProps } from 'next/app';
import { Raleway } from 'next/font/google';
import Router from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import NProgress from 'nprogress';
import React, { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';

import { WithThemeLayout } from '@/layouts';
import { WithEmbededPlayerLayout } from '@/layouts/embeded-player';
import {
  defineMobileDevice,
  getColorSchemeFromCookie,
  getWideScreenFromCookie,
} from 'lib/helpers';
import createEmotionCache from 'lib/modules/create-emotion-cache';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import { wrapper } from 'lib/store';
import { setColorScheme } from 'lib/store/features/color-scheme';
import { setLanguages } from 'lib/store/features/languages';
import { setIp, setMobile, setUserAgent } from 'lib/store/features/settings';
import { appTheme } from 'lib/theme';
import { getLanguageList } from 'services/admin-api';

const i18nextConfig = require('../next-i18next.config.js');

// import 'public/fonts/Raleway/raleway.css';
import '../styles/page.scss';
import '../styles/globals.scss';
import '../styles/nprogress.scss';
import { setWideScreen } from 'lib/store/features/video-settings';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type MyAppProps = AppPropsWithLayout & {
  emotionCache?: EmotionCache;
};

const raleway = Raleway({
  subsets: ['cyrillic', 'latin'],
});

export const AppThemeContext = React.createContext(appTheme.light);
const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FC<MyAppProps> & {
  getInitialProps: (ctx: AppContext) => unknown;
} = ({ Component, emotionCache = clientSideEmotionCache, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout ?? ((page: any) => page);
  const { i18n } = useTranslation();

  // Change datetime locale on the server side
  if (typeof window === 'undefined') tunedDayjs.locale(i18n.language);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const changeStart = () => NProgress.start();
    const changeComplete = () => NProgress.done();

    Router.events.on('routeChangeStart', changeStart);
    Router.events.on('routeChangeComplete', changeComplete);
    Router.events.on('routeChangeError', changeComplete);

    return () => {
      Router.events.off('routeChangeStart', changeStart);
      Router.events.off('routeChangeComplete', changeComplete);
      Router.events.off('routeChangeError', changeComplete);
    };
  }, []);

  return (
    <>
      {/* eslint-disable-next-line */}
      <style jsx global>{`
        html,
        body {
          font-family: ${raleway.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <WithThemeLayout>
            <WithEmbededPlayerLayout>
              {getLayout(<Component {...props.pageProps} />)}
            </WithEmbededPlayerLayout>
          </WithThemeLayout>
        </CacheProvider>
      </Provider>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (ctx: AppContext) => {
    const res = await App.getInitialProps(ctx);

    const languages = await getLanguageList();
    store.dispatch(setLanguages(languages));

    if (ctx.ctx.req) {
      const colorScheme = getColorSchemeFromCookie(ctx.ctx.req.headers);
      if (colorScheme) store.dispatch(setColorScheme(colorScheme));

      const wideScreen = getWideScreenFromCookie(ctx.ctx.req.headers);
      if (wideScreen != null) store.dispatch(setWideScreen(wideScreen));
    }

    const userAgent =
      ctx.ctx.req?.headers['user-agent'] ||
      (typeof navigator !== 'undefined' ? navigator.userAgent : '');

    let ip = ctx.ctx.req?.headers['x-real-ip'];
    if (!ip || Array.isArray(ip)) {
      const forwardedFor = ctx.ctx.req?.headers['x-forwarded-for'];
      if (forwardedFor)
        ip = Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor.split(',')[0];
      else ip = '';
    }

    if (ip) store.dispatch(setIp(ip));
    store.dispatch(setMobile(defineMobileDevice(userAgent)));
    store.dispatch(setUserAgent(userAgent));

    return res;
  },
);

export default appWithTranslation(MyApp, i18nextConfig);
