import React from 'react';

interface P {
  className?: string;
  style?: React.CSSProperties;
}

export const KeyboardArrowRightIcon = ({ className, style }: P) => (
  <svg
    className={className}
    focusable={false}
    aria-hidden={true}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    style={style}
  >
    <path
      d="m10.586 8.004-4.79 4.793A1 1 0 1 0 7.21 14.21l5.496-5.5a1 1 0 0 0 0-1.414l-5.496-5.5a1 1 0 1 0-1.415 1.415l4.79 4.793Z"
      fill="currentColor"
    />
  </svg>
);
