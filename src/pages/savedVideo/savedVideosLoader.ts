import { nodeServerAuthApi } from "@/lib/axiosInstance";
import type { TPlaylist } from "@/types/playlist";
import type { Params } from "react-router";

interface Args {
  params: Params;
  request: Request;
}

export interface SavedVideosResponse {
  playlists: TPlaylist[]
}

export default async function savedVideoLoader(): Promise<SavedVideosResponse> {
  // const videoIds = await nodeServerAuthApi.get<string[]>("videos/saved-ids");
  const playlists =  await nodeServerAuthApi.get<TPlaylist[]>("playlists");

  
  if (!playlists) return { playlists: []};



  return {
    playlists
  };
}
