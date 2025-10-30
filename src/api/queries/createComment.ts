import { nodeServerAuthApi } from "@/lib/axiosInstance";

interface CreateCommentPayload {
  channelId: string;
  videoId: string;
  comment: string;
  parentId?: string;
}
export default async function createComment(
  payload: CreateCommentPayload
): Promise<string> {
  const url = "comments";

  const res = await nodeServerAuthApi.post<string>(url, {
    data: payload,
  });

  return res!;
}
