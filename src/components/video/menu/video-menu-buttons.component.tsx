import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { NavLink } from '@/components/base';
import { VideoMenuItem } from 'lib/types';
import { videoMenuItems } from 'lib/video';

interface P {
  getLink: (category: string) => string;
  menuExtraItems?: VideoMenuItem[];
}

export const VideoMenuButtons = ({ getLink, menuExtraItems }: P) => {
  const { t } = useTranslation('video');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {videoMenuItems.map((el, i) => (
        <NavLink key={el.name} href={el.href}>
          {(isActive) => (
            <Button
              variant="contained"
              startIcon={el.icon}
              sx={{ flexShrink: 0, ml: i ? 1 : 0 }}
              disabled={isActive}
            >
              {t(el.name)}
            </Button>
          )}
        </NavLink>
      ))}
      {menuExtraItems?.map((el) => (
        <Button
          key={el.slug}
          startIcon={
            <span
              style={{
                width: '1em',
                height: '1em',
                WebkitMask: `url(${el.icon}) no-repeat center`,
                mask: `url(${el.icon}) no-repeat center`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                backgroundColor: 'currentcolor',
              }}
            />
          }
          variant="contained"
          sx={{ ml: 1, flexShrink: 0 }}
          component={Link}
          href={getLink(el.slug)}
        >
          {t(el.name)}
        </Button>
      ))}
    </Box>
  );
};
