export type SiteCategory = {
  id: number;
  slug: string;
  name: string;
};

export type GetSiteCategoryListRequest = {
  languageId: number;
};

export type GetSiteCategoryListResponse = {
  data: SiteCategory[];
};
