import { Url } from 'url';

import { Button } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import type { NavMenuItem } from 'lib/types';

import { HorizontalScrollContainer } from '../horizontal-scroll-container';

import styles from './tags-menu.module.scss';

interface P {
  active?: NavMenuItem | null;
  className?: string;
  data: NavMenuItem[];
  getLink: (slug: string) => string | Url;
}

export const TagsMenu = ({ active, className = '', data, getLink }: P) => {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const current = activeRef.current;
    if (current) current.scrollIntoView({ inline: 'center', block: 'center' });
  }, []);

  return (
    <nav className={styles.tags_menu + ' ' + className}>
      <HorizontalScrollContainer>
        {data.map((el) => (
          <div key={el.slug} className={styles.item_container}>
            <Link href={getLink(el.slug)}>
              <Button
                ref={el.slug === active?.slug ? activeRef : null}
                className={styles.item}
                variant="contained"
                size="small"
                disabled={el.slug === active?.slug}
              >
                {el.name}
              </Button>
            </Link>
          </div>
        ))}
      </HorizontalScrollContainer>
    </nav>
  );
};
