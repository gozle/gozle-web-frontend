import { Theme } from '@mui/material';

export const classes = {
  cropContainer: 'crop-container',
  cropButton: 'crop-button',
  controls: 'controls',
  controlsContainer: 'controls-container',
  sliderContainer: 'slider-container',
  slider: 'slider',
  rotateContainer: 'rotate-container',
  rotateBtns: 'rotate-btns',
};

export const styles = ({ theme }: { theme: Theme }) => ({
  '&': {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  [`.${[classes.cropContainer]}`]: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: theme.palette.background.default,
  },
  [`.${[classes.cropButton]}`]: { flexShrink: 0 },
  [`.${[classes.controls]}`]: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: `0 ${theme.spacing(2)}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  },
  [`.${[classes.controlsContainer]}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
    maxWidth: '800px',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
    },
  },
  [`.${[classes.sliderContainer]}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  [`.${[classes.slider]}`]: {
    padding: `${theme.spacing(2.5)} 0px`,
    marginLeft: theme.spacing(3),
  },
  [`.${classes.rotateContainer}`]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: `${theme.spacing(1)}`,
  },
  [`.${classes.rotateBtns}`]: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      margin: `0 ${theme.spacing(1)}`,
      '& > svg': {
        fontSize: '2em',
        padding: theme.spacing(0.5),
      },
    },
  },
});
