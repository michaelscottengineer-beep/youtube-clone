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

interface CommentCardProps {
  comment: TComment;

  topLevel?: {
    totalReplyCount: number;
    replies: TComment[];
  };
}
const CommentCard = ({ comment, topLevel }: CommentCardProps) => {
  const [isShowReplyForm, setIsShowReplyForm] = useState(false);

  return (
    <div key={comment.id} className="flex items-start gap-4">
      <ChannelAvatar
        channelId={comment.authorChannelId.value}
        avatarUrl={comment.authorProfileImageUrl}
      />

      <div className="self-center box-content flex-1">
        <div className="comment-info flex flex-col items-start justify-start">
          <h4 className="font-semibold text-sm">{comment.authorDisplayName}</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: comment.textDisplay,
            }}
            className="text-sm comment-dangerouslyHTML"
          ></div>

          <CommentActionButtons
            likeCount={comment.likeCount}
            onReplyClickCallback={() => setIsShowReplyForm(true)}
          />

          {isShowReplyForm && (
            <CommentForm
              userAvatarUrl="/vite.svg"
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
