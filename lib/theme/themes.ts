import { createTheme, Theme } from '@mui/material';

import { ColorScheme } from '../store/features/color-scheme';

import { commonColors, themeColors } from './theme.colors';
import { AppTheme } from './theme.type';

const _muiTheme: Partial<{ [K in ColorScheme]: Theme }> = {};
const _appTheme: Partial<{ [K in ColorScheme]: AppTheme }> = {};

const makeMuiTheme = ({ mode }: { mode: 'dark' | 'light' }): Theme =>
  createTheme({
    palette: {
      mode,
      background: { default: themeColors[mode].body },
      primary: {
        main: commonColors.main,
        dark: commonColors.mainDark,
        contrastText: '#fff',
      },
      text: { primary: themeColors[mode].font },
    },
  });

const makeAppTheme = (colorScheme: ColorScheme): AppTheme => ({
  palette: {
    background: {
      pageBlock: themeColors[colorScheme].pageBlock,
      contrast: themeColors[colorScheme].contrastBackground,
    },
    main: {
      default: commonColors.main,
      dark: commonColors.mainDark,
    },
    search: {
      title: themeColors[colorScheme].searchResultTitle,
      title_hover: themeColors[colorScheme].searchResultTitleHover,
      src: themeColors[colorScheme].searchResultSrc,
      src_hover: themeColors[colorScheme].searchResultSrcHover,
    },
  },
});

export const muiTheme: Partial<{ [K in ColorScheme]: Theme }> = new Proxy(
  _muiTheme,
  {
    get(target, prop) {
      if (typeof prop === 'string' && ['dark', 'light'].includes(prop)) {
        if (!(prop in target))
          target[prop as ColorScheme] = makeMuiTheme({
            mode: prop as ColorScheme,
          });
        return target[prop as ColorScheme];
      }
    },
    set() {
      throw Error('Forbidden.');
    },
  },
);

export const appTheme: Partial<{ [K in ColorScheme]: AppTheme }> = new Proxy(
  _appTheme,
  {
    get(target, prop) {
      if (typeof prop === 'string' && ['dark', 'light'].includes(prop)) {
        if (!(prop in target))
          target[prop as ColorScheme] = makeAppTheme(prop as ColorScheme);
        return target[prop as ColorScheme];
      }
    },
    set() {
      throw Error('Forbidden.');
    },
  },
);
