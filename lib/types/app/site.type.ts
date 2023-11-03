export type SiteCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Site = {
  categoryId: number;
  description: string;
  icon: string;
  id: string | number;
  src: string;
  title: string;
};
