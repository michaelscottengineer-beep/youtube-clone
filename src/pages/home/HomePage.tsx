import { useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useRevalidator,
  useSearchParams,
} from "react-router";
import type { HomeLoaderResponse } from "./homeLoader";
import { Button } from "@/components/ui/button";
import type { TVideoCategory } from "@/types/videoCategory";
import type { TVideo } from "@/types/video";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import ChannelAvatar from "@/components/ChannelAvatar";
import { VideoTitle } from "@/components/Video";

const ListCategory = ({ categories }: { categories: TVideoCategory[] }) => {
  const [search] = useSearchParams();
  const cateId = search.get("cateId");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const revalidator = useRevalidator();

  const handleClick = (cateId: string, index: number) => {
    navigate("/?cateId=" + cateId);
    setActiveIndex(index);
    revalidator.revalidate();
  };

  return (
    <div className="flex items-center gap-4 max-w-full overflow-x-auto ">
      <div>
        <Button
          variant={!cateId ? "default" : "secondary"}
          onClick={() => handleClick("", 0)}
        >
          Tất cả
        </Button>
      </div>

      {categories.map((category, i) => {
        return (
          <div key={category.id}>
            <Button
              variant={cateId === category.id ? "default" : "secondary"}
              onClick={() => handleClick(category.id, i + 1)}
            >
              {category.id} - {category.snippet.title}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const ListVideoHomePage = ({ videos }: { videos: TVideo[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {videos?.map((video) => {
        return (
          <Link
            to={`/watch?v=${video.id}`}
            className="video hover:bg-hover-video-card cursor-pointer px-2 py-2 rounded-lg"
            key={video.id}
          >
            <div className="img">
              <img
                src={video.thumbnails.medium.url}
                className="w-full rounded-lg"
                alt="thumbnail-img"
              />
            </div>
            <div className="info flex gap-3 py-2 items-start">
              <ChannelAvatar
                avatarUrl={video.channel.thumbnails.medium.url}
                channelId={video.channelId}
                size={"sm"}
              />
              <div className="div flex-1 space-y-1">
                <VideoTitle className="text-sm">{video.title}</VideoTitle>
                <div className="text-gray-500 text-sm">
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
            </div>
          </Link>
        );
      })}
    </div>
  );
};
const HomePage = () => {
  const { categories, videos } = useLoaderData() as HomeLoaderResponse;

  return (
    <div className="px-4">
      <ListCategory categories={categories} />
      <ListVideoHomePage videos={videos} />
    </div>
  );
};

export default HomePage;
