import React from 'react';

type P = {
  fill?: string;
};

export const OkIcon = ({ fill }: P) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    version="1.1"
    fill={fill}
  >
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
);
