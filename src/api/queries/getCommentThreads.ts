import { axiosApi } from "@/lib/axiosInstance";
import type { TComment, TCommentThread } from "@/types/comment";

interface CommentThreadParams {
  videoId?: string;
}
export default async function getCommentThreads(
  params?: CommentThreadParams & Record<string, string>
): Promise<{
  commentThreads: TCommentThread[];
}> {
  const url = "commentThreads";
  const searchParams = {
    ...params,
    part: "id,snippet,replies",
  };
  const res = await axiosApi.get(url, {
    params: searchParams,
  });

  const commentThreads = res.data.items.map((item: any) => {
    const { snippet } = item;
    const replies = item.replies?.comments.map((rep: any) => {
      return {
        id: rep.id,
        ...rep.snippet,
      } as TComment;
    }) ?? [];

    const topLevelComment: TComment ={
      ... snippet.topLevelComment.snippet,
      id:  snippet.topLevelComment.id,
    };
    return {
      ...snippet,
      topLevelComment,
      replies,
    } as TCommentThread;
  });

  return {
    commentThreads,
  };
}
