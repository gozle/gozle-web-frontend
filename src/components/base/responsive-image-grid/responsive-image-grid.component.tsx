import React, { useMemo, useState } from 'react';

import type { ImgBaseData } from 'lib/types';

import { ResponsiveImageGridItem } from './responsive-image-grid-item.component';

interface P {
  imgs: (ImgBaseData & { page: number })[];
  margin: number;
  onImgClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  rowHeight: number;
  width: number;
}

type RowImgData = { img: ImgBaseData & { page: number }; ratio: number };

export const ResponsiveImageGrid = ({
  imgs,
  margin = 0,
  onImgClick,
  rowHeight,
  width,
}: P) => {
  const [erroredImgs, setErroredImgs] = useState<boolean[]>(
    new Array(imgs.length).fill(false),
  );

  const styles = useMemo((): React.CSSProperties[] => {
    const getImgStyles = (
      imgRatio: number,
      rowImgsRatio: number,
      isFirstInRow: boolean,
      isLastRow: boolean,
    ) => {
      // Real row height may differ from what is in the props
      // because we add less or more images in a row
      const realRowHeight = isLastRow
        ? Math.min(width / rowImgsRatio, rowHeight)
        : width / rowImgsRatio;
      const marginRight: number = isFirstInRow ? 0 : margin;
      return {
        height: realRowHeight,
        // Take back out the margin from the ratio.
        width: realRowHeight * imgRatio - marginRight,
        marginLeft: marginRight,
        cursor: onImgClick ? 'pointer' : 'default',
      };
    };

    const styles: React.CSSProperties[] = [];
    let row: RowImgData[] = [];
    let rowImgsRatio = 0;

    const rowRatio: number = width / rowHeight;

    for (let i = 0; i < imgs.length; ) {
      const img = imgs[i];
      const isLast = i === imgs.length - 1;
      let imgRatio = (img.width + (row.length ? margin : 0)) / img.height;
      if (erroredImgs[i]) imgRatio = 0;

      // 10% compress of a row is allowed
      const outOfBounds = rowImgsRatio + imgRatio > rowRatio * 1.1;

      // If compress less than 10% or that img is single in a row
      if (!outOfBounds || !row.length) {
        row.push({ img, ratio: imgRatio });
        rowImgsRatio += imgRatio;
        i++;
      }

      if (outOfBounds || rowImgsRatio >= rowRatio || isLast) {
        styles.push(
          ...row.map((el, j) =>
            getImgStyles(
              el.ratio,
              rowImgsRatio,
              j === 0,
              isLast && i === imgs.length,
            ),
          ),
        );
        row = [];
        rowImgsRatio = 0;
      }
    }
    return styles;
  }, [imgs, margin, onImgClick, rowHeight, width, erroredImgs]);

  const handleError = (event: React.MouseEvent<HTMLImageElement>) => {
    const index = event.currentTarget.getAttribute('data-index');
    const id = event.currentTarget.getAttribute('data-id');
    if (index && id) {
      const img = imgs[+index];
      if (String(img.id) === id)
        setErroredImgs((prev) => {
          const newImgs = [...prev];
          newImgs[+index] = true;
          return newImgs;
        });
    }
  };

  return (
    <div style={{ width }}>
      {imgs.map(
        (img, i) =>
          !erroredImgs[i] && (
            <ResponsiveImageGridItem
              key={`${img.id}-${i}`}
              index={i}
              style={styles[i]}
              data={img}
              onClick={onImgClick}
              onError={handleError}
            />
          ),
      )}
    </div>
  );
};

export default ResponsiveImageGrid;
