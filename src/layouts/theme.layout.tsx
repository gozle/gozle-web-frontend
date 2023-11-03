import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { setColorScheme } from 'lib/store/features/color-scheme';
import { appTheme, muiTheme } from 'lib/theme';
import { AppThemeContext } from 'pages/_app';

interface P {
  children: React.ReactNode;
}

export const WithThemeLayout = ({ children }: P) => {
  const colorScheme = useAppSelector((state) => state.colorScheme);
  const dispatch = useAppDispatch();

  const [cookie, setCookie] = useCookies(['COLOR_SCHEME']);

  // !!! Set colorScheme from cookie for static pages !!!
  useEffect(() => {
    if (!colorScheme) {
      const cookieColorScheme = cookie.COLOR_SCHEME;
      if (cookieColorScheme) dispatch(setColorScheme(cookieColorScheme));
    }
  }, [colorScheme, cookie.COLOR_SCHEME, dispatch]);

  // Change COLOR_SCHEME when colorScheme was changed
  useEffect(() => {
    if (colorScheme)
      setCookie('COLOR_SCHEME', colorScheme, { path: '/', maxAge: 31536000 });
  }, [colorScheme, setCookie]);

  //Set color scheme
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.matches) dispatch(setColorScheme('dark'));
    const listener = (e: MediaQueryListEvent) =>
      dispatch(setColorScheme(e.matches ? 'dark' : 'light'));
    mq.addEventListener('change', listener);
    return () => {
      mq.removeEventListener('change', listener);
    };
  }, [dispatch]);

  return (
    <AppThemeContext.Provider value={appTheme[colorScheme ?? 'light']!}>
      <ThemeProvider theme={muiTheme[colorScheme ?? 'light']!}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};
