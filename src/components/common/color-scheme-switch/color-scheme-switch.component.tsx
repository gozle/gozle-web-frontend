import React from 'react';

import { ColorSwitch } from './color-switch.component';

interface P {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: 'dark' | 'light' | null;
}

export const ColorSchemeSwitch = ({ className, onChange, selected }: P) => (
  <div className={className}>
    <ColorSwitch checked={selected === 'dark'} onChange={onChange} />
  </div>
);
