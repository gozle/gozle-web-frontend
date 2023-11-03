export type GetNewsCategoriesRequest = { language: string };

export type GetNewsCategoriesResponse = {
  category_id: number;
  category_name: string;
  category_slug: string;
}[];
