export interface VideoData {
  duration?: number | null;
  id: number | string;
  m3u8: string;
  src: {
    icon: string | null;
    id: number;
    name: string;
  };
  thumbnail: string;
  timestamp: number;
  title: string;
  views: number;
}

export interface VideoExtendedData extends VideoData {
  categories: number[];
  description: string;
}

export type VideoCategory = {
  id: number;
  name: string;
  slug: string;
};

export type VideoMenuItem = {
  icon: string;
  id: number;
  name: string;
  slug: string;
};

export interface VideoChannelData {
  avatar: string | null;
  banner: string | null;
  id: number;
  name: string;
  views: number;
}

export type VideoAd = {
  description: string;
  duration: number;
  id: number;
  landingUrl: string;
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
};
