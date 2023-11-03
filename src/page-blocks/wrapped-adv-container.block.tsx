import React from 'react';

import { NoSsr } from '@/components/base';
import { PageBlockWrapper } from '@/components/common';
import { AdvContainer } from '@/containers';

interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  className?: string;
  type: 'horizontal' | 'horizontal-small' | 'card-simple';
  withPaddings?: boolean;
}

export const WrappedAdvContainerBlock = (props: P) => (
  <NoSsr>
    <PageBlockWrapper withPaddings={props.withPaddings}>
      <AdvContainer
        className={props.className}
        type={props.type}
        ImageProps={props.ImageProps}
      />
    </PageBlockWrapper>
  </NoSsr>
);
