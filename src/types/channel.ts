import type { TThumbnailInfo } from "./thumbnail";

export type TChannel = {
  id: string;
  thumbnails: {
    default: TThumbnailInfo;
    medium: TThumbnailInfo;
    high: TThumbnailInfo;
  };
  title: string;
  description: string;
  statistics?: {
    viewCount: number;
    subscriberCount: number; // this value is rounded to three significant figures
    hiddenSubscriberCount: boolean;
    videoCount: number;
  };
};
