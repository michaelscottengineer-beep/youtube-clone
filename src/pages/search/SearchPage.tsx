import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import type { SearchLoaderResponse } from "./searchLoader";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import type { TVideo } from "@/types/video";

const SearchPage = () => {
  const { videos } = useLoaderData() as SearchLoaderResponse;
  console.log("my videos", videos);

  return (
    <div className="flex flex-col gap-4 px-4">
      {videos.map((video) => {
        return <VideoCard key={video.id} video={video} />;
      })}
    </div>
  );
};

interface VideoCardProps {
  video: TVideo;
}
const VideoCard = ({ video }: VideoCardProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <div className="flex items-start gap-4">
      <div className="thumbnail hover:cursor-pointer ">
        <img
          src={video.thumbnails.medium.url}
          style={{
            width: video.thumbnails.medium.width,
            height: video.thumbnails.medium.height,
          }}
          className="rounded-lg"
        />
      </div>

      <div className="flex-1 gap-4 flex flex-col">
        <div className="flex flex-col gap-1 text-gray-600">
          <Link
            to={`/watch?v=${video.id}`}
            className="title font-normal text-xl"
          >
            {video.title}
          </Link>
          <div className="videoInfo flex items-center gap-1 text-xs">
            <div>{video.statistics?.viewCount} lượt xem</div>
            <div className="dot bg-gray-500 w-1 h-1 rounded-full"></div>
            <div>
              {formatDistanceToNow(new Date(video.publishedAt), {
                locale: vi,
              })}
            </div>
          </div>
        </div>

        <Link to={`author`} className="author text-sm items-center flex gap-2">
          <img
            src={video.channel.thumbnails.medium.url}
            style={{
              height: 24,
              width: 24,
              aspectRatio: 1,
            }}
            alt="avatar"
            className="rounded-full"
          />
          <div className="authorName text-xs font-normal text-gray-400">
            {video.channelTitle}
          </div>
          <div className="badge">{}</div>
        </Link>
        <div className="description line-clamp-3 text-gray-500 text-sm">
          {video.description}
        </div>

      </div>
    </div>
  );
};
export default SearchPage;
