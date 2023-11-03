import { useMemo } from 'react';

import { Language } from 'services/admin-api';

export const useLanguageId = (
  language: string,
  languages: Language[] | undefined,
) =>
  useMemo(
    () => languages?.find((el) => el.code === language)?.id || 0,
    [language, languages],
  );
