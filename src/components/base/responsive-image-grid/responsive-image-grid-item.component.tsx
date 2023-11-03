import React from 'react';

import { ImgBaseData } from 'lib/types';

interface P {
  data: ImgBaseData & { page: number };
  index: number;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onError?: (event: React.MouseEvent<HTMLImageElement>) => void;
  style: React.CSSProperties;
}

export const ResponsiveImageGridItem = ({
  data,
  index,
  onClick,
  onError,
  style,
}: P) => (
  <img
    alt={data.description}
    data-id={data.id}
    data-index={index}
    data-page={data.page}
    onClick={onClick}
    onError={onError}
    src={data.link}
    style={style}
  />
);
