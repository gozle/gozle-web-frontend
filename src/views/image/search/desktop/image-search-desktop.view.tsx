import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import Swiper from 'swiper';

import { MuiModalWrapper } from '@/components/common';
import { ImageCardSwiperDesktop } from '@/components/image/card-swiper';
import { WithPrevMoreLayout } from '@/layouts';
import { useResizeObserver } from 'lib/hooks';
import { ImgFullData } from 'lib/types';
import { ImageSearchResponse } from 'services/image';

import styles from './image-search-desktop.module.scss';

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

// const data: ImgBaseData[] = Array(20)
//   .fill(1)
//   .map(() => {
//     const height = Math.floor(Math.random() * (600 - 300) + 300);
//     const width = Math.floor(Math.random() * (1200 - 200) + 200);
//     return {
//       description: "Image",
//       link: `https://via.placeholder.com/${width}x${height}`,
//       width: width * 10,
//       height: height * 10,
//     };
//   });

const ImageSearchDesktopView = ({
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
      <main className={styles.block__central}>
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
                  rowHeight={200}
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
          <ImageCardSwiperDesktop
            data={reducedImages}
            openedIndex={openedIndex}
            onActiveIndexChange={handleActiveIndexChange}
          />
        </MuiModalWrapper>
      )}
    </div>
  );
};

export default ImageSearchDesktopView;
