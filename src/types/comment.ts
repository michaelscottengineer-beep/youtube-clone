export type TComment = {
  id: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: {
    value: string;
  };
  channelId: string;
  textDisplay: string;
  textOriginal: string;
  parentId: string;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  moderationStatus: string;
  publishedAt: string;
  updatedAt: string;
  videoId: string;
  myRating: {
    like: boolean;
    dislike: boolean;
  };
};

export type TCommentThread = {
  id: string;
  channelId: string;
  videoId: string;
  topLevelComment: TComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
  replies: TComment[];
};
