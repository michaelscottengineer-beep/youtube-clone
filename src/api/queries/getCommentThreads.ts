import { axiosApi, nodeServerAuthApi } from "@/lib/axiosInstance";
import type { TComment, TCommentThread } from "@/types/comment";

interface CommentThreadParams {
  videoId?: string;
  channelId?: string;
}
export default async function getCommentThreads(
  params?: CommentThreadParams & Record<string, string>
): Promise<{
  commentThreads: TCommentThread[];
}> {
  const commentsFromNodeServer = await nodeServerAuthApi.get<TCommentThread[]>("comments", {
    params: { channelId: params?.channelId, videoId: params?.videoId },
  });

  const url = "commentThreads";
  const searchParams = {
    ...params,
    part: "id,snippet,replies",
  };
  delete searchParams['channelId']
  const res = await axiosApi.get(url, {
    params: searchParams,
  });

  const commentThreads = res.data.items.map((item: any) => {
    const { snippet } = item;
    const replies =
      item.replies?.comments.map((rep: any) => {
        return {
          id: rep.id,
          ...rep.snippet,
          videoId: snippet.videoId,
        } as TComment;
      }) ?? [];

    const topLevelComment: TComment = {
      ...snippet.topLevelComment.snippet,
      id: snippet.topLevelComment.id,
      videoId: snippet.videoId,
    };
    return {
      ...snippet,
      topLevelComment,
      replies,
    } as TCommentThread;
  });


  return {
    commentThreads: commentsFromNodeServer ? [...commentsFromNodeServer, ...commentThreads] : [commentThreads],
  };
}
