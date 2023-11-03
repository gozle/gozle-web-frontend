export type WebSearchData = {
  description: string;
  image?: string;
  src: {
    icon?: string;
    link: string;
  };
  title: string;
};

export type InfoData = {
  contacts: { id: number; info: string; name: string }[];
  description: string;
  id: number;
  iframe: string;
  images: { id: number; url: string }[];
  links: { icon: string; id: number; link: string; name: string }[];
  logo: string | null;
  title: string;
};
