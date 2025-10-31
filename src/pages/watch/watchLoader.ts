import getCommentThreads from "@/api/queries/getCommentThreads";
import getVideos from "@/api/queries/getVideo";
import searchVideos from "@/api/queries/searchVideos";
import { nodeServerAuthApi } from "@/lib/axiosInstance";
import type { TCommentThread } from "@/types/comment";
import { type TPlaylist } from "@/types/playlist";
import type { TVideo } from "@/types/video";
import type { Params } from "react-router";

interface Args {
  params: Params;
  request: Request;
}

export interface WatchLoaderResponse {
  video: TVideo;
  commentThreads: TCommentThread[];
  relatedVideos: TVideo[];
  playlist: TPlaylist | null;
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

    const { videos: relatedVideos } = await searchVideos(
      video.title + "|" + video?.tags?.join("|"),
      {
        // relatedToVideoId: videoId,
      }
    );
    console.log("relatedVideos", relatedVideos);

    const { commentThreads } = await getCommentThreads({
      videoId,
      channelId: video.channelId,
      order: "relevance",
    });

    const listId = searchParams.get("list");
    const playlist = await nodeServerAuthApi.get<TPlaylist>(
      "playlists/" + listId
    );
    const { videos: playlistvideos } = await getVideos(playlist?.videoIds);

    return {
      commentThreads,
      relatedVideos,
      video: videos[0],
      playlist: playlist
        ? {
            ...playlist,
            videos: playlistvideos,
          }
        : null,
    };
  }
  return null;
}
