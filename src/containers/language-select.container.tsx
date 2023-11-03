import type { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { LanguageSelect } from '@/components/common';
import { useAppSelector, useLanguageId } from 'lib/hooks';

interface P {
  className?: string;
}

export const LanguageSelectContainer = ({ className }: P) => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const languages = useAppSelector((state) => state.languages);

  const language = i18n.language;
  const languageId = useLanguageId(language, languages);

  const [_, setCookie] = useCookies(['NEXT_LOCALE']);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const id = +(event.target.value as string);
    const locale = languages.find((el) => el.id === id);
    if (locale) {
      const query: { [key: string]: string } = JSON.parse(
        JSON.stringify(router.query),
      );
      if ('page' in query) delete query.page;
      router.push({ pathname: router.pathname, query }, undefined, {
        locale: locale.code,
      });
    }
  };

  // Change NEXT_COOKIE when language was changed
  useEffect(() => {
    if (languageId)
      setCookie('NEXT_LOCALE', language, { path: '/', maxAge: 31536000 });
  }, [languageId, setCookie, language]);

  return languages.length ? (
    <LanguageSelect
      className={className}
      languages={languages}
      selected={languageId ? String(languageId) : ''}
      onChange={handleChange}
    />
  ) : (
    <></>
  );
};
