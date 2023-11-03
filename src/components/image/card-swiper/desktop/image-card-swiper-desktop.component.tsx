import React, { useContext } from 'react';
import { Navigation, Virtual, Keyboard, Swiper as TSwiper } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { ImgFullData } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './image-card-swiper-desktop.module.scss';
import { ImageContent } from './image-content';

interface P {
  data: (ImgFullData & { page: number })[];
  onActiveIndexChange: (swiper: TSwiper) => void;
  openedIndex: number;
}

export const ImageCardSwiperDesktop = ({
  data,
  onActiveIndexChange,
  openedIndex,
}: P) => {
  const theme = useContext(AppThemeContext);

  return (
    <div
      className={styles.card_swiper}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <Swiper
        slidesPerView={1}
        className={styles.img_swiper}
        modules={[Navigation, Virtual, Keyboard]}
        virtual
        navigation
        keyboard
        initialSlide={openedIndex}
        onActiveIndexChange={onActiveIndexChange}
        style={{ '--swiper-navigation-color': '#fff' } as React.CSSProperties}
      >
        {data.map((el) => (
          <SwiperSlide key={el.link}>
            <div
              className={styles.img_container}
              style={{ backgroundColor: theme?.palette.background.contrast }}
            >
              <img
                src={el.link}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  verticalAlign: 'middle',
                }}
                alt={el.description}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {data[openedIndex] && <ImageContent data={data[openedIndex]} />}
    </div>
  );
};
