import React from 'react';

import { ArrowRightIcon } from '../../../icons';
import { IconButton } from '../../icon-button';

import styles from './back-button.module.scss';

type P = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BackButton = ({ onClick }: P) => (
  <IconButton className={styles.button} onClick={onClick}>
    <ArrowRightIcon />
  </IconButton>
);
