import CloseIcon from '@mui/icons-material/Close';
import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  styled,
  type Theme,
} from '@mui/material';
import React from 'react';

interface P {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const CloseBtn = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  '&': {
    fontSize: '1em',
    backgroundColor: '#000',
    opacity: 0.6,
    color: 'white',
    width: '2.5em',
    height: '2.5em',
    padding: '0.25em',
    borderRadius: '50%',
    position: 'absolute',
    right: '0.5em',
    top: '0.5em',
    zIndex: 2,
    cursor: 'pointer',
    transition: 'opacity 200ms ease-in-out',
  },
  '& > svg': {
    fontSize: '1em',
    width: '2em',
    height: '2em',
  },
  '&:hover': {
    opacity: 0.8,
  },
  [theme.breakpoints.up('sm')]: {
    '&': {
      backgroundColor: 'transparent',
      width: '8em',
      height: '8em',
      padding: '1.5em',
      borderRadius: 0,
      right: 0,
      top: 0,
    },
    '& > svg': {
      width: '5em',
      height: '5em',
    },
  },
}));

export const MuiModalWrapper = ({ open, onClose, children }: P) => (
  <Modal
    open={open}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
      sx: (theme: Theme) => ({
        zIndex: -1,
        [theme.breakpoints.down('sm')]: {
          background: 'black',
        },
      }),
    }}
  >
    <Fade in={open}>
      <Box sx={{ height: '100%', outline: 'none' }}>
        <CloseBtn onClick={onClose}>
          <CloseIcon />
        </CloseBtn>
        {children}
      </Box>
    </Fade>
  </Modal>
);
