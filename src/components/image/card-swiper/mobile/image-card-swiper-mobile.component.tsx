import React from 'react';
import { Virtual, Swiper as TSwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { PageBlockWrapper } from '@/components/common';
import { ImgFullData } from 'lib/types';

import { ImageCard } from './image-card';
import styles from './image-card-swiper-mobile.module.scss';

interface P {
  data: (ImgFullData & { page: number })[];
  onActiveIndexChange: (swiper: TSwiper) => void;
  openedIndex: number;
}

export const ImageCardSwiperMobile = ({
  data,
  onActiveIndexChange,
  openedIndex,
}: P) => (
  <Swiper
    slidesPerView={1}
    spaceBetween={10}
    className={styles.card_swiper}
    modules={[Virtual]}
    virtual
    initialSlide={openedIndex}
    onActiveIndexChange={onActiveIndexChange}
  >
    {data.map((el) => (
      <SwiperSlide key={el.link}>
        <PageBlockWrapper className={styles.page_block_wrapper}>
          <ImageCard data={el} />
        </PageBlockWrapper>
      </SwiperSlide>
    ))}
  </Swiper>
);
