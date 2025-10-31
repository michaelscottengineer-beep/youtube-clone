import { Button } from "@/components/ui/button";

import { nodeServerAuthApi } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

import { MdPlaylistPlay } from "react-icons/md";

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useVideoContext from "@/hooks/use-video-context";
import type { TPlaylist } from "@/types/playlist";

interface PlaylistDialogProps {
  isOpen?: boolean;
  onOpenChange: (open: boolean) => void;
}
const PlaylistDialog = ({ isOpen, onOpenChange }: PlaylistDialogProps) => {
  const { video } = useVideoContext();
  const [myRating, setMyRating] = useState(video.myRating);
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);

  useEffect(() => {
    async function getPlayLists() {
      const res = await nodeServerAuthApi.get<TPlaylist[]>("playlists");
      if (res) {
        setPlaylists(res);
      }
    }

    getPlayLists();
  }, [isOpen]);

  const handleSaveClick = async (
    isSaved: boolean,
    playListId: string,
    playlistTitle: string
  ) => {
    const pathToAction = isSaved ? "videos/remove-save" : "videos/save";
    const message = isSaved
      ? `Xóa khỏi ${playlistTitle} thành công`
      : `Lưu vào ${playlistTitle} thành công`;
    await nodeServerAuthApi
      .post(pathToAction, {
        data: {
          videoId: video?.id,
          playListId,
        },
      })
      .then(() => {
        toast.success(message);
      });

    setMyRating((prev) => ({ ...prev, isSaved: !myRating.isSaved }));
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div>
          {playlists.map((pl) => {
            const isSaved = pl.videoIds.some((id) => id === video.id);
            return (
              <Button
                variant={"ghost"}
                key={pl.id}
                className="flex w-full py-2 h-max items-center justify-between gap-2"
                onClick={() => handleSaveClick(isSaved, pl.id, pl.title)}
              >
                <div className="flex items-center gap-2">
                  <img
                  alt="playlist thumbnail"
                    src={pl.thumbnail}
                    className="w-[200p] h-10 rounded-md"
                  />
                  <div className="flex flex-col gap-1 items-start">
                    <div>{pl.title}</div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MdPlaylistPlay className="text-gray-500" />
                      {pl.videoIds.length} videos
                    </div>
                  </div>
                </div>
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistDialog;
