import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SlDislike, SlLike } from "react-icons/sl";
import { FaShare } from "react-icons/fa";
import { MoreHorizontalIcon } from "lucide-react";
import type { TVideo } from "@/types/video";

interface VideoActionButtonsProps {
  video: TVideo;
}

const VideoActionButtons = ({ video }: VideoActionButtonsProps) => {
  return (
    <div className="actions">
      <ButtonGroup>
        <ButtonGroup >
          <Button variant="outline" className="rounded-full">
            <SlLike />
            <div>{video.statistics?.likeCount}</div>
          </Button>
          <Button variant="outline" size={"icon"} className="rounded-full">
            <SlDislike />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button variant={"outline"} className="rounded-full">
            <FaShare />
            <div>Chia sẻ</div>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="More Options" className="rounded-full">
            <MoreHorizontalIcon />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
};

export default VideoActionButtons;
