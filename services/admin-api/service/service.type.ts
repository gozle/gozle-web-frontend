export type Service = {
  id: number;
  logo: string;
  title: string;
  description: string;
  url: string;
  color: string;
};

export type GetServiceListRequest = {
  languageId: number;
};
export type GetServiceListResponse = {
  data: Service[];
};
