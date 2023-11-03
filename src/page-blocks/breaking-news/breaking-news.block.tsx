import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Tabs } from '@/components/base';
import { BreakingNewsListContainer } from '@/containers';
import { useAppSelector, useResizeObserver } from 'lib/hooks';
import NewsSVG from 'public/icons/news.svg';

import { BreakingNewsContext } from './breaking-news.context';
import styles from './breaking-news.module.scss';

interface P {
  className?: string;
}

export const BreakingNewsBlock = ({ className }: P) => {
  const { t } = useTranslation('news');

  const mobile = useAppSelector((state) => state.settings.mobile);
  const [small, setSmall] = useState(mobile);
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useResizeObserver(ref);

  const { categoryId: initCategoryId, categories } =
    useContext(BreakingNewsContext);

  const [categoryId, setCategoryId] = useState<number>(initCategoryId || 0);

  const handleCategoryClick = (id: string) => {
    if (categories.find((el) => el.id === +id)) setCategoryId(+id);
  };

  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    setSmall(width < 400);
  }, [width]);

  useEffect(() => {
    if (initCategoryId) setCategoryId(initCategoryId);
  }, [initCategoryId]);

  return (
    <section ref={ref} className={className}>
      <header className={styles.header}>
        <div className={styles.icon}>
          <NewsSVG />
        </div>
        <div className={styles.title}>{t('breaking_news_title')}</div>
        <Tabs
          type={small ? 'vertical' : 'horizontal'}
          className={styles.breaking_news_category_switch}
          active={categoryId}
          tabs={categories.map((c) => ({ id: c.id, title: c.name }))}
          onTabClick={handleCategoryClick}
        />
      </header>
      {category && (
        <BreakingNewsListContainer slug={category.slug} small={small} />
      )}
    </section>
  );
};
