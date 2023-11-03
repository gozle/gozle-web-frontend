import React from 'react';

import { Locale } from 'lib/languages';

export type Translations = Record<Locale, Record<string, string>>;

export type TTranslationContext = Record<string, string>;
// translation: {[K in Locale]: Record<string,string>};

export const TranslationContext = React.createContext<TTranslationContext>({});
