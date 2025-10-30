import { Link } from "react-router";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const className = "object-cover rounded-full";
const channelAvatarVariants = cva(className, {
  variants: {
    size: {
      default: "w-10 h-10",
      sm: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-14 h-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelAvatarProps
  extends VariantProps<typeof channelAvatarVariants> {
  channelId?: string;
  avatarUrl?: string;
  className?: string;
}

const ChannelAvatar = ({
  avatarUrl = "/user-avatar-temp.jpg",
  channelId,
  size,
  className,
}: ChannelAvatarProps) => {
  const Wrapper = channelId ? Link : Fragment;
  return (
    <Wrapper to={`/${channelId}`} className="avatar">
      <img
        src={avatarUrl}
        alt="author-comment-avatar"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        className={cn(channelAvatarVariants({ size, className }), )}
      />
    </Wrapper>
  );
};

export default ChannelAvatar;
