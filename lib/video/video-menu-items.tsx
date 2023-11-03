import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LayersIcon from '@mui/icons-material/Layers';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React from 'react';

export const videoMenuItems = [
  {
    name: 'popular',
    href: '/videos/popular',
    icon: <WhatshotIcon />,
  },
  {
    name: 'latest',
    href: '/videos/latest',
    icon: <AccessTimeIcon />,
  },
  {
    name: 'channels',
    href: '/videos/channels',
    icon: <LayersIcon />,
  },
];
