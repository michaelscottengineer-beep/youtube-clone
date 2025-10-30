import { axiosApi, nodeServerAuthApi } from "@/lib/axiosInstance";
import type { TVideo } from "@/types/video";
import getChannels from "./getChannels";
import { MAX_RESULTS } from "@/constants";

export default async function getVideos(
  videoIds?: string[],
  params?: any
): Promise<{ videos: TVideo[] }> {
  const urlGetVideos = "videos";
  const searchParams = { ...params };
  if (videoIds) searchParams.id = videoIds.join(",");

  const resVideos = await axiosApi.get(urlGetVideos, {
    params: {
      ...searchParams,
      part: "statistics,snippet,contentDetails,player,topicDetails",
      maxResults: MAX_RESULTS.DIV_4,
    },
  });

  const promise = resVideos.data.items.map(async (video: any) => {
    const { snippet } = video;
    const channels = await getChannels([snippet.channelId]);
    const myRating = await nodeServerAuthApi.get('my-rating/state', {
      params: {
        itemId: video.id
      }
    });

    return {
      id: video.id,
      ...snippet,
      thumbnails: snippet.thumbnails,
      statistics: video.statistics,
      channel: channels[0],
      player: video.player,
      myRating
    } as TVideo;
  });

  const videos = await Promise.all(promise);

  console.log(videos, 'zzz')
  return {
    videos,
  };
}
