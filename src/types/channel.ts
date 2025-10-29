import type { TThumbnailInfo } from "./thumbnail";

export type TChannel = {
  thumbnails: {
    default: TThumbnailInfo;
    medium: TThumbnailInfo;
    high: TThumbnailInfo;
  };
  title: string;
  statistics?: {
    subscriberCount: number;
  };
};
