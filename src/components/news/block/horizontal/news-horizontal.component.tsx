import { sanitize } from 'isomorphic-dompurify';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

import { NoSsr, TrimmedTypography } from '@/components/base';
import {
  AmountOfViews,
  CardMedia,
  HorizontalCard,
  HorizontalCardContent,
  HorizontalCardHeader,
} from '@/components/common';
import { getNewsLink } from 'lib/helpers';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';
import type { NewsBaseData } from 'lib/types';
import FireSVG from 'public/icons/fire.svg';

import { NewsSrc } from '../../news-src';

import styles from './news-horizontal.module.scss';

interface P {
  className?: string;
  data: NewsBaseData;
  isPopular?: boolean;
}

export const NewsHorizontal = ({ className, data, isPopular }: P) => {
  const { t, i18n } = useTranslation();
  const titleRef = useRef<HTMLDivElement>(null);
  const [descLineClamp, setDescLineClamp] = useState<number>(isPopular ? 4 : 5);

  useEffect(() => {
    const current = titleRef.current;
    if (current) {
      const rect = current.getBoundingClientRect();
      const fontSize = +current.style.fontSize.replace('px', '');
      const lineHeight = +current.style.lineHeight;
      const lineNum = Math.round(rect.height / (fontSize * lineHeight));
      if (lineNum === 2) setDescLineClamp(isPopular ? 3 : 4);
      else setDescLineClamp(isPopular ? 4 : 5);
    }
  }, [isPopular]);

  return (
    <HorizontalCard
      className={className}
      media={
        <CardMedia
          src={data.img}
          alt={data.title}
          ImageProps={{ width: 274 }}
        />
      }
    >
      <HorizontalCardContent>
        {isPopular && (
          <div className={styles.tags_src}>
            <div className={styles.tags}>
              <div className={styles.tag}>
                <span className={styles.tag_icon}>
                  <FireSVG />
                </span>
                <span>{t('popular')}</span>
              </div>
            </div>
            <NewsSrc
              className={styles.src}
              icon={data.src.icon}
              name={data.src.name}
              reverse={true}
            />
          </div>
        )}
        <HorizontalCardHeader
          className={styles.header}
          title={
            <>
              <Link href={getNewsLink(data.id)}>
                <TrimmedTypography
                  ref={titleRef}
                  numOfLines={2}
                  style={{ fontSize: 16, lineHeight: 1.2 }}
                  className={styles.title}
                >
                  {data.title}
                </TrimmedTypography>
              </Link>
              {!isPopular && (
                <NewsSrc
                  className={styles.src}
                  icon={data.src.icon}
                  name={data.src.name}
                  reverse={true}
                />
              )}
            </>
          }
        />
        <div className={styles.content}>
          <TrimmedTypography
            className={styles.description}
            numOfLines={descLineClamp}
          >
            {sanitize(data.description, { ALLOWED_TAGS: [] })}
          </TrimmedTypography>
          <footer className={styles.footer}>
            <AmountOfViews className={styles.views} views={data.views} />
            <NoSsr>
              <time>
                {tunedDayjs
                  .unix(data.timestamp)
                  .locale(i18n.language)
                  .fromNow()}
              </time>
            </NoSsr>
          </footer>
        </div>
      </HorizontalCardContent>
    </HorizontalCard>
  );
};

//   sizes:
//     '(max-width: 519px) 50vw, (max-width: 768px) 33vw, (max-width: 1039px) 20vw, (max-width: 1239px) 15vw, 10vw',
