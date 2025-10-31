import { Button } from "@/components/ui/button";
import VoteButton from "@/components/VoteButton";
import { useState } from "react";

interface CommentActionButtonsProps {
  likeCount: string | number;
  onReplyClickCallback: () => void;
  itemId: string;
  defaultMyRating: {
    like: boolean;
    dislike: boolean;
  };
}

const CommentActionButtons = ({
  onReplyClickCallback,
  likeCount,
  itemId,
  defaultMyRating,
}: CommentActionButtonsProps) => {
  const [myRating, setMyRating] = useState(defaultMyRating);

  const handleReplyClick = () => {
    onReplyClickCallback?.();
  };

  const handleToggleClick = (value: number) => {
    setMyRating({ like: value === 1, dislike: value === 0 });
  };
  return (
    <div className="comment-actions flex items-center gap-2 text-xs box-content mt-3">
      <VoteButton
        itemId={itemId}
        defaultValue={myRating.like}
        variant="like"
        // count={likeCount}
        onClickCallback={handleToggleClick}

      />

      <VoteButton
        itemId={itemId}
        defaultValue={myRating.dislike}
        variant="dislike"
        // count={likeCount}
        onClickCallback={handleToggleClick}
      />

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
