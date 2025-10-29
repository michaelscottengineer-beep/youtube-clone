import { axiosApi } from "@/lib/axiosInstance";
import type { TVideo } from "@/types/video";
import getVideos from "./getVideo";

export default async function searchVideos(
  term?: string,
  params?: any
): Promise<{
  videos: TVideo[];
}> {
  const url = "search";
  const searchParams = { ...params, part: "snippet", maxResults: 25 };
  if (term) searchParams.q = term;

  const res = await axiosApi.get(url, {
    params: searchParams,
  });

  const videoIds = res.data.items.map((item: any) => {
    return item.id.videoId;
  });

  const { videos } = await getVideos(videoIds, {
    params: {
      part: "statistics,snippet,contentDetails,player,topicDetails,recordingDetails,paidProductPlacementDetails,localizations",
    },
  });

  return {
    videos,
  };
}
