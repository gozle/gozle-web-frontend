import React, { useEffect, useRef, useState } from 'react';

import { PageBlockWrapper } from '@/components/common';
import { useAppSelector, useResizeObserver } from 'lib/hooks';
import { NewsBaseData } from 'lib/types';

import { NewsCard, NewsHorizontalCard } from '../../block';

import styles from './news-card-wrapped-list.module.scss';

interface P {
  bigCardImageSize?: string;
  cardImageSize?: string;
  className?: string;
  news: NewsBaseData[];
}

export const NewsCardWrappedList = ({
  bigCardImageSize,
  cardImageSize,
  className = '',
  news,
}: P) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const [variant, setVariant] = useState<'v1' | 'v2' | 'v3' | 'v4'>(
    mobile ? 'v4' : 'v1',
  );

  const ref = useRef<HTMLDivElement>(null);

  const { width } = useResizeObserver(ref);

  useEffect(() => {
    if (width)
      setVariant(
        width >= 1040 ? 'v1' : width >= 769 ? 'v2' : width >= 480 ? 'v3' : 'v4',
      );
  }, [width]);

  return (
    <div ref={ref} className={styles.list + ' ' + className}>
      {news.map((el, i) => {
        if (variant === 'v1')
          return i === 0 ? (
            <PageBlockWrapper
              key={el.id}
              style={{ gridColumn: 'span 3', gridRow: 'span 3' }}
            >
              <NewsCard data={el} ImageProps={{ sizes: bigCardImageSize }} />
            </PageBlockWrapper>
          ) : i < 4 ? (
            <PageBlockWrapper key={el.id} style={{ gridColumn: 'span 3' }}>
              <NewsHorizontalCard data={el} />
            </PageBlockWrapper>
          ) : (
            <PageBlockWrapper key={el.id} style={{ gridColumn: 'span 2' }}>
              <NewsCard data={el} ImageProps={{ sizes: cardImageSize }} />
            </PageBlockWrapper>
          );
        else if (variant === 'v2')
          return (
            <PageBlockWrapper key={el.id} style={{ gridColumn: 'span 2' }}>
              <NewsCard data={el} ImageProps={{ sizes: cardImageSize }} />
            </PageBlockWrapper>
          );
        else if (variant === 'v3')
          return (
            <PageBlockWrapper
              key={el.id}
              style={{ gridColumn: 'span 3' }}
              className={styles.paddings}
            >
              <NewsCard data={el} ImageProps={{ sizes: cardImageSize }} />
            </PageBlockWrapper>
          );
        else
          return (
            <PageBlockWrapper
              key={el.id}
              style={{ gridColumn: 'span 6' }}
              className={styles.paddings}
            >
              <NewsCard data={el} ImageProps={{ sizes: cardImageSize }} />
            </PageBlockWrapper>
          );
      })}
    </div>
  );
};
