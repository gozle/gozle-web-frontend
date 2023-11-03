import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './tabs.module.scss';

export type Tab = { id: string | number; title: string };

interface P {
  active: Tab['id'];
  className?: string;
  onTabClick: (id: string) => void;
  tabs: Tab[];
  type?: 'horizontal' | 'vertical';
}

const transitionDuration = 150;

const calcStylesFunctions = {
  horizontal: [
    (rect: DOMRect, tabRect: DOMRect): React.CSSProperties => ({
      bottom: 0,
      right: rect.right - tabRect.right,
      top: 'unset',
    }),
    (rect: DOMRect, tabRect: DOMRect): React.CSSProperties => ({
      bottom: 0,
      left: tabRect.left - rect.left,
      top: 'unset',
    }),
  ],
  vertical: [
    (rect: DOMRect, tabRect: DOMRect): React.CSSProperties => ({
      bottom: rect.bottom - tabRect.bottom + (tabRect.height / 2 - 2),
      left: 'unset',
      right: 0,
    }),
    (rect: DOMRect, tabRect: DOMRect): React.CSSProperties => ({
      top: tabRect.top - rect.top + (tabRect.height / 2 - 2),
      left: 'unset',
      right: 0,
    }),
  ],
};

export const Tabs = ({
  active,
  className = '',
  type = 'horizontal',
  ...props
}: P) => {
  const ref = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const [slideStyle, setSlideStyle] = useState<React.CSSProperties>({
    transitionDuration: `${transitionDuration}ms`,
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const calcStyles = useMemo(() => calcStylesFunctions[type], [type]);

  const handleTabClick = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>): void => {
    const index = currentTarget.getAttribute('data-index');
    const id = currentTarget.getAttribute('data-id');
    const tabRefRect = currentTarget.getBoundingClientRect();
    const rect = ref.current?.getBoundingClientRect();
    if (index != null && id != null && rect) {
      const activeIndex = props.tabs.findIndex((t) => t.id === active);
      setSlideStyle((prev) => ({
        ...prev,
        ...calcStyles[+index > activeIndex ? 0 : 1](rect, tabRefRect),
      }));
      props.onTabClick(id);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isMounted) {
        const tabRect = tabRef.current?.getBoundingClientRect();
        const rect = ref.current?.getBoundingClientRect();
        if (active && tabRect && rect)
          setSlideStyle((prev) => ({
            ...prev,
            ...calcStyles[0](rect, tabRect),
            ...calcStyles[1](rect, tabRect),
          }));
      }
    }, transitionDuration);
  }, [isMounted, active, calcStyles]);

  return (
    <div
      ref={ref}
      className={
        styles.container + ' ' + styles[`container_${type}`] + ' ' + className
      }
    >
      <div className={styles.tabs + ' ' + styles[`tabs_${type}`]}>
        {props.tabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <span
              key={tab.id}
              tabIndex={0}
              ref={isActive ? tabRef : undefined}
              data-active={isActive}
              data-index={i}
              data-id={tab.id}
              onClick={handleTabClick}
            >
              {tab.title}
            </span>
          );
        })}
      </div>
      <div
        className={styles.slide + ' ' + styles[`slide_${type}`]}
        style={slideStyle}
      />
    </div>
  );
};
