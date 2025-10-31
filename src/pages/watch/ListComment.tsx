import { Button } from "@/components/ui/button";
import type { TComment, TCommentThread } from "@/types/comment";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ChannelAvatar from "@/components/ChannelAvatar";
import CommentForm from "./CommentForm";
import CommentActionButtons from "./CommentActionButtons";

const ListComment = ({
  commentThreads,
}: {
  commentThreads: TCommentThread[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {commentThreads.map((thread) => {
        return (
          <CommentCard
            key={thread.id}
            comment={thread.topLevelComment}
            topLevel={{
              totalReplyCount: thread.totalReplyCount,
              replies: thread.replies,
            }}
          />
        );
      })}
    </div>
  );
};

import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nodeServerAuthApi } from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
interface CommentCardProps {
  comment: TComment;

  topLevel?: {
    totalReplyCount: number;
    replies: TComment[];
  };
}

const CommentCard = ({ comment, topLevel }: CommentCardProps) => {
  const [isShowReplyForm, setIsShowReplyForm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = async () => {
    await nodeServerAuthApi
      .delete("comments/" + comment.id, {
        data: {
          videoId: comment.videoId,
          channelId: comment.channelId,
          parentId: comment.parentId,
        },
      })
      .then(() => {
        setIsDeleted(true);
      });
  };

  return (
    <div
      key={comment.id}
      className={cn("flex items-start gap-4", isDeleted && "hidden")}
    >
      <ChannelAvatar
        channelId={comment.authorChannelId.value}
        avatarUrl={comment.authorProfileImageUrl}
      />

      <div className="self-center box-content flex-1">
        <div className="comment-info flex flex-col items-start justify-start">
          <div className="flex justify-between items-center w-full">
            <h4 className="font-semibold text-sm">
              {comment.authorDisplayName}
            </h4>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto block" variant={"ghost"}>
                  <BsThreeDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleDeleteClick}>
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: comment.textDisplay,
            }}
            className="text-sm comment-dangerouslyHTML"
          ></div>

          <CommentActionButtons
            itemId={comment.id}
            defaultMyRating={{
              dislike: !!comment?.myRating?.dislike,
              like: !!comment?.myRating?.like,
            }}
            likeCount={comment.likeCount}
            onReplyClickCallback={() => setIsShowReplyForm(true)}
          />

          {isShowReplyForm && (
            <CommentForm
              channelId={comment.channelId}
              parentId={comment.parentId ?? comment.id}
              videoId={comment.videoId}
              onCancelCallback={() => setIsShowReplyForm(false)}
            />
          )}
        </div>

        {topLevel && (
          <ListReply
            totalReplyCount={topLevel.totalReplyCount}
            replies={topLevel.replies}
          />
        )}
      </div>
    </div>
  );
};
interface ListReplyProps {
  totalReplyCount: number;
  replies: TComment[];
}
const ListReply = ({ totalReplyCount, replies }: ListReplyProps) => {
  const [isShowReplies, setIsShowReplies] = useState(false);
  if (totalReplyCount === 0) return null;

  return (
    <div>
      <Button
        onClick={() => setIsShowReplies(!isShowReplies)}
        className="total-reply rounded-full text-blue-500 bg-transparent hover:bg-blue-50 flex items-center gap-2"
      >
        {isShowReplies ? <ChevronUp /> : <ChevronDown />}
        <div className="text-sm">{totalReplyCount} phản hồi</div>
      </Button>
      {isShowReplies && (
        <div>
          {replies.map((cmt) => {
            return <CommentCard key={cmt.id} comment={cmt} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ListComment;
