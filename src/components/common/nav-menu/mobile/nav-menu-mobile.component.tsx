import React, { useEffect, useRef } from 'react';

import type { NavMenuItem } from 'lib/types';

import { HorizontalScrollContainer } from '../../horizontal-scroll-container';

import { NavMenuMobileItem } from './nav-menu-mobile-item.component';

interface P {
  active?: NavMenuItem | null;
  data: NavMenuItem[];
  getLink: (slug: string) => string;
}

export const NavMenuMobile = ({ active, data, getLink }: P) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (current) current.scrollIntoView({ inline: 'center', block: 'center' });
  }, []);

  return (
    <HorizontalScrollContainer Component="nav">
      {data.map((el) => (
        <NavMenuMobileItem
          key={el.slug}
          ref={el.slug === active?.slug ? ref : null}
          data={el}
          href={getLink(el.slug)}
          isActive={el.slug === active?.slug}
        />
      ))}
    </HorizontalScrollContainer>
  );
};

export default NavMenuMobile;
