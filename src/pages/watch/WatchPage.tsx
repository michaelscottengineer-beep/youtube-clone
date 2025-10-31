import "./watch.css";

import { Link, useLoaderData, useSearchParams } from "react-router";
import type { WatchLoaderResponse } from "./watchLoader";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { VideoCard, VideoProvider, VideoTitle } from "@/components/Video";
import { cn } from "@/lib/utils";

const WatchPage = () => {
  const [search] = useSearchParams();
  const { video, commentThreads, playlist, relatedVideos } =
    useLoaderData() as WatchLoaderResponse;

  const listId = search.get("list");
  const v = search.get("v");

  if (!video) return null;

  return (
    <div className="grid grid-cols-6 px-20 mt-8 gap-4">
      <VideoProvider video={video}>
        <VideoCard
          video={video}
          commentThreads={commentThreads}
          className="col-span-4 h-[388px]"
          size={"lg"}
        />
      </VideoProvider>

      <div className="col-span-2">
        {listId && (
          <div className="border rounded-xl p-2 max-h-[400px] overflow-y-auto">
            <div className="text-xl font-semibold">{playlist?.title}</div>
            <div className="flex gap-2 flex-col">
              {playlist?.videos.map((video) => {
                const isActive = video.id === v;
                return (
                  <Link
                    to={`/watch?v=${video.id}&list=${playlist.id}`}
                    key={video.id}
                    className={cn("grid grid-cols-[150px_1fr] gap-2 video hover:bg-hover-video-card cursor-pointer px-2 py-2 rounded-lg", {
                      "bg-hover-video-card": isActive
                    })}
                  >
                    <div className="img">
                      <img
                        src={video.thumbnails.medium.url}
                        alt="thumbnail video"
                        className="rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <VideoTitle className="text-sm">{video.title}</VideoTitle>
                      <div className="text-sm text-gray-500">
                        {video.channel.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col w-full ">
          {relatedVideos?.map((video) => {
            return (
              <Link
                to={`/watch?v=${video.id}`}
                className="video hover:bg-hover-video-card cursor-pointer px-2 py-2 rounded-lg grid grid-cols-2 gap-4"
                key={video.id}
              >
                <div className="img">
                  <img
                    src={video.thumbnails.medium.url}
                    className="w-full rounded-lg"
                    alt="thumbnail-img"
                  />
                </div>

                <div className="info flex flex-col flex-1 gap-1 items-start">
                  <VideoTitle className="text-xs">{video.title}</VideoTitle>

                  <div className="text-gray-500 text-xs">
                    {video.channel.title}
                  </div>
                  <div className="videoInfo flex items-center gap-1 text-xs text-gray-500">
                    <div>{video.statistics?.viewCount} lượt xem</div>
                    <div className="dot bg-gray-500 w-1 h-1 rounded-full"></div>
                    <div>
                      {formatDistanceToNow(new Date(video.publishedAt), {
                        locale: vi,
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
