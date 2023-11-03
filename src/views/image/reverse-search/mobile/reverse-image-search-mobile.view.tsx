import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';
import Swiper from 'swiper';

import { MuiModalWrapper } from '@/components/common';
import { ImageCardSwiperMobile } from '@/components/image/card-swiper';
import { useResizeObserver } from 'lib/hooks';
import { ImgFullData } from 'lib/types';

import styles from './reverse-image-search-mobile.module.scss';

const ResponsiveImageGrid = dynamic(
  () =>
    import(
      '@/components/base/responsive-image-grid/responsive-image-grid.component'
    ),
  { ssr: false },
);

interface P {
  className?: string;
  data: (ImgFullData & { page: number })[];
  handleActiveIndexChange: (swiper: Swiper) => void;
  handleCloseModal: () => void;
  handleImgClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  image?: File;
  openedIndex: number;
  url?: string;
}

const ReverseImageSearchMobileView = ({
  className,
  data,
  handleImgClick,
  handleCloseModal,
  handleActiveIndexChange,
  image,
  openedIndex,
  url,
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver(ref);
  const { t } = useTranslation();

  const preview = image && URL.createObjectURL(image);

  return (
    <div className={className}>
      <main>
        <div className={styles.search_container}>
          <div className={styles.search_image}>
            <img src={preview ? preview : url || ''} alt="Searched image" />
          </div>
        </div>
        <div className={styles.grid_outer_container}>
          <div ref={ref}>
            {width > 0 && data.length > 0 && (
              <ResponsiveImageGrid
                imgs={data}
                rowHeight={100}
                margin={4}
                width={width}
                onImgClick={handleImgClick}
              />
            )}
          </div>
        </div>
      </main>
      {data.length > 0 && (
        <MuiModalWrapper open={openedIndex !== -1} onClose={handleCloseModal}>
          <ImageCardSwiperMobile
            data={data}
            openedIndex={openedIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </MuiModalWrapper>
      )}
    </div>
  );
};

export default ReverseImageSearchMobileView;
