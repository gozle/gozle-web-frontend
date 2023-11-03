import { IncomingHttpHeaders } from 'http';

import Cookies from 'universal-cookie';

import { type ColorScheme } from 'lib/store/features/color-scheme';

export const getColorSchemeFromCookie = (
  headers: IncomingHttpHeaders,
): ColorScheme | undefined => {
  const cookie = headers.cookie;
  if (cookie) {
    const cookies = new Cookies(cookie);
    const colorScheme = cookies.get('COLOR_SCHEME');
    if (colorScheme && typeof colorScheme === 'string')
      return ['dark', 'light'].includes(colorScheme)
        ? (colorScheme as ColorScheme)
        : undefined;
    else return undefined;
  } else return undefined;
};

export const getWideScreenFromCookie = (
  headers: IncomingHttpHeaders,
): boolean | undefined => {
  const cookie = headers.cookie;
  if (cookie) {
    const cookies = new Cookies(cookie);
    const wideScreen = cookies.get('VIDEO__WIDE_SCREEN');
    if (wideScreen && typeof wideScreen === 'string') return wideScreen === '1';
    else return undefined;
  } else return undefined;
};
