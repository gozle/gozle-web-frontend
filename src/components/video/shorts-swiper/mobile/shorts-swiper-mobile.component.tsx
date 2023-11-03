import React from 'react';
import { Virtual, Swiper as TSwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { ShortsPlayer } from '@/components/shorts-player/player';
import type { VideoData } from 'lib/types';

import styles from './shorts-swiper-mobile.module.scss';

interface P {
  data: VideoData[];
  onActiveIndexChange: (swiper: TSwiper) => void;
  openedIndex: number;
}

export const ShortsSwiperMobile = ({
  data,
  onActiveIndexChange,
  openedIndex,
}: P) => (
  <Swiper
    direction="vertical"
    slidesPerView={1}
    className={styles.card_swiper}
    modules={[Virtual]}
    virtual
    initialSlide={openedIndex}
    onActiveIndexChange={onActiveIndexChange}
  >
    {data.map((el, i) => (
      <SwiperSlide key={el.id}>
        <ShortsPlayer forcePlaying={openedIndex === i} url={el.m3u8} />
      </SwiperSlide>
    ))}
  </Swiper>
);
export default ShortsSwiperMobile;
