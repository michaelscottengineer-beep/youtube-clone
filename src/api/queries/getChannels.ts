import { axiosApi } from "@/lib/axiosInstance";
import type { TChannel } from "@/types/channel";

export default async function getChannels(channelIds: string[], params?: any) {
  const url = "channels";
  const searchParams = {
    ...params,
    id: channelIds.join(","),
    part: "contentDetails,snippet,statistics",
  };
  const res = await axiosApi.get(url, {
    params: searchParams,
  });

  const channels = res.data.items.map((item: any) => {
    const { snippet } = item;
    return {
      thumbnails: snippet.thumbnails,
      title: snippet.title,
      statistics: item.statistics,
    } as TChannel;
  });
  return channels as TChannel[];
}
