import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowButton } from './arrow-button';
import styles from './horizontal-scroll-container.module.scss';

interface P {
  Component?: 'nav' | 'div';
  children: React.ReactNode;
}

export const HorizontalScrollContainer = ({
  Component = 'div',
  children,
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const [displayLeftBtn, setDisplayLeftBtn] = useState<boolean>(false);
  const [displayRightBtn, setDisplayRightBtn] = useState<boolean>(false);

  const displayArrows = useCallback((tgt: HTMLElement) => {
    const touchscreen =
      typeof navigator !== 'undefined' &&
      'maxTouchPoints' in navigator &&
      navigator.maxTouchPoints > 0;

    if (touchscreen) return;
    if (tgt.scrollWidth === tgt.clientWidth) return;

    const scrollPercentage =
      (100 * tgt.scrollLeft) / (tgt.scrollWidth - tgt.clientWidth);

    setDisplayLeftBtn(scrollPercentage !== 0);
    setDisplayRightBtn(scrollPercentage !== 100);
  }, []);

  const handleScroll = (event: React.SyntheticEvent<HTMLDivElement>) =>
    displayArrows(event.currentTarget);

  useEffect(() => {
    const current = ref.current;
    if (current) displayArrows(current);
  }, [displayArrows]);

  return (
    <Component className={styles.container}>
      <div className={styles.arrow_left}>
        <ArrowButton
          variant="left"
          style={displayLeftBtn ? undefined : { display: 'none' }}
          onClick={() =>
            ref.current?.scrollBy({ top: 0, left: -169, behavior: 'smooth' })
          }
        />
      </div>

      <div
        ref={ref}
        className={styles.scroll_container}
        onScroll={handleScroll}
      >
        {children}
      </div>

      <div className={styles.arrow_right}>
        <ArrowButton
          variant="right"
          style={displayRightBtn ? undefined : { display: 'none' }}
          onClick={() =>
            ref.current?.scrollBy({ top: 0, left: 169, behavior: 'smooth' })
          }
        />
      </div>
    </Component>
  );
};
