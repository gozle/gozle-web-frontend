import React from 'react';

import { SearchIcon } from '@/icons';

import styles from './search-form.module.scss';

interface P {
  action?: string;
  className?: string;
  defaultQuery?: string;
  extraButtons?: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm = React.memo(
  ({ action, className = '', defaultQuery, extraButtons, onSubmit }: P) => (
    <form
      className={styles.form + ' ' + className}
      action={action}
      onSubmit={onSubmit}
    >
      <div className={styles.input}>
        <input name="query" defaultValue={defaultQuery} />
        <span className={styles.extra_buttons}>{extraButtons}</span>
      </div>
      <div>
        <button className={styles.button} type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  ),
);
SearchForm.displayName = 'SearchForm';
