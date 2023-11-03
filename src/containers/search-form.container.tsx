import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { SearchForm } from '@/components/common';
import { useQueryPage } from 'lib/hooks';

interface P {
  className?: string;
  extraButtons?: React.ReactNode;
  href?: string;
}

export const SearchFormContainer = ({ className, href, extraButtons }: P) => {
  const router = useRouter();
  const { query: routerQuery } = useQueryPage(router);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      const action = event.currentTarget.action;
      const query = new FormData(event.currentTarget).get('query') as string;
      if (action && query)
        router.push({
          pathname: action,
          query: { q: encodeURIComponent(query) },
        });
    },
    [router],
  );

  return (
    <SearchForm
      action={href || router.pathname}
      className={className}
      defaultQuery={routerQuery}
      extraButtons={extraButtons}
      onSubmit={handleSubmit}
    />
  );
};
