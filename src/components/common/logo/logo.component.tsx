import Link from 'next/link';
import React, { useContext } from 'react';

import { LogoIcon } from '@/icons';
import { useAppSelector } from 'lib/hooks';
import { AppThemeContext } from 'pages/_app';

interface P {
  className?: string;
  height: number;
}

export const Logo = ({ className = '', height }: P) => {
  const theme = useAppSelector((state) => state.colorScheme);
  const appTheme = useContext(AppThemeContext);

  return (
    <Link
      className={className}
      href="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <Image src={LogoPNG} height={height} alt="Logo" /> */}
      <LogoIcon
        height={height}
        fill={theme === 'dark' ? 'white' : appTheme?.palette.main.default}
      />
    </Link>
  );
};
