import React, { Suspense } from 'react';

import { useAppSelector } from 'lib/hooks';
import type { NavMenuItem, VideoMenuItem } from 'lib/types';

import { WithVideoMenuDesktopLayout } from './video-menu-desktop';
import { WithVideoMenuMobileLayout } from './video-menu-mobile';

interface P {
  active?: NavMenuItem | null;
  children: JSX.Element;
  getLink: (category: string) => string;
  menuExtraItems?: VideoMenuItem[];
  tags?: NavMenuItem[];
}

export const WithVideoMenuLayout = (props: P) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  return (
    <Suspense>
      {mobile ? (
        <WithVideoMenuMobileLayout
          tags={props.tags}
          active={props.active}
          getLink={props.getLink}
          menuExtraItems={props.menuExtraItems}
        >
          {props.children}
        </WithVideoMenuMobileLayout>
      ) : (
        <WithVideoMenuDesktopLayout
          tags={props.tags}
          active={props.active}
          getLink={props.getLink}
          menuExtraItems={props.menuExtraItems}
        >
          {props.children}
        </WithVideoMenuDesktopLayout>
      )}
    </Suspense>
  );
};
