export interface NewsBaseData {
  categorySlug: string;
  description: string;
  id: number | string;
  img: string;
  is_popular?: boolean;
  src: {
    icon: string;
    name: string;
  };
  timestamp: number;
  title: string;
  views: number;
}

export interface NewsExtendedData extends NewsBaseData {
  content?: string;
  src: {
    icon: string;
    id: number;
    link: string;
    name: string;
  };
}

export type NewsCategory = {
  id: number;
  name: string;
  slug: string;
};

export type NewsFeed = {
  icon: string;
  id: number;
  name: string;
  total: number;
};
