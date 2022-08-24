export type ImageBaseInfo = {
  id: string;
  downloadUrl: string;
};

export type ImageInfo = ImageBaseInfo & {
  author: string;
  width: number;
  height: number;
  url: string;
};
