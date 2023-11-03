export const getNewsFeedLink = (id: number | string) => `/news/feeds/${id}`;

export const getNewsCategoryLink = (category: string) =>
  `/news/categories/${category}`;

export const getNewsLink = (id: number | string) => `/news/watch/${id}`;

export const getSearchLink = (query: string) =>
  `/search?q=${encodeURIComponent(query)}&page=1`;

export const getVideoLink = (id: number | string) => `/videos/watch/${id}`;

export const getVideoCategoryLink = (category: string) =>
  `/videos/categories/${category}`;

export const getVideoChannelLink = (id: number) => `/videos/channels/${id}`;

export const getBlogPostLink = (id: number | string) => `/blog/post/${id}`;
