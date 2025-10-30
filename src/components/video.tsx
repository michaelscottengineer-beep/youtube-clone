import { cn } from "@/lib/utils";
import type { TVideo } from "@/types/video";
import { createContext, useContext } from "react";
import ChannelAvatar from "./ChannelAvatar";
import { Button } from "./ui/button";
import VideoActionButtons from "@/pages/watch/VideoActionButtons";
import CommentForm from "@/pages/watch/CommentForm";
import ListComment from "@/pages/watch/ListComment";
import type { TCommentThread } from "@/types/comment";
import { type VariantProps, cva } from "class-variance-authority";
import ChannelInfo from "./ChannelInfo";

interface VideoContextProps {
  video: TVideo;
}

const VideoContext = createContext<VideoContextProps | null>(null);

interface VideoProviderProps {
  video: TVideo;
  children: React.ReactNode;
}
const VideoProvider = ({ video, children }: VideoProviderProps) => {
  return (
    <VideoContext.Provider value={{ video }}>{children}</VideoContext.Provider>
  );
};

const useVideoContext = () => {
  const context = useContext(VideoContext);

  return context;
};

interface VideoTitleProps extends React.ComponentProps<"div"> {}

const VideoTitle = ({ className, ...rest }: VideoTitleProps) => {
  return (
    <div className={cn("title font-semibold line-clamp-2 text-xl", className)} {...rest} />
  );
};

interface VideoSubscribeCountProps extends React.ComponentProps<"div"> {}

const VideoSubscribeCount = ({
  children,
  className,
  ...rest
}: VideoSubscribeCountProps) => {
  return (
    <div
      className={cn("subscriber text-gray-500 text-sm", className)}
      {...rest}
    >
      người đăng ký
    </div>
  );
};

interface VideoFrameProps extends React.ComponentProps<"div"> {
  id: string;
}

const VideoFrame = ({ id, className }: VideoFrameProps) => {
  return (
    <div className={cn("h-full", className)}>
      <iframe
        title={id}
        src={`https://www.youtube.com/embed/${id}?autoplay=0&showinfo=0&modestbranding=1&controls=1`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full rounded-lg"
        style={{
          height: "100%",
        }}
      ></iframe>
    </div>
  );
};

const VideoCardVariants = cva("w-full", {
  variants: {
    size: {
      default: "grid grid-cols-4 gap-4",
      sm: "grid grid-cols-1 gap-4",
      lg: "space-y-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface VideoCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof VideoCardVariants> {
  video: TVideo;
  commentThreads: TCommentThread[];
}

const VideoCard = ({
  video,
  commentThreads,
  className,
  size,
}: VideoCardProps) => {
  return (
    <div className={cn(VideoCardVariants({ size, className }))}>
      <VideoFrame id={video.id} />

      <div className="info space-y-4">
        <VideoTitle>{video.title}</VideoTitle>
        <div className="channelInfo flex items-center justify-between">
          <ChannelInfo channelInfo={video.channel} />

          <VideoActionButtons video={video} />
        </div>
        <div className="moreInfo"></div>
      </div>

      {size === "lg" && (
        <div className="comment-container space-y-4">
          <div className="comment-info">
            <h2 className="font-semibold">
              {video.statistics?.commentCount} bình luận
            </h2>
          </div>

          <CommentForm userAvatarUrl={video.channel.thumbnails.medium.url} />
          <ListComment commentThreads={commentThreads} />
        </div>
      )}
    </div>
  );
};

interface VideoCardContentProps extends React.ComponentProps<"div"> {
  video: TVideo;
  commentThreads?: TCommentThread[];
  size?: "default" | "sm" | "lg";
}

const VideoCardContent = ({
  video,
  commentThreads = [],
  size = "default",
  className,
  ...rest
}: VideoCardContentProps) => {
  return (
    <div className={cn("info space-y-4", className)} {...rest}>
      <VideoTitle>{video.title}</VideoTitle>

      <div className="channelInfo flex items-center justify-between">
        <ChannelInfo channelInfo={video.channel} />

        <VideoActionButtons video={video} />
      </div>

      <div className="moreInfo">
        <VideoSubscribeCount>
          {video.channel?.subscriberCount ?? ""}
        </VideoSubscribeCount>
      </div>

      {size === "lg" && (
        <div className="comment-container space-y-4">
          <div className="comment-info">
            <h2 className="font-semibold">
              {video.statistics?.commentCount ?? 0} bình luận
            </h2>
          </div>

          <CommentForm userAvatarUrl={video.channel.thumbnails.medium.url} />
          <ListComment commentThreads={commentThreads} />
        </div>
      )}
    </div>
  );
};

export { VideoCardContent };
export {
  VideoContext,
  VideoProvider,
  VideoTitle,
  VideoSubscribeCount,
  VideoCard,
};
