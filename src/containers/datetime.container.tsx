import React from 'react';

import { useAppSelector } from 'lib/hooks';
import { tunedDayjs } from 'lib/modules/tuned.dayjs';

export const DatetimeContainer = () => {
  // const timestamp = useAppSelector((state) => state.timer);
  return <time>{tunedDayjs(0).format('LLLL')}</time>;
};
