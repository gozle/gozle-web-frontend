import React, { forwardRef } from 'react';

interface P {
  Component?: 'div' | 'cite' | 'span';
  children: string;
  className?: string;
  numOfLines?: number;
  style?: React.CSSProperties;
}

export const TrimmedTypography = forwardRef<HTMLDivElement, P>(
  ({ Component = 'span', className, numOfLines, style, children }, ref) => (
    <Component
      ref={ref}
      className={className}
      style={{
        ...style,
        WebkitLineClamp: numOfLines,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </Component>
  ),
);

TrimmedTypography.displayName = 'TrimmedTypography';
