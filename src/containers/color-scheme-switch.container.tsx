import React from 'react';

import { ColorSchemeSwitch } from '@/components/common';
import { useAppDispatch, useAppSelector } from 'lib/hooks';
import { setColorScheme } from 'lib/store/features/color-scheme';

interface P {
  className?: string;
}

export const ColorSchemeSwitchContainer = ({ className = '' }: P) => {
  const scheme = useAppSelector((state) => state.colorScheme);
  const dispatch = useAppDispatch();

  const handleChange = () =>
    dispatch(setColorScheme(scheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeSwitch
      className={className}
      selected={scheme}
      onChange={handleChange}
    />
  );
};
