import getCommentThreads from "@/api/queries/getCommentThreads";
import getVideos from "@/api/queries/getVideo";
import searchVideos from "@/api/queries/searchVideos";
import type { TCommentThread } from "@/types/comment";
import type { TVideo } from "@/types/video";
import type { Params } from "react-router";

interface Args {
  params: Params;
  request: Request;
}

export interface WatchLoaderResponse {
  video: TVideo;
  commentThreads: TCommentThread[];
  relatedVideos: TVideo[]
}

export default async function watchLoader({
  request,
}: Args): Promise<WatchLoaderResponse | null> {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("v");
  if (!videoId) throw new Error("please provide videoId");

  const { videos } = await getVideos([videoId], {
    maxHeight: 400,
    maxWidth: 600,
  });

  if (videos.length > 0) {
    const video = videos[0];

    const { videos: relatedVideos } = await searchVideos(video.title  + "|" + video?.tags?.join('|'), {
      // relatedToVideoId: videoId,
    });
    console.log("relatedVideos", relatedVideos);

    const { commentThreads } = await getCommentThreads({
      videoId,
      channelId: video.channelId,
      order: "relevance",
    });
    return {
      commentThreads,
      relatedVideos,
      video: videos[0],
    };
  }
  return null;
}
