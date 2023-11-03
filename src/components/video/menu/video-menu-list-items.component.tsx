import { Url } from 'url';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { NavLink } from '@/components/base';
import { VideoMenuItem } from 'lib/types';
import { videoMenuItems } from 'lib/video';

interface P {
  getLink: (category: string) => string | Url;
  menuExtraItems?: VideoMenuItem[];
}

export const VideoMenuListItems = ({ getLink, menuExtraItems }: P) => {
  const { t } = useTranslation('video');

  return (
    <List>
      {videoMenuItems.map((el) => (
        <ListItem key={el.name} disablePadding sx={{ display: 'block' }}>
          <NavLink href={el.href}>
            {(isActive) => (
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.main' : undefined,
                    minWidth: 0,
                    mr: 2,
                  }}
                >
                  {el.icon}
                </ListItemIcon>
                <ListItemText
                  primary={t(el.name)}
                  sx={{ color: isActive ? 'primary.main' : 'currentcolor' }}
                />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}

      {menuExtraItems?.map((el) => (
        <ListItem key={el.name} disablePadding sx={{ display: 'block' }}>
          <NavLink href={getLink(el.slug)}>
            {(isActive) => (
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.main' : undefined,
                    minWidth: 0,
                    mr: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.5rem',
                      width: '1em',
                      height: '1em',
                      WebkitMask: `url(${el.icon}) no-repeat center`,
                      mask: `url(${el.icon}) no-repeat center`,
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      backgroundColor: 'currentcolor',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={el.name}
                  sx={{ color: isActive ? 'primary.main' : 'currentcolor' }}
                />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};
