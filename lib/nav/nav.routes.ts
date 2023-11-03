import { NavRoute } from './nav.type';

export const routes: NavRoute[] = [
  {
    i18n: 'navigation_web',
    href: '/search',
  },
  {
    i18n: 'navigation_images',
    href: '/images',
  },
  {
    i18n: 'navigation_videos',
    href: '/videos/search',
    pattern: '/videos',
  },
  {
    i18n: 'navigation_news',
    href: '/news',
  },
];
