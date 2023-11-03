export type GetNewsByFeedRequest = {
  id: string | number;
  lang: string;
  limit?: number;
  page: number;
};

export type GetNewsPopularFeedsRequest = { lang: string };

export type GetNewsPopularFeedsResponse = {
  feed_id: number;
  feed_name: string;
  feed_logo_url: string;
  TOTAL: string;
}[];
