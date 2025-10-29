import type { TChannel } from "./channel";
import type { TThumbnailInfo } from "./thumbnail";

export type TVideo = {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: TThumbnailInfo;
    medium: TThumbnailInfo;
    high: TThumbnailInfo;
    standard: TThumbnailInfo;
    maxres: TThumbnailInfo;
  };
  tags: string[];
  categoryId: string;
  channelId: string;
  channelTitle: string;
  channel: TChannel;
  statistics?: {
    likeCount: string;
    viewCount?: string;
    dislikeCount: string;
    commentCount: string;
    favoriteCount: string;
  };
  player: {
    embedHtml: string;
  };
  publishedAt: string; // ISO datetime string
  duration: string; // ISO 8601 duration format (e.g. "PT5M12S")
  topicDetails: {
    topicIds: [string];
    relevantTopicIds: [string];
    topicCategories: [string];
  };
};
