import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ImageIcon from '@mui/icons-material/Image';
import { Backdrop, Drawer, IconButton, Modal } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';

import { DragAndDropFile, TextPopUp } from '@/components/base';
import { useAppSelector } from 'lib/hooks';
import SearchSVG from 'public/icons/search.svg';

import styles from './image-picker.module.scss';

interface P {
  image?: File;
  onPick: (image: File) => void;
  onUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlSearch: (url: string) => void;
  url: string;
}

export const ImagePicker = ({
  image,
  onPick,
  onUrlChange,
  onUrlSearch,
  url,
}: P) => {
  const mobile = useAppSelector((state) => state.settings.mobile);

  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const { t } = useTranslation('image');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUrlSearch(url);
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <CenterFocusWeakIcon />
      </IconButton>
      {mobile ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxHeight: '70%',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              p: 2,
            },
          }}
        >
          <div className={styles.title}>{t('visual_search')}</div>
          <div className={styles.dad_container}>
            <DragAndDropFile
              helpContent={
                <div className={styles.dad_help}>
                  <ImageIcon sx={{ fontSize: '3.5em', mb: '0.25em' }} />
                  <div className={styles.dad_help_text}>
                    {t('image_picker_dad_help_text')}
                  </div>
                </div>
              }
              accept={{ 'image/*': [] }}
              maxFiles={1}
              files={image ? [image] : []}
              onDrop={(files) => {
                if (files.length) {
                  onPick(files[0]);
                  setOpen(false);
                }
              }}
            />
          </div>
          <form className={styles.url_form} onSubmit={handleSubmit}>
            <input type="text" value={url} onChange={onUrlChange} />
            <button className={styles.search_btn} type="submit">
              <SearchSVG />
            </button>
          </form>
        </Drawer>
      ) : (
        ref.current && (
          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: {
                zIndex: -1,
                backgroundColor: 'transparent',
              },
            }}
          >
            <TextPopUp
              visible={open}
              targetRect={ref.current.getBoundingClientRect()}
              position="bottom"
              handleClose={handleClose}
            >
              <div className={styles.title}>{t('visual_search')}</div>
              <div className={styles.dad_container}>
                <DragAndDropFile
                  helpContent={
                    <div className={styles.dad_help}>
                      <ImageIcon sx={{ fontSize: '3.5em', mb: '0.25em' }} />
                      <div className={styles.dad_help_text}>
                        {t('image_picker_dad_help_text')}
                      </div>
                    </div>
                  }
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  files={image ? [image] : []}
                  onDrop={(files) => {
                    if (files.length) {
                      onPick(files[0]);
                      setOpen(false);
                    }
                  }}
                />
              </div>
              <form className={styles.url_form} onSubmit={handleSubmit}>
                <input type="text" value={url} onChange={onUrlChange} />
                <button className={styles.search_btn} type="submit">
                  <SearchSVG />
                </button>
              </form>
            </TextPopUp>
          </Modal>
        )
      )}
    </>
  );
};
