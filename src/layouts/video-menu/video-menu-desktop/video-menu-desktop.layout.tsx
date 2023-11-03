import { Url } from 'url';

import { Divider } from '@mui/material';
import React from 'react';

import { TagsMenu } from '@/components/common';
import { VideoMenuListItems } from '@/components/video/menu/video-menu-list-items.component';
import type { NavMenuItem, VideoMenuItem } from 'lib/types';

import styles from './video-menu-desktop.module.scss';

interface P {
  active?: NavMenuItem | null;
  children: JSX.Element;
  getLink: (category: string) => string | Url;
  menuExtraItems?: VideoMenuItem[];
  tags?: NavMenuItem[];
}

export const WithVideoMenuDesktopLayout = ({ children, ...props }: P) => (
  <div className={styles.container}>
    <div className={styles.menu}>
      <VideoMenuListItems
        getLink={props.getLink}
        menuExtraItems={props.menuExtraItems}
      />
    </div>
    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
    <div className={styles.tags_child_container}>
      {props.tags && props.tags.length > 0 && (
        <div className={styles.tags_container}>
          <TagsMenu
            active={props.active}
            data={props.tags}
            getLink={props.getLink}
          />
        </div>
      )}
      {children}
    </div>
  </div>
);
