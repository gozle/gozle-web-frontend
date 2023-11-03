import Image from 'next/image';
import React from 'react';

import { containerStyle, innerContainerStyle } from './img-icon-in-round.style';

interface P {
  alt: string;
  className?: string;
  next?: boolean;
  paddings?: boolean;
  src: string;
}

export const ImgIconInRound = ({
  alt,
  className,
  next,
  paddings = true,
  src,
}: P) => {
  const filteredSrc =
    !src || src.indexOf('None') === 0 || src.indexOf('Unknown') === 0
      ? ''
      : src;

  return (
    <span
      className={className}
      style={{ ...containerStyle, padding: paddings ? '0.4em' : '0' }}
    >
      <span style={innerContainerStyle}>
        {next && filteredSrc ? (
          <Image
            src={filteredSrc}
            alt={alt}
            loading="eager"
            fill
            style={{ objectFit: 'contain' }}
            sizes="2em"
          />
        ) : (
          <img
            src={filteredSrc}
            alt={alt}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </span>
    </span>
  );
};
