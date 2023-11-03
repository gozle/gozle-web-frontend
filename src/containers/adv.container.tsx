import { useTranslation } from 'next-i18next';
import React from 'react';

import {
  AdvCardSimple,
  AdvHorizontal,
  AdvHorizontalSmall,
} from '@/components/advs';
import { useGetAdvQuery } from 'services/news-api';

interface P {
  ImageProps?: {
    sizes?: string;
    width?: number;
  };
  className?: string;
  type: 'horizontal' | 'horizontal-small' | 'card-simple';
}

export const AdvContainer = ({ className, ImageProps, type }: P) => {
  const { i18n } = useTranslation();
  const { data } = useGetAdvQuery({ language: i18n.language });

  if (data)
    switch (type) {
      case 'horizontal':
        return <AdvHorizontal className={className} data={data} />;
      case 'horizontal-small':
        return <AdvHorizontalSmall className={className} data={data} />;
      case 'card-simple':
        return (
          <AdvCardSimple
            className={className}
            data={data}
            ImageProps={ImageProps}
          />
        );
      default:
        return <></>;
    }
  else return <></>;
};
