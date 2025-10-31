import { useEffect, useMemo, useState } from "react";
import { Button, type ButtonProps } from "./ui/button";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { nodeServerAuthApi } from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";

type VoteButtonProps = {
  variant: "like" | "dislike";
  defaultValue?: boolean;
   count?: number | string;
  itemId: string;
  className?: string
  itemType?: "comment" | "default"
  onClickCallback?: (value: number) => void;
} 

const LIKE_VALUE = 1,
  DISLIKE_VALUE = 0;

const VoteButton = ({
  variant,
  defaultValue,
  itemId,
  count,
  onClickCallback,
  className
}: VoteButtonProps) => {
  const [value, setValue] = useState(!!defaultValue);
  const pathToAction =
    variant === "like" ? "my-rating/like" : "my-rating/dislike";
  const valueToCheckStatus = variant === "like" ? LIKE_VALUE : DISLIKE_VALUE;

  console.log("rer-ender ", variant, defaultValue, value);
  const icon = (() => {
    if (variant === "like" && value) return <AiFillLike />;
    else if (variant === "like" && !value) return <AiOutlineLike />;
    else if (variant === "dislike" && value) return <AiFillDislike />;
    else if (variant === "dislike" && !value) return <AiOutlineDislike />;
  })();

  useEffect(() => {
    setValue(!!defaultValue);
  }, [defaultValue]);

  const handleToggleClick = async () => {
    const value = await nodeServerAuthApi.post<number>(pathToAction, {
      data: {
        itemId,
      },
    });
    setValue(value === valueToCheckStatus);
    onClickCallback?.(value ?? -1);
  };

  return (
    <Button
      variant="outline"
      className={cn("rounded-full", className)}
      onClick={handleToggleClick}
    >
      {icon}
      {variant === "like" && count && <div>{count}</div>}
    </Button>
  );
};

export default VoteButton;
