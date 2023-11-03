export type GetVideoAdRequest = { language: string };
export type GetVideoAdResponse = {
  description: string;
  duration: number;
  link: string;
  m3u8: string;
  pk: number;
  thumbnail_url: string;
  title: string;
};
