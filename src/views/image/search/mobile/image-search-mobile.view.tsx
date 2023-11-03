import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import Swiper from 'swiper';

import { MuiModalWrapper } from '@/components/common';
import { ImageCardSwiperMobile } from '@/components/image/card-swiper';
import { WithPrevMoreLayout } from '@/layouts';
import { useResizeObserver } from 'lib/hooks';
import { ImgFullData } from 'lib/types';
import { ImageSearchResponse } from 'services/image';

import styles from './image-search-mobile.module.scss';

const ResponsiveImageGrid = dynamic(
  () =>
    import(
      '@/components/base/responsive-image-grid/responsive-image-grid.component'
    ),
  { ssr: false },
);

interface P {
  className?: string;
  data?: ImageSearchResponse;
  handleActiveIndexChange: (swiper: Swiper) => void;
  handleCloseModal: () => void;
  handleImgClick: (event: React.MouseEvent<HTMLImageElement>) => void;
  isFetching: boolean;
  maxPage: number;
  minPage: number;
  openedIndex: number;
  reducedImages: (ImgFullData & { page: number })[];
}

const ImageSearchMobileView = ({
  className,
  data,
  handleImgClick,
  handleCloseModal,
  handleActiveIndexChange,
  isFetching,
  maxPage,
  minPage,
  openedIndex,
  reducedImages,
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver(ref);

  return (
    <div className={className}>
      <main>
        <WithPrevMoreLayout
          minPage={minPage}
          maxPage={maxPage}
          isFetching={isFetching}
          data={data}
          shallow={true}
        >
          <div className={styles.grid_outer_container}>
            <div ref={ref}>
              {width > 0 && reducedImages.length > 0 && (
                <ResponsiveImageGrid
                  imgs={reducedImages}
                  rowHeight={100}
                  margin={4}
                  width={width}
                  onImgClick={handleImgClick}
                />
              )}
            </div>
          </div>
        </WithPrevMoreLayout>
      </main>
      {reducedImages.length > 0 && (
        <MuiModalWrapper open={openedIndex !== -1} onClose={handleCloseModal}>
          <ImageCardSwiperMobile
            data={reducedImages}
            openedIndex={openedIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </MuiModalWrapper>
      )}
    </div>
  );
};

export default ImageSearchMobileView;
