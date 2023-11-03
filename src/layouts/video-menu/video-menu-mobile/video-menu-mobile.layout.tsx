import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { NavLink } from '@/components/base';
import { DefaultError } from '@/components/common';
import { VideoMenuButtons } from '@/components/video/menu';
import type { NavMenuItem, VideoMenuItem } from 'lib/types';

import styles from './video-menu-mobile.module.scss';

interface P {
  active?: NavMenuItem | null;
  children: JSX.Element;
  getLink: (category: string) => string;
  menuExtraItems?: VideoMenuItem[];
  tags?: NavMenuItem[];
}

export const WithVideoMenuMobileLayout = ({ children, ...props }: P) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation('video');
  const theme = useTheme();

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.menu_buttons_container}
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <div className={styles.scroll_container}>
            {props.tags && (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(true)}
                >
                  <AutoAwesomeMotionIcon />
                </Button>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 2, borderColor: '#a9a9a9' }}
                />
              </>
            )}
            <VideoMenuButtons
              getLink={props.getLink}
              menuExtraItems={props.menuExtraItems}
            />
          </div>
        </div>
        {children}
      </div>
      {props.tags && (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxHeight: '70%',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              px: 2,
            }}
          >
            {props.tags.length ? (
              <List sx={{ overflowY: 'auto', width: '100%', mt: 2 }}>
                {props.tags.map((el) => (
                  <ListItem
                    key={el.slug}
                    disablePadding
                    sx={{ display: 'block' }}
                  >
                    <NavLink
                      href={props.getLink(el.slug)}
                      onClick={handleClose}
                    >
                      {(isActive) => (
                        <ListItemButton>
                          <ListItemText
                            primary={el.name}
                            sx={{
                              color: isActive ? 'primary.main' : 'currentcolor',
                            }}
                          />
                        </ListItemButton>
                      )}
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            ) : (
              <DefaultError style={{ height: 100 }} />
            )}
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              {t('close')}
            </Button>
          </Box>
        </Drawer>
      )}
    </>
  );
};
