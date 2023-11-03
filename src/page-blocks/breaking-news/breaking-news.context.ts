import React from 'react';

import { type NewsCategory } from 'lib/types';

type TBreakingNewsContext = {
  categories: NewsCategory[];
  categoryId?: number;
};

export const BreakingNewsContext = React.createContext<TBreakingNewsContext>({
  categories: [],
});
