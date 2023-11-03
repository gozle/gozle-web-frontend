import React, { useEffect, useState } from 'react';

import { Footer } from '@/components/base';

import styles from './footer.module.scss';

export const WithFooterLayout = ({ children }: { children: JSX.Element }) => {
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    const threshold = 100;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  useEffect(() => {
    if (scrollDir === 'up') {
      setClassName(styles.sticky);
      setTimeout(
        () => setClassName((prev) => prev + ' ' + styles.visible),
        100,
      );
    } else {
      setClassName(styles.sticky);
      setTimeout(() => setClassName(''), 100);
    }
  }, [scrollDir]);

  return (
    <>
      {children}
      <Footer className={className} />
    </>
  );
};
