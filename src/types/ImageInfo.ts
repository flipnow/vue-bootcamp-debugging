export type ImageBaseInfo = {
  id: string;
  download_url: string;
};

export type ImageInfo = ImageBaseInfo & {
  author: string;
  width: number;
  height: number;
  url: string;
};
