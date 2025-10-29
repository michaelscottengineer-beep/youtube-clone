import { axiosApi } from "@/lib/axiosInstance";
import type { TVideo } from "@/types/video";
import getChannels from "./getChannels";

export default async function getActivities(params?: any): Promise<TVideo[]> {
  const url = "activities";
  const searchParams = {
    ...params,
    part: "id,snippet,contentDetails",
    mine: true,
    maxResults: 15
  };
  const res = await axiosApi.get(url, {
    params: searchParams,
  });
  const videoIds = res.data.items.map((item: any) => {
    return item.id.videoId;
  });

  const urlGetVideos = "videos";
  const resVideos = await axiosApi.get(urlGetVideos, {
    params: {
      part: "statistics,snippet,contentDetails,player,topicDetails,recordingDetails,paidProductPlacementDetails,localizations",
      id: videoIds.join(","),
      forDeveloper: true,
    },
  });

  console.log("res videos", resVideos);

  const promise = resVideos.data.items.map(async (video: any) => {
    const { snippet } = video;
    const channels = await getChannels([snippet.channelId]);
    return {
      id: video.id,
      ...snippet,
      thumbnails: snippet.thumbnails,
      statistics: video.statistics,
      channel: channels[0],
      player: video.player,
    } as TVideo;
  });

  const videos: TVideo[] = await Promise.all(promise);

  return {
    videos,
  };
}
