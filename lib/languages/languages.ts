import { Locale } from './languages.type';

const locales: unknown[] = ['en', 'ru', 'tk'];

export const isLocale = (language: unknown): language is Locale => {
  return locales.includes(language);
};
