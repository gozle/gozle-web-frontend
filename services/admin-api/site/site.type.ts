export enum SiteType {
  SERVICE = 'service',
  SHOP = 'shop',
}

export type Site = {
  id: number;
  logo: string;
  title: string;
  description: string;
  url: string;
  categoryId: number;
};

export type GetSiteListRequest = {
  languageId: number;
  siteCategoryId?: number;
};
export type GetSiteListResponse = { data: Site[] };
