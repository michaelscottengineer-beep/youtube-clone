import "./watch.css";

import { Link, useLoaderData, useSearchParams } from "react-router";
import type { WatchLoaderResponse } from "./watchLoader";
import { Button } from "@/components/ui/button";
import { FaRegSmileBeam } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import ListComment from "./ListComment";
import VideoActionButtons from "./VideoActionButtons";
import CommentForm from "./CommentForm";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import ChannelAvatar from "@/components/ChannelAvatar";

const WatchPage = () => {
  const { video, commentThreads, relatedVideos } =
    useLoaderData() as WatchLoaderResponse;
  const [search] = useSearchParams();
  const v = search.get("v");

  if (!video) return null;

  console.log(commentThreads);
  return (
    <div className="grid grid-cols-6 px-20 mt-8 gap-4">
      <div className="w-full col-span-4 h-[388px] space-y-4">
        <div className="h-full">
          <iframe
            title="123"
            src={`https://www.youtube.com/embed/${v}?autoplay=0&showinfo=0&modestbranding=1&controls=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full rounded-lg"
            style={{
              height: "100%",
            }}
          ></iframe>
        </div>

        <div className="info space-y-4">
          <div className="title font-semibold text-xl">{video.title}</div>
          <div className="channelInfo flex items-center justify-between">
            <div className="info-left flex items-center gap-8">
              <div className="author flex items-center gap-2">
                <div className="img">
                  <img
                    src={video.channel.thumbnails.medium.url}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="name font-medium">{video.channel.title}</h4>
                  <div className="subscriber text-gray-500 text-sm">
                    {video.channel.statistics?.subscriberCount} người đăng ký
                  </div>
                </div>
              </div>

              <Button className="registry rounded-full">Đăng ký</Button>
            </div>

            <VideoActionButtons video={video} />
          </div>
          <div className="moreInfo"></div>
        </div>

        <div className="comment-container space-y-4">
          <div className="comment-info">
            <h2 className="font-semibold">
              {video.statistics?.commentCount} bình luận
            </h2>
          </div>

          <CommentForm userAvatarUrl={video.channel.thumbnails.medium.url} />
          <ListComment commentThreads={commentThreads} />
        </div>
      </div>

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
         
                  <h4 className="font-medium line-clamp-2 text-xs">{video.title}</h4>
                  <div className="text-gray-500 text-xs">{video.channel.title}</div>
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
