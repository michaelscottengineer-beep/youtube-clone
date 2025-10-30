import { Link } from "react-router";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import ChannelAvatar from "./ChannelAvatar";
import type { TChannel } from "@/types/channel";
import { Button } from "./ui/button";

const channelInfoVariants = cva("flex gap-2", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
      xl: "flex items-center",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelInfoProps extends VariantProps<typeof channelInfoVariants> {
  channelInfo: TChannel;
  className?: string;
}

const ChannelInfo = ({ channelInfo, size, className }: ChannelInfoProps) => {
  return (
    <div className={cn(channelInfoVariants({ size, className }))}>
      <ChannelAvatar
        avatarUrl={channelInfo.thumbnails.medium.url}
        channelId={channelInfo.id}
        size={size}
      />

      <div
        className={cn("flex info items-center flex-1 gap-8", {
          "flex-col justify-start items-start": size === "xl",
        })}
      >
        <div className={cn("flex flex-col flex-1", {})}>
          <h4 className="name font-medium">{channelInfo.title}</h4>
          <div className="subscriber text-gray-500 text-sm flex items-center gap-2">
            {channelInfo.statistics?.subscriberCount} người đăng ký
            {size === "xl" && (
              <>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                {channelInfo.statistics?.videoCount} video
              </>
            )}
          </div>

          {size === "xl" && <div>{channelInfo.description}</div>}
        </div>
        <Button className="registry rounded-full">Đăng ký</Button>
      </div>
    </div>
  );
};

export default ChannelInfo;
