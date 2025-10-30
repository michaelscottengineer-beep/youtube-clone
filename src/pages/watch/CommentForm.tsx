import { Button } from "@/components/ui/button";
import { FaRegSmileBeam } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ChannelAvatar from "@/components/ChannelAvatar";
import createComment from "@/api/queries/createComment";
import useAuth from "@/hooks/use-auth";

interface CommentFormProps {
  channelId: string;
  videoId: string;
  parentId?: string;
  onCancelCallback?: () => void;
}

const CommentForm = ({
  channelId,
  videoId,
  parentId,
  onCancelCallback,
}: CommentFormProps) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("comment = ", comment);
    await createComment({
      comment,
      channelId,
      videoId,
      parentId,
    });
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCancelClick = () => {
    onCancelCallback?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="comment-form flex gap-2 items-start w-full"
    >
      <ChannelAvatar avatarUrl={user?.avatar} />

      <div className="flex flex-col gap-1 flex-1">
        <Input
          placeholder="Viết bình luận"
          className="border-b border-b-gray-500 outline-none focus:border-b-2 focus:border-b-gray-700"
          onChange={handleChangeComment}
        />
        <div className="actions flex justify-between items-center">
          <Button size={"icon"} variant={"ghost"}>
            <FaRegSmileBeam />
          </Button>

          <div className="flex gap-2 items-center">
            <Button
              className="font-medium rounded-full"
              variant={"ghost"}
              onClick={handleCancelClick}
            >
              Hủy
            </Button>
            <Button className="rounded-full" disabled={comment.length == 0} type="submit">
              Bình luận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
