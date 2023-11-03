import Router, { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { PageBlockWrapper } from '../../page-block-wrapper';

import styles from './show-more-button.module.scss';

interface P {
  className?: string;
  disabled?: boolean;
  lastPage: number;
  onClick?: () => void;
  page: number;
  scroll?: boolean;
  shallow?: boolean;
}

export const ShowMoreButton = ({
  className = '',
  disabled,
  lastPage,
  onClick,
  page,
  scroll,
  shallow,
}: P) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pageRef = useRef<number>(page);
  pageRef.current = page;

  const [routerBusy, setRouterBusy] = useState(false);

  const handleClick = useCallback(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, page: pageRef.current + 1 },
      },
      undefined,
      { scroll: false, shallow },
    );
  }, [router, shallow]);

  useEffect(() => {
    const changeStart = () => setRouterBusy(true);
    const changeComplete = () => setRouterBusy(false);

    Router.events.on('routeChangeStart', changeStart);
    Router.events.on('routeChangeComplete', changeComplete);
    Router.events.on('routeChangeError', changeComplete);

    return () => {
      Router.events.off('routeChangeStart', changeStart);
      Router.events.off('routeChangeComplete', changeComplete);
      Router.events.off('routeChangeError', changeComplete);
    };
  }, []);

  useEffect(() => {
    if (scroll) {
      let ticking = false;
      const listener = () => {
        if (
          window.pageYOffset + window.innerHeight >
            document.documentElement.offsetHeight - 200 &&
          pageRef.current < lastPage
        )
          onClick ? onClick() : handleClick();
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking && !routerBusy) {
          window.requestAnimationFrame(listener);
          ticking = true;
        }
      };
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [scroll, lastPage, onClick, routerBusy, handleClick]);

  return (
    <div className={styles.container + ' ' + className}>
      <PageBlockWrapper>
        <button
          className={styles.button}
          onClick={onClick || handleClick}
          disabled={disabled}
        >
          {t('show_more')}
        </button>
      </PageBlockWrapper>
    </div>
  );
};
