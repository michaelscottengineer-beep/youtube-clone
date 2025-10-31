import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { FaShare } from "react-icons/fa";
import { MoreHorizontalIcon } from "lucide-react";
import type { TVideo } from "@/types/video";
import { nodeServerAuthApi } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

import { FaRegBookmark } from "react-icons/fa6";

interface VideoActionButtonsProps {
  video: TVideo;
}

const VideoActionButtons = ({ video }: VideoActionButtonsProps) => {
  const [myRating, setMyRating] = useState(video.myRating);

  const handleToggleClick =  (value: number) => {
    setMyRating({ ...myRating, like: value === 1, dislike: value === 0 });
  };


  console.log(myRating)
  // get all hay get 1
  return (
    <div className="actions">
      <ButtonGroup>
        <ButtonGroup>
          {/* <Button
            variant="outline"
            className="rounded-full"
            onClick={handleToggleLikeClick}
          >
            {myRating.like ? <AiFillLike /> : <AiOutlineLike />}
            <div>{video.statistics?.likeCount}</div>
          </Button> */}
          <VoteButton
            itemId={video.id}
            variant="like"
            defaultValue={myRating.like}
            count={Number(video.statistics?.likeCount)}
            onClickCallback={handleToggleClick}
          />

          {/* <Button
            variant="outline"
            size={"icon"}
            className="rounded-full"
            onClick={handleToggleDislikeClick}
          >
            {myRating.dislike ? <AiFillDislike /> : <AiOutlineDislike />}
          </Button> */}

          <VoteButton
            itemId={video.id}
            variant="dislike"
            defaultValue={myRating.dislike}
            count={Number(video.statistics?.likeCount)}
            onClickCallback={handleToggleClick}
          />
        </ButtonGroup>

        <ButtonGroup>
          <Button variant={"outline"} className="rounded-full">
            <FaShare />
            <div>Chia sẻ</div>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <MoreButton />
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PlaylistDialog from "@/components/PLaylistDialog";
import VoteButton from "@/components/VoteButton";

const MoreButton = () => {
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState(false);

  return (
    <>
      <ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="cursor-pointer focus-visible:outline-none"
            asChild
          >
            <Button
              variant="outline"
              size="icon"
              aria-label="More Options"
              className="rounded-full"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40 mr-4"
            align="start"
            sideOffset={-1}
          >
            <DropdownMenuItem onClick={() => setIsOpenSaveDialog(true)}>
              <FaRegBookmark />
              Lưu
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      <PlaylistDialog
        isOpen={isOpenSaveDialog}
        onOpenChange={setIsOpenSaveDialog}
      />
    </>
  );
};

export default VideoActionButtons;
