import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { Button, IconButton, Slider, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';

import { getCroppedImg } from './canvas-utils';
import { ImageDialog } from './image-dialog.component';
import { classes, styles } from './styles';

interface P {
  src: string;
}

const Root = styled('div')(styles);

export const ImageEditor = ({ src }: P) => {
  const { t } = useTranslation('image');

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const showCroppedImage = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          src,
          croppedAreaPixels,
          rotation,
        );
        // console.log('donee', { croppedImage });
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => setCroppedImage(null);

  return (
    <Root>
      <div className={classes.cropContainer}>
        <Cropper
          image={src}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.controlsContainer}>
          <div className={classes.sliderContainer}>
            <Typography variant="overline">{t('zoom')}</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(Number(zoom))}
            />
          </div>
          <div className={classes.rotateContainer}>
            <Typography variant="overline">{t('rotate')}</Typography>
            <div className={classes.rotateBtns}>
              <IconButton onClick={() => setRotation((prev) => prev - 90)}>
                <RotateLeftIcon />
              </IconButton>
              <IconButton onClick={() => setRotation((prev) => prev + 90)}>
                <RotateRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          {t('show_result')}
        </Button>
      </div>
      <ImageDialog img={croppedImage} onClose={onClose} />
    </Root>
  );
};
