export type Language = {
  id: number;
  name: string;
  shortName: string;
  code: string;
};

export type GetLanguageListResponse = {
  data: Language[];
};
