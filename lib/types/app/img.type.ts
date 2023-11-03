export type ImgBaseData = {
  adult?: boolean;
  alt?: string;
  description: string;
  height: number;
  id?: number | string;
  link: string;
  width: number;
};

export type ImgFullData = ImgBaseData & {
  src: {
    icon: string;
    link: string;
    name: string;
  };
};
