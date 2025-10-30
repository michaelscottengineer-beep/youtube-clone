import "./watch.css";

import { Link, useLoaderData, useSearchParams } from "react-router";
import type { WatchLoaderResponse } from "./watchLoader";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { VideoCard, VideoTitle } from "@/components/Video";

const WatchPage = () => {
  const { video, commentThreads, relatedVideos } =
    useLoaderData() as WatchLoaderResponse;

  if (!video) return null;

  console.log(commentThreads);
  return (
    <div className="grid grid-cols-6 px-20 mt-8 gap-4">
      <VideoCard video={video} commentThreads={commentThreads} className="col-span-4 h-[388px]" size={'lg'} />

      <div className="flex flex-col w-full col-span-2">
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
                <VideoTitle className="text-xs">
                  {video.title}
                </VideoTitle>

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
  );
};

export default WatchPage;
