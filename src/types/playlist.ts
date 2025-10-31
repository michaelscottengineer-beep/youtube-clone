import type { TVideo } from "./video";

export type TPlaylist = {
  id: string;
  videoIds: string[];
  videos: TVideo[];
  thumbnail: string;
  title: string;
};

export type TPlaylistItem = {
  id: string;
  videos: TVideo[];
  thumbnail: string;
  title: string;
};
