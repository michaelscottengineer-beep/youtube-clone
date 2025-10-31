import { VideoContext } from "@/components/Video";
import React from "react";

function useVideoContext() {
  const context = React.useContext(VideoContext);

  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }

  return { ...context };
}
export default useVideoContext;
