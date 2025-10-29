import { Button } from "@/components/ui/button";
import { SlDislike, SlLike } from "react-icons/sl";

interface CommentActionButtonsProps {
  likeCount: string | number;
  onReplyClickCallback: () => void;
}

const CommentActionButtons = ({
  onReplyClickCallback,
  likeCount,
}: CommentActionButtonsProps) => {
  const handleReplyClick = () => {
    onReplyClickCallback?.();
  };

  return (
    <div className="comment-actions flex items-center gap-2 text-xs box-content">
      <Button variant={"ghost"} size={"icon-sm"} className="rounded-full ">
        <SlLike />
      </Button>
      <div>{likeCount}</div>

      <Button variant={"ghost"} size={"icon-sm"} className="rounded-full">
        <SlDislike />
      </Button>

      <Button
        variant={"ghost"}
        className="rounded-full"
        onClick={handleReplyClick}
      >
        Phản hồi
      </Button>
    </div>
  );
};

export default CommentActionButtons;
