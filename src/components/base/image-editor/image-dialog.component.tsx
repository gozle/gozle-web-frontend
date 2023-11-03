import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  SlideProps,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { forwardRef } from 'react';

const classes = {
  appBar: 'app-bar',
  flex: 'flex',
  imgContainer: 'img-container',
  img: 'img',
  container: 'container',
};

const styles = {
  [`.${[classes.appBar]}`]: {
    position: 'relative',
  },
  [`.${[classes.flex]}`]: {
    flex: 1,
  },
  [`.${[classes.imgContainer]}`]: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`.${[classes.img]}`]: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  [`.${[classes.container]}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
};

const Transition = forwardRef((props: SlideProps, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

Transition.displayName = 'Transition';

interface P {
  img: string | null;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)(styles);

export const ImageDialog = ({ img, onClose }: P) => {
  const { t } = useTranslation('image');
  return (
    <StyledDialog
      fullScreen
      open={!!img}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <div className={classes.container}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {t('cropped_image')}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.imgContainer}>
          {img && <img src={img} alt="Cropped" className={classes.img} />}
        </div>
      </div>
    </StyledDialog>
  );
};
