import {
  MenuItem,
  Select,
  styled,
  type SelectChangeEvent,
} from '@mui/material';
import React from 'react';

import { Language } from 'services/admin-api';

interface P {
  className?: string;
  languages: Language[];
  onChange: (event: SelectChangeEvent<unknown>) => void;
  selected: string;
}

const MySelect = styled(Select)`
  border-radius: 0.5em;

  & fieldset {
    border-color: currentColor;
  }
`;

export const LanguageSelect = ({
  className,
  languages,
  onChange,
  selected,
}: P) => (
  <div className={className}>
    <MySelect
      size="small"
      variant="outlined"
      value={selected}
      onChange={onChange}
    >
      {languages.map((l) => (
        <MenuItem key={l.id} value={l.id}>
          {l.shortName.toUpperCase()}
        </MenuItem>
      ))}
    </MySelect>
  </div>
);
